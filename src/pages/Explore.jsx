import { useEffect, useMemo, useState } from 'react'
import Card from '../components/Card';
import { Flex, Button, Text, } from "@radix-ui/themes";
import Search_Filter from '../components/Search_Filter';
import { useProductContext } from '../context/ProductContext';
import { useFilterContext } from '../context/FilterContext';
import { FcSearch } from 'react-icons/fc';

const items_per_page = 10;
let c = 1;

const Explore = () => {

  const { state } = useProductContext();
  const products_obj = state?.products;
  const all_brands_list = useMemo(() => {
    return Array.from(new Set(products_obj.products.flatMap((each_product) => (each_product?.brand) ? [each_product.brand] : [])))
  }, [products_obj?.products]); // new Set stores unique dataset, and Array.from() converts that Set object into an Array & finally wrapping inside useMemo will prevents re-calculations of same result on every render

  const [categories, setCategories] = useState([]);// all list of available categories will get restored by useEffect api called

  const [currentPageIndex, setCurrentPageIndex] = useState(0);


  const handlePageNavigate = (direction = 'next') => {

    if (direction === 'next') {
      setCurrentPageIndex((prev) => {
        if (prev === totalPages) {
          return prev;
        }
        return prev + 1;
      })
    }
    else if (direction === 'prev') {
      setCurrentPageIndex((prev) => {
        if (prev <= 0) {
          return prev;
        }
        return prev - 1;
      })
    }
  }


  useEffect(() => {
    const controller = new AbortController();
    const url = "https://dummyjson.com/products/category-list";

    fetch(url, { signal: controller?.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setCategories(res);
      })
      .catch((error) => {
        console.error(error);
        const cat = [];

        products_obj?.products?.forEach((element) => {
          // console.log(element.category)
          if (!cat.includes(element.category)) {
            cat.push(element.category);
          }
        });
        setCategories(cat);
        console.log(cat);
      });

    return () => controller.abort();
  }, []);

  // consuming filter context value
  const { searchQuery, appliedFilters } = useFilterContext();

  const hasAppliedFilters = useMemo(() => {

    const { category, brand, rating, stockConsidered, priceRange } = appliedFilters || {};

    setCurrentPageIndex(0); // reset current page to default 0 

    return (
      (searchQuery && searchQuery.trim().length > 0) ||
      (category && category.length > 0) ||
      (brand && brand.length > 0) ||
      (rating && (rating !== '' || rating !== '0')) ||
      (stockConsidered && (stockConsidered === 'in-stock' || stockConsidered === 'outoff-stock')) ||
      (priceRange && priceRange.some(p => p !== null && p !== undefined))
    );


  }, [searchQuery, appliedFilters]);

  const filteredProducts = products_obj?.products?.filter((each_product) => {

    if (!products_obj?.products?.length) return [];

    if (!hasAppliedFilters) {
      // no filters -> return all list
      return products_obj?.products;
    }

    const { category, brand, rating, stockConsidered, priceRange } = appliedFilters;

    const isSearchMatched = (searchQuery.length) ? each_product.title.toLowerCase().includes(searchQuery?.trim()?.toLowerCase()) : true;

    const categoryMatches = (category.length) ? category.includes(each_product?.category) : true;

    const brandMatches = (brand.length) ? brand.includes(each_product?.brand) : true;

    const ratingMatches = rating && !isNaN(rating) && parseFloat(rating) > 0 ? each_product.rating >= parseFloat(rating) : true;

    const stockMatches = stockConsidered && (stockConsidered === 'In Stock' || stockConsidered === 'Low Stock') ? (each_product.availabilityStatus === stockConsidered) : true;

    const priceMatches = priceRange.length === 2 ? each_product.price >= priceRange[0] && each_product.price <= priceRange[1] : true;


    return (isSearchMatched && categoryMatches && brandMatches && ratingMatches && stockMatches && priceMatches);
  });

  console.log(filteredProducts);

  setTimeout(() => {
    const stockDetails = [];
    products_obj.products.forEach((p) => {
      if (!stockDetails.includes(p.availabilityStatus)) {
        stockDetails.push(p.availabilityStatus);
      }
    });

    console.log(stockDetails, stockDetails.length);
  }, 7000);

  // const totalPages = Math.ceil(products_obj?.total / items_per_page);
  const totalPages = Math.ceil(filteredProducts.length / items_per_page);

  const startIndex = currentPageIndex * items_per_page; // startIndex means how many products to skip
  const endIndex = startIndex + items_per_page; // what's the last product
  const currentPageProducts = filteredProducts?.slice(startIndex, endIndex);

  /* [Here logic of pagination means: If i am at page 2 where only 10 items per page to display then how many items to skip by which the next 10 items will be displayed in a page 2; and till how many items to show;
  
  Example: 
      current_page = 2;
      items_per_page_to_show = 10;
      start_items_from = current_page * items_per_page_to_show; 2 * 10 = 20;
      last_items_to = start_items_from + items_per_page_to_show; 20 + 10 = 30;
      Means at current_page = start_items_from to last_items_to; -> 20 to 30 (only 10 items at page 2 which ranges 20 to 30) 
  ]
*/

  c++;
  console.warn(c);

  return (
    <>
      <h3 className='text-3xl font-semibold mt-10'>Explore All Products</h3>
      <section className='w-full my-5 p-2'>
        {/* search & filter component will place here.. */}
        <Search_Filter all_brands_list={all_brands_list} categories_list={categories} />
        <div className='max-w-7xl w-fit m-auto flex justify-center gap-5 flex-wrap p-2'>
          {Object?.entries(appliedFilters).map((filter) => filter[1].length > 0 && <b key={filter}>{filter[0]} : {filter[1].length > 3 ? <span className='h-5 w-5 bg-slate-700 text-white rounded-sm p-1'>3+</span> : filter[1].toLocaleString()}</b>)}
          <br />
          {currentPageProducts?.map((item) => <TempCard key={item.id} item={item} />)}
          {!currentPageProducts.length && <NoResults searchQuery={searchQuery} />}
        </div>
        <div className='mt-4 flex items-center justify-center'>
          <Flex gap='3' align='center' className='w-fit'>
            <Button type='button' variant='outline' color='amber' disabled={currentPageIndex === 0} onClick={() => handlePageNavigate('prev')}>Prev</Button>
            <Text>Page <b>{currentPageIndex + 1}</b> of <b>{totalPages}</b></Text>
            <Button type='button' variant='outline' color='blue' disabled={currentPageIndex === (totalPages - 1)} onClick={() => handlePageNavigate('next')}>Next</Button>
          </Flex>
        </div>
      </section>
    </>
  )
}

