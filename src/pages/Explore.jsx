import { useEffect, useMemo, useState } from 'react'
import Card from '../components/Card';
import { Flex, Button, Text, } from "@radix-ui/themes";
import Search_Filter from '../components/Search_Filter';
import { useProductContext } from '../context/ProductContext';

const items_per_page = 10;

const Explore = () => {

  const { state } = useProductContext();
  const products_obj = state?.products;
  const all_brands_list = useMemo(() => {
    return Array.from(new Set(products_obj.products.flatMap((each_product) => (each_product?.brand) ? [each_product.brand] : [])))
  }, [products_obj?.products]); // new Set stores unique dataset, and Array.from() converts that Set object into an Array & finally wrapping inside useMemo will prevents re-calculations of same result on every render

  const [categories, setCategories] = useState([]);// all list of available categories will get restored by useEffect api called

  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const totalPages = Math.ceil(products_obj?.total / items_per_page);

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

  const startIndex = currentPageIndex * items_per_page;
  const endIndex = startIndex + items_per_page;
  const currentPageProducts = products_obj?.products?.slice(startIndex, endIndex);


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




  return (
    <>
      <h3 className='text-3xl font-semibold mt-10'>Explore All Products</h3>
      <section className='w-full my-5 p-2'>
        {/* search & filter component will place here.. */}
        <Search_Filter all_brands_list={all_brands_list} categories_list={categories} />
        <div className='max-w-7xl w-fit m-auto flex justify-center gap-5 flex-wrap p-2'>
          {currentPageProducts?.map((item) => <Card key={item.id} item={item} />)}
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