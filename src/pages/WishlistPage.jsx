import { Link } from "react-router-dom";
import RelatedProductCard from "../components/RelatedProductCard";
import SelectedItemCard from "../components/SelectedItemCard";
import { useProductContext } from "../context/ProductContext";
import Utility from "../Utils/Utility";
import SEOHelmetInjector from "../components/shared/SEOHelmetInjector";

const WishlistPage = () => {

  const { state, removeFromCart } = useProductContext();

  const cart_products = state?.cart || [];
  const wishlist_products = state?.wishlist || [];

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <SEOHelmetInjector title='Wishlist | ProductHunt' description='A wishlist page for all your favourite products' />
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Wishlist Page</h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {state?.products?.products?.map((product) => {
                if (wishlist_products.includes(product.id)) {
                  const isInCart = Utility.isAvailableInCart(cart_products, product.id) || false;
                  return (<SelectedItemCard key={product.id} product_id={product.id} image_url={product?.thumbnail} darkmode_image_url={product?.thumbnail} image_label={product?.title} product_name={product?.title} price={product?.price} discount={product?.discountPercentage} qty={2} isCartPage={false} removeFromCart={removeFromCart} is_in_Cart={isInCart} wishlist_products={wishlist_products} />);
                }
              })}

              {wishlist_products?.length === 0 && (<div className='h-44 md:h-96 flex flex-col items-center justify-center'>
                Your Wishlist is Empty!
                <Link to='/explore' className='mt-2 font-medium text-blue-700 underline hover:no-underline dark:text-blue-500'>Explore Products</Link>
              </div>)}

              {/* 
         <SelectedItemCard image_url='https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg' darkmode_image_url='https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg' image_label='imac image' product_name='PC system All in One APPLE iMac (2023) mqrq3ro/a, Apple M3, 24" Retina 4.5K, 8GB, SSD 256GB, 10-core GPU, Keyboard layout INT' price='1,499' qty={2} isCartPage={false} /> 

         <SelectedItemCard image_url='https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg' darkmode_image_url='https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg' image_label='apple watch image' product_name='Restored Apple Watch Series 8 (GPS) 41mm Midnight Aluminum Case with Midnight Sport Band' price={598} qty={1} isCartPage={false} />

        <SelectedItemCard image_url='https://flowbite.s3.amazonaws.com/blocks/e-commerce/macbook-pro-light.svg' darkmode_image_url='https://flowbite.s3.amazonaws.com/blocks/e-commerce/macbook-pro-dark.svg' image_label='macbook pro image' product_name='Apple - MacBook Pro 16" Laptop, M3 Pro chip, 36GB Memory, 18-core GPU, 512GB SSD, Space Black' price='1,799' qty={1} isCartPage={false} />
       
        <SelectedItemCard image_url='https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-light.svg' darkmode_image_url='https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-dark.svg' image_label='ipad image' product_name='Tablet APPLE iPad Pro 12.9" 6th Gen, 128GB, Wi-Fi, Gold' price={699} qty={1} isCartPage={false} />

        <SelectedItemCard image_url='https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-light.svg' darkmode_image_url='https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-dark.svg' image_label='iphone image' product_name='APPLE iPhone 15 5G phone, 256GB, Gold' price='2,997' qty={3} isCartPage={false} />
        */}

            </div>
            {/* <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">People also bought</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:mt-8">
            <RelatedProductCard image_url='https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg' darkmode_image_url='https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg' image_label='imac image' label='iMac 27”' desc='This generation has some improvements, including a longer continuous battery life.' price='399,99' discounted_price={299} />

            <RelatedProductCard image_url='https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg' darkmode_image_url='https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-dark.svg' image_label='ps5 image' label='Playstation 5' desc='This generation has some improvements, including a longer continuous battery life.' price='799,99' discounted_price={499} />

            <RelatedProductCard image_url='https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg' darkmode_image_url='https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg' image_label='apple watch image' label='Apple Watch Series 8' desc='This generation has some improvements, including a longer continuous battery life.' price='1799,99' discounted_price={1199} />

          </div>
        </div> */}
          </div>

        </div>
      </div>
    </section>
  )
}

export default WishlistPage;