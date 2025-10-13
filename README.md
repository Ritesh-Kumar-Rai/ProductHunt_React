## First download the node modules by:

```cmd
npm install
```

## Then run the project

```cmd
npm start
```

## In future Case study blog article use the following:

- How i used new Map() for faster lookups, incase i used it on reducer or to any heavy datasets; Normal arrays are good but for large datasets it's really very compute demanding and slows like O(n) or O(n^2) where new Map() shines which provides faster looks to get a specific item:

  ```js
  // In normal array we use

  array.find(); // which is O(n) or O(n^2) for each time

  // but in new Map()
  map_data.get(key_name); // O(1) faster
  ```

* UPDATE_QUANTITY handles both manual and UI-driven quantity changes.
* - If the new quantity differs from the current one, we replace it directly.
* - If the new quantity matches the current one (e.g., user clicks "+" but value is already synced),
* we increment by 1 to reflect user intent.
* This ensures responsive UX and avoids stale quantity display.

## 1. We have some points which is best to use and which used in this application

### a. ErrorBoundary: which is used to caught errors while rendering child components and render fallback ui

### b. Preloading route elements of React Router: By using Element.preload

Purpose: Improve perceived performance by loading route components before navigation.

✅ When to Use
For frequently visited routes (e.g., Home, Explore).

Avoid preloading rarely visited routes (e.g., Contact, SignIn).

✅ How to Preload
React lazy components support .preload() if you expose it:

```js
const Home = Object.assign(
  lazy(() => import("./pages/Home")),
  { preload: () => import("./pages/Home") }
);
```

Then in useEffect or on hover:

```jsx
useEffect(() => {
  Home.preload(); // preload Home route
}, []);
```

Or:

```jsx
<button onMouseEnter={() => Home.preload()}>Explore</button>
```

Edge Cases:

- If user lands directly on /product/:id, preloading won’t help.

- That’s okay—React will lazy-load it as usual.

- Preloading is about optimizing navigation, not replacing lazy loading.

### 🌐 3. SEO with React Helmet: React-Helmet library for Injecting SEO meta tags auto.

Problem: React is a SPA, so search engines struggle to crawl dynamic content.

Solution: Use react-helmet to inject meta tags dynamically.

✅ Install Helmet

```bash
npm install react-helmet-async
```

#### react-helmet-async because react-helmet is deprecated!

✅ Usage in Pages

```jsx
import { HelmetProvider } from "react-helmet-async";

function App() {
  //...
  return (
    <HelmetProvider>
      // all your components and pages will render here
    </HelmetProvider>
  );
}
// wrap the all pages which uses Helmet with HelmetProvider
```

```jsx
import { Helmet } from "react-helmet-async";

function ProductPage() {
  return (
    <>
      <Helmet>
        <title>Buy Premium Shoes | MyStore</title>
        <meta
          name="description"
          content="Explore premium shoes with discounts and fast delivery."
        />
        <meta name="keywords" content="shoes, ecommerce, buy online" />
      </Helmet>
      <h1>Product Details</h1>
    </>
  );
}
```

`🧠 Bonus Tip`

You can also create a reusable SEO.jsx component:

```jsx
import { Helmet } from "react-helmet-async";

const SEO = ({ title, description }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
  </Helmet>
);

export default SEO;
```

Then use it like:

```jsx
<SEO title="Product Details" description="Buy premium shoes online." />
```

### In case, you have used default meta tags or title in index.html then add an attribute like data-rh='true', so that Helmet will override it
