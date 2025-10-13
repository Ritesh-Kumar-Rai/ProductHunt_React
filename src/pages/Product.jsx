import React, { useEffect, useState } from 'react'
// import CarouselContainer from '../components/CarouselContainer';
import { Badge, Box, Button, Flex, Heading, IconButton, Skeleton, Text, Tooltip } from '@radix-ui/themes';
import ImageCarousel from '../components/ImageCarousel';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import TabNavigation from '../components/TabNavigation';
import { Link, useParams } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import SEOHelmetInjector from '../components/shared/SEOHelmetInjector';
import Utility from '../Utils/Utility';

const Ratings = ({ rating, reviews }) => {
  return (

    <div class="flex items-center my-5">
      <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
      <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
      <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
      <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
      <svg class="w-4 h-4 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
      <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">{rating || 'nil'}</p>
      <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">out of</p>
      <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>

      <span className='block mx-2 font-medium text-sm text-gray-600'>
        ({reviews} reviews)
      </span>
    </div>
  );
};

const Quantity = ({ totalAvailableStock, quantity, setQty, minQty, loadingStatus }) => {

  // alert('quantity'+quantity);
  const handleQty = (type = 'increment') => {
    if (type === 'increment') {
      setQty(prev => {
        if (prev >= totalAvailableStock) {
          return prev;
        }
        return prev + 1;
      });
    } else if (type === 'decrement') {
      setQty(prev => {
        if (prev <= minQty) {
          return prev;
        }
        return prev - 1;
      });
    } else {
      console.error("called a qtyhandler function but never pass it's type of action!");
    }
  };

  // console.log('Quantity Component');

  return (
    <form class="max-w-xs me-2">
      <label for="quantity-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose quantity:</label>
      <div class="relative flex items-center max-w-[20rem]">
        <button type="button" id="decrement-button" data-input-counter-decrement="quantity-input"
          onClick={() => handleQty('decrement')}
          class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none" disabled={loadingStatus || quantity === 1}>
          <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
          </svg>
        </button>
        <input type="text" id="quantity-input" data-input-counter data-input-counter-min="1" data-input-counter-max="50" aria-describedby="helper-text-explanation" class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" value={quantity} max={totalAvailableStock} readOnly required />
        <button type="button" id="increment-button" data-input-counter-increment="quantity-input"
          onClick={() => handleQty('increment')}
          class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none" disabled={loadingStatus || quantity === totalAvailableStock}>
          <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
          </svg>
        </button>
      </div>
      <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">Please select a quantity between {minQty} to {totalAvailableStock}.</p>
    </form>
  )
};

