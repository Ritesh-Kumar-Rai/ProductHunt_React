# 🧠 Explore Page — Developer Feature Documentation

This document explains the internal logic, performance decisions, and architectural flow behind the **Explore** page of the product listing system.  
It covers **filtering**, **sorting**, **pagination**, and the supporting hooks.

---

## 1. Overview

The `Explore.jsx` component provides:

- Product listing with filtering, search, and sorting.
- Category auto-fetch with graceful fallback.
- Client-side pagination.
- Performance-tuned state management using React hooks.

---

## 📁 Folder Structure

```
src/
|
├── contexts/
|    └── FilterContext.jsx # Global Filter state using Context API
|
├── pages/
|    └── Explore.jsx
|
├── components/
    ├── filters/
    |    ├── CheckboxFilter.jsx
    |    ├── PriceFilter.jsx
    |    ├── RatingsFilter.jsx
    |    ├── SortSelect.jsx
    |    ├── StockFilter.jsx
    └── Search_Filter.jsx


```

## 2. State & Context Consumption

```jsx
const { state } = useProductContext();
const products_obj = state?.products;

const { searchQuery, appliedFilters } = useFilterContext();
```

- `useProductContext()` → provides the complete product dataset.
- `useFilterContext()` → provides all active filters and search query.

All filters are managed as:

```js
appliedFilters = {
  category: [],
  brand: [],
  rating: "",
  stockConsidered: "",
  priceRange: [], // [min, max]
};
```

---

## 3. Category Fetching with Fallback

```jsx
useEffect(() => {
  const controller = new AbortController();
  const url = "https://dummyjson.com/products/category-list";

  fetch(url, { signal: controller.signal })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      return res.json();
    })
    .then(setCategories)
    .catch((error) => {
      console.error(error);

      // Fallback logic: derive categories from local data
      const cat = [];
      products_obj?.products?.forEach((p) => {
        if (!cat.includes(p.category)) cat.push(p.category);
      });
      setCategories(cat);
    });

  return () => controller.abort();
}, []);
```

### 🔍 Why?

- If API fails or changes, the fallback ensures a seamless experience.
- Prevents blank UI states caused by fetch failures.

---

## 4. Filtering Logic

```jsx
const filteredProducts = useMemo(() => {
  if (!products_obj?.products?.length) return [];

  const { category, brand, rating, stockConsidered, priceRange } =
    appliedFilters;

  return products_obj.products.filter((each_product) => {
    const isSearchMatched = searchQuery
      ? each_product.title
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase())
      : true;

    const categoryMatches = category.length
      ? category.includes(each_product.category)
      : true;
    const brandMatches = brand.length
      ? brand.includes(each_product.brand)
      : true;
    const ratingMatches =
      rating && !isNaN(rating) && parseFloat(rating) > 1
        ? each_product.rating >= parseFloat(rating)
        : true;
    const stockMatches =
      stockConsidered &&
      (stockConsidered === "In Stock" || stockConsidered === "Low Stock")
        ? each_product.availabilityStatus === stockConsidered
        : true;
    const priceMatches =
      priceRange.length === 2
        ? each_product.price >= priceRange[0] &&
          each_product.price <= priceRange[1]
        : true;

    return (
      isSearchMatched &&
      categoryMatches &&
      brandMatches &&
      ratingMatches &&
      stockMatches &&
      priceMatches
    );
  });
}, [products_obj, searchQuery, appliedFilters]);
```

### 💡 Highlights:

- Uses **pure function filtering** for predictability.
- Wrapped in `useMemo()` to prevent recomputation on unrelated renders.
- Handles all possible filter states, including empty filters and defaults.

---

## 5. Sorting Logic

```jsx
const sortedProducts = useMemo(() => {
  if (!filteredProducts?.length) return [];

  const sorted = [...filteredProducts]; // creates shallow copy, avoids mutating original

  try {
    switch (sortSelect) {
      case "price_low_high":
        return sorted.sort((a, b) => a.price - b.price);
      case "price_high_low":
        return sorted.sort((a, b) => b.price - a.price);
      case "rating_high_low":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "a_z":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "z_a":
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      case "discount":
        return sorted.sort(
          (a, b) => b.discountPercentage - a.discountPercentage
        );
      default:
        return sorted;
    }
  } catch (err) {
    console.error(err);
    return filteredProducts; // fallback for safety
  }
}, [sortSelect, filteredProducts]);
```

### ⚙️ Design Choices:

- `Array.prototype.sort()` mutates arrays → copied using spread (`[...]`).
- Wrapped in `try...catch` to ensure resilient fallback.
- No setter calls inside `useMemo` → avoids infinite re-renders.
- Sorting recalculates **only when** `filteredProducts` or `sortSelect` changes.

---

## 6. Pagination Logic

```jsx
const items_per_page = 10;
const totalPages = Math.ceil(sortedProducts.length / items_per_page);

const startIndex = currentPageIndex * items_per_page;
const endIndex = startIndex + items_per_page;

const currentPageProducts = sortedProducts.slice(startIndex, endIndex);
```

### 🚀 Pagination Navigation

```jsx
const handlePageNavigate = (direction) => {
  setCurrentPageIndex((prev) => {
    if (direction === "next") return Math.min(prev + 1, totalPages - 1);
    if (direction === "prev") return Math.max(prev - 1, 0);
    return prev;
  });
}; // Shorter way but in actual code i used to write longer code
```

---

## 7. Rendering

```jsx
<SortSelect sortOption={sortSelect} setSortOption={setSortSelect} />

<div className="flex flex-wrap justify-center gap-5">
  {currentPageProducts.map(item => <TempCard key={item.id} item={item} />)}
  {!currentPageProducts.length && <NoResults searchQuery={searchQuery} />}
</div>
```

### 🧩 Key UI Points

- Sort selector (Radix UI `Select`).
- Dynamic product cards.
- TempCard is just used for `linkedIn` demonstration purpose only!
- Empty state fallback with `<NoResults />`.

---

## 8. Performance & Stability Notes

✅ Wrapped all heavy logic inside `useMemo` and `useEffect`.  
✅ Avoided setter methods inside `useMemo` to prevent render loops.  
✅ Graceful fallbacks in API and sorting logic.  
✅ Stable dependency arrays for deterministic renders.  
✅ Component-level pagination prevents unnecessary state reflows.

---

## 9. Future Enhancements

- Add debounce for search input.
- Implement lazy-loading for product images.
- Move sorting logic into a custom hook (`useSortProducts`).
- Introduce server-side pagination once API supports it.

---

### 🏁 Conclusion

This design ensures a **robust**, **performant**, and **user-friendly** explore page.  
Every hook, memoization, and fallback path is intentionally structured for predictable state management and scalable extension.
