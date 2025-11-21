import TopProductListShow from '../components/TopProductListShow';
import { useProductContext } from '../context/ProductContext';

const Home = () => {

  const { state } = useProductContext();
  const products_data = state?.products;

  // console.warn(topProducts, topDiscountedProducts)
  function topNByAttr(arr, attr, n = 10) {
    try {

      return arr.reduce((topList, item) => {
        if (topList.length < n) {
          topList.push(item);
        } else {
          // find the current minimum in topList
          const minVal = topList.reduce(
            (min, x) => Math.min(min, x[attr]),
            topList[0][attr]
          );

          // if the new item beats that minimum, replace it
          if (item[attr] > minVal) {
            const idx = topList.findIndex(x => x[attr] === minVal);
            topList[idx] = item;
          }
        }
        return topList;
      }, [])
        // finally, sort descending for presentation
        .sort((a, b) => b[attr] - a[attr]);

    } catch (err) {
      console.error(`${err.name} -> ${err.message}`);
      return [];
    }
  }

  // Usage
  const topRatedProducts = topNByAttr(products_data?.products, 'rating');
  const topDiscountedProducts = topNByAttr(products_data?.products, 'discountPercentage');

  return (
    <>
      <div className='w-full h-72 rounded-lg shadow-lg overflow-hidden group'>
        <img src="https://plus.unsplash.com/premium_photo-1681398745480-151fc6addaaf?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="e-commerce banner" loading='eager' fetchPriority='high' elementtiming="Main image" className='h-full w-full object-cover transition-transform duration-200 transform scale-100 group-hover:scale-110 bg-blue-500' />
      </div>

      <TopProductListShow label={"Top Products"} productsArr={topRatedProducts} />
      <TopProductListShow label={"Top Discounted Products"} productsArr={topDiscountedProducts} />
    </>
  )
}

export default Home;