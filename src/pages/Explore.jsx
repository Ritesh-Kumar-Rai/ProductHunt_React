import { useEffect, useState } from 'react'
import Card from '../components/Card';
import { Flex, Button, Text, } from "@radix-ui/themes";
import Search_Filter from '../components/Search_Filter';
import { useProductContext } from '../context/ProductContext';
import SEOHelmetInjector from '../components/shared/SEOHelmetInjector';
// import products_data from "../constants/products.json";

const items_per_page = 10;

const Explore = () => {

  // const [products_obj, setProducts] = useState();
  const { state } = useProductContext();
  const products_obj = state?.products;

  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  // useEffect(()=>{
  //   // setProducts(products_data);
  // },[]);

  console.log('data->>', products_obj);

  let count = 1;

  const handlePageNavigate = (direction = 'next') => {

    const pages = Math.floor(products_obj?.total / items_per_page);

    if (direction === 'next') {
      setCurrentPageIndex((prev) => {
        if (prev === pages) {
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

  return (
    <>
      <SEOHelmetInjector title='Explore | ProductHunt' description='Reach out to ProductHunt to explore more products.' />

      <h3 className='text-3xl font-semibold mt-10'>Explore All Products</h3>
      <section className='w-full my-5 p-2'>
        {/* search & filter component will place here.. */}
        <Search_Filter />
        <div className='max-w-7xl w-fit m-auto flex justify-center gap-5 flex-wrap p-2'>
          {products_obj?.products?.map((item) => {
            const skip = currentPageIndex * items_per_page;
            if (item.id > skip) {
              if (count <= 10) {
                count++;
                return <Card key={item.id} item={item} />
              }
            }
          })}
        </div>
        <div className='mt-4 flex items-center justify-center'>
          <Flex gap='3' align='center' className='w-fit'>
            <Button type='button' variant='outline' color='amber' onClick={() => handlePageNavigate('prev')}>Prev</Button>
            <Text>Page <b>{currentPageIndex + 1}</b> of <b>{Math.ceil(products_obj?.total / items_per_page)}</b></Text>
            <Button type='button' variant='outline' color='blue' onClick={() => handlePageNavigate('next')}>Next</Button>
          </Flex>
        </div>
      </section>
    </>
  )
}

export default Explore;