export default Explore;

const TempCard = ({ item }) => {
  return (<div className='w-64 rounded-lg shadow-lg border-2 border-gray-200 flex flex-col gap-2 hover:scale-105 duration-150 p-2 overflow-hidden'>
    <b>id: {item.id}</b>
    <h6 className='text-ellipsis text-nowrap w-full overflow-hidden'>{item.title}</h6>
    <b>Price: {item.price}</b>
    <b>Category: {item.category}</b>
    <b className={`${item.availabilityStatus === 'In Stock' ? 'text-green-700' : item.availabilityStatus === 'Low Stock' ? 'text-orange-800' : ''}`}>Stock: {item.availabilityStatus}</b>
    <b>Rating: {item.rating}</b>
    <b>Brand: {item.brand ?? 'Empty'}</b>
  </div>);
};

function NoResults({ searchQuery }) {
  return (
    <div className="text-center py-10">
      <FcSearch className="mx-auto h-12 w-12" />
      <h2 className="mt-4 text-lg font-semibold">
        No results {searchQuery.length ? `for “${searchQuery}”` : `Found!`}
      </h2>
      <p className="text-sm text-gray-500">
        Try adjusting your filters or searching a different term.
      </p>
      <p className="text-sm text-gray-500">
        Clear filters to broaden results
      </p>
      <p className="text-sm text-gray-500">
        Browse popular categories
      </p>
    </div>
  );
}