const Product = () => {
  // console.log("product page");

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();// will store single product data as object

  const [isAddedLoading, setIsAddedLoading] = useState(false); // gonna be used for add to cart loading status 

  const { productId } = useParams();

  const { state, addToCart, addToWishlist, removeFromWishlist, updateQuantity } = useProductContext();


  const cart_products = state?.cart || [];
  const wishlist_products = state?.wishlist || [];

  const [qty, setQty] = useState(1);

  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
    }
    const fetchData = async () => {
      console.log(state)
      const res = await Utility.fetchProductDataFromArr(state?.products?.products, Number(productId));
      setData(res);
      setIsLoading(false);
      if (qty !== res?.minimumOrderQuantity) {
        const newQty = cart_products.find((each_item) => each_item.id === Number(productId))?.qty ?? (res?.minimumOrderQuantity || 1);
        setQty(newQty);
      }
      console.log(res, qty);
    }

    fetchData();

    setIsWishlisted(wishlist_products?.includes(Number(productId)));

  }, [productId]);

  useEffect(() => {
    // alert('state changed');
    // console.log(cart_products, productId)
    const data = cart_products.find((each) => each.id === Number(productId));
    console.log(data);
    setQty(data?.qty || 1);
  }, [cart_products]);



  const insertInCart = () => {
    setIsAddedLoading(true);

    const product_cart_info = cart_products.find((eachobj) => eachobj.id === Number(productId));
    console.table(product_cart_info);
    const isExistInCart = Utility.isAvailableInCart(cart_products, Number(productId));
    console.log(isExistInCart);

    if (isExistInCart) {
      const timer = setTimeout(() => {
        if (product_cart_info.qty < data.stock) {
          updateQuantity(Number(productId), Number(qty));
          setIsAddedLoading(false);
          return;
        }
        if (qty < data.stock) {
          updateQuantity(Number(productId), Number(qty));
        }
        setIsAddedLoading(false);
      }, 1000);
    } else {
      const timer = setTimeout(() => {
        addToCart(Number(productId), Number(qty));
        setIsAddedLoading(false);
      }, 1000);
    }

  };



  const handleWishlist = (e) => {
    e.preventDefault();
    if (wishlist_products?.includes(Number(productId))) {
      removeFromWishlist(Number(productId));
      setIsWishlisted(false);
    } else {
      addToWishlist(Number(productId));
      setIsWishlisted(true);
    }

  }

  // alert(`product id: ${productId}`);

  // state.products.products.forEach((product) => console.log(product.availabilityStatus, product.id));

  if (!isLoading && !data) {
    console.log(data, typeof data)
    return (<section className='font-bold flex items-center justify-center h-screen flex-col text-xl gap-2'>
      <h2 className='text-7xl'>404</h2>
      <span className='text-gray-400'>No product found of your interest!</span>
      <Link to="/explore"
        className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <svg className="mr-2 -ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h18m-9-9l9 9-9 9" />
        </svg>
        Go back Explore Page
      </Link>
    </section>);
  }


  return (
    <>

      <SEOHelmetInjector title='Product Details | ProductHunt' description={`Buy ${data?.category || ''}`} />

      <article>
        {/* for carousel */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 row-auto">

          <div className='bg-zinc-100 dark:bg-zinc-900 min-h-96 max-h-[26rem] col-span-1 w-full flex items-center justify-center shadow-xl rounded-xl relative overflow-hidden'>
            {isLoading ? <Skeleton loading={true} /> : <ImageCarousel images={data?.images} />}
          </div>
          <div className='col-span-1 rounded-xl shadow-xl bg-zinc-100 dark:bg-zinc-900 p-3'>
            <Box>
              {isLoading ? <Skeleton loading='true' width='90px' height='15px' /> : data.tags.map((name, i) => <Badge key={i} variant='soft' color='gray' radius='large' mr='2'>{name}</Badge>)}
            </Box>
            <h1 className='text-xl md:text-3xl font-bold my-2'>{isLoading ? <Skeleton>Apple Macbook Pro 16' inch</Skeleton> : data.title}</h1>

            <div className='flex items-center gap-2 justify-between flex-wrap'>
              <Badge variant='solid' size='2'>Brand: {isLoading ? <Skeleton width='50px' /> : data?.brand || <span className='text-red-500 font-medium'>No information</span>}</Badge>
              <Badge variant='solid' size='2' color='cyan'>Category: {isLoading ? <Skeleton width='50px' /> : data.category}</Badge>
            </div>

            <p className='text-gray-500 mt-2 poppins-medium'>{isLoading ? <Skeleton>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolorum sunt fugiat atque laboriosam pariatur perferendis aspernatur blanditiis numquam incidunt? Quod corporis dolorem esse?</Skeleton> : data.description}</p>
            <Ratings rating={isLoading ? '--' : data.rating} reviews={isLoading ? '--' : data.reviews.length} />

            <Heading as='h3' className='flex items-center gap-3' my='3'>₹{isLoading ? <Skeleton loading='true' width='100px' height='35px'>4500</Skeleton> : data.price} <Badge variant='solid' color='crimson' radius='full'>Save {isLoading ? '-' : data?.discountPercentage}%</Badge></Heading>

            <Flex justify='start' align='center' gap='5' wrap='wrap'>
              {isLoading ? <Skeleton loading='true' width='300px' height='40px' /> : <Quantity totalAvailableStock={data.stock} quantity={qty} setQty={setQty} minQty={data?.minimumOrderQuantity || 1} loadingStatus={isAddedLoading} />}
              <Tooltip content="Add to cart">
                <Button size='4' color='amber' className='m-auto' radius='large' style={{ cursor: 'pointer' }} onClick={insertInCart} loading={isLoading || isAddedLoading}>Add to Cart</Button>
              </Tooltip>
              <Tooltip content={`${isWishlisted ? 'Remove from' : 'Add to'} wishlist`}>
                <IconButton radius='full' variant='soft' color='crimson' size='4' style={{ cursor: 'pointer' }} onClick={handleWishlist}> {isWishlisted ? <FaHeart size={20} /> : <FaRegHeart size={20} />} </IconButton>
              </Tooltip>
            </Flex>
            <Flex align='center' justify='center' gap='2' mt='2' className='text-[#AB6400]'>
              <FiShoppingBag />
              {isLoading ?
                <Text as='span' weight='medium'> In Stock - Ready to Ship </Text>
                :
                <Text as='span' weight='medium'> {data.availabilityStatus === 'In Stock' ? <span className='text-green-700'>{data.availabilityStatus}</span> : (data.availabilityStatus === 'Out of Stock' ? <span className='text-red-500'>{data.availabilityStatus}</span> : data.availabilityStatus)} - {data.shippingInformation} </Text>
              }
            </Flex>
          </div>

          {/* product detail container */}
          <div className='col-span-1 md:col-span-2 rounded-xl shadow-xl p-3 min-h-96'>
            <Heading as='h2' size='7'>Product Details</Heading>
            <p className='text-sm md:text-lg font-medium text-gray-500 md:leading-10'>Everything you need to know about our premium product</p>
            <TabNavigation reviewsInfo={isLoading ? null : data?.reviews} description={isLoading ? null : data?.description} />
          </div>
        </section>
      </article>
    </>
  )
}

export default Product;