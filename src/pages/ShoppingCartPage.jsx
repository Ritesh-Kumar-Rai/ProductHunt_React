import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import SelectedItemCard from '../components/SelectedItemCard';
import RelatedProductCard from '../components/RelatedProductCard';
import { useProductContext } from '../context/ProductContext';
import Utility from '../Utils/Utility';
import SEOHelmetInjector from '../components/shared/SEOHelmetInjector';
import CheckoutModal from '../components/CheckoutModal';
import CheckoutModal2 from '../components/CheckoutModal2';

const ShoppingCartPage = () => {

  const { state, removeFromCart } = useProductContext();

  const cart_products = state?.cart || [];
  const wishlist_products = state?.wishlist || [];
  console.log(cart_products, state)

  // This method is responsible for computing Cart Summary like total, discount, coupon discount etc.
  const cartSummary = useMemo(() => {
    let sub_total = 0;
    let discount = 0;
    let additional_discount = 0;
    let taxed_amount = 0;
    const tax_gst = 18; // In percentage (18%)
    const delivery_charges = 99;

    const cart_products_map = new Map(cart_products.map(p => [p.id, p])); // Creating a Map for faster lookups

    state.products.products.forEach((item) => {
      if (Utility.isAvailableInCart(cart_products, item.id)) {
        console.log(item.price, item.discountPercentage);
        const each_cart_product_obj = cart_products_map.get(item.id); // improved performace O(1) then cart-products.find() which is O(n) for each time

        const qty = each_cart_product_obj?.qty ?? 1;
        sub_total += (item?.price) * qty;
        discount += (item?.price * (item?.discountPercentage / 100)) * qty;
      }
    });

    taxed_amount = (sub_total - discount) * (tax_gst / 100);

    const total = (sub_total - discount - additional_discount + taxed_amount + delivery_charges).toFixed(2);

    return { sub_total, discount, delivery_charges, taxed_amount, additional_discount, total };
  }, [cart_products]);

  // console.log(summary)
  /* const [cartSummary, setCartSummary] = useState(computeSummary());

  useEffect(() => {
    setCartSummary(computeSummary());
  }, [cart_products]); */


  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">

      <SEOHelmetInjector title='Shopping Cart | ProductHunt' description='Purchase your selected products from this shopping cart' />

      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {state?.products?.products?.map((product) => {
                if (Utility.isAvailableInCart(cart_products, product.id)) {
                  const isWishlisted = wishlist_products.includes(product.id) || false;
                  return (<SelectedItemCard key={product.id} product_id={product.id} image_url={product?.thumbnail} darkmode_image_url={product?.thumbnail} image_label={product?.title} product_name={product?.title} price={product?.price} discount={product?.discountPercentage} qty={2} removeFromCart={removeFromCart} is_wishlisted={isWishlisted} wishlist_products={wishlist_products} />);
                }
              })}

              {cart_products?.length === 0 && (<div className='h-44 md:h-96 flex flex-col items-center justify-center'>
                Your Cart is Empty!
                <Link to='/explore' className='mt-2 font-medium text-blue-700 underline hover:no-underline dark:text-blue-500'>Explore Products</Link>
              </div>)}

            </div>
            {/* <div className="hidden xl:mt-8 xl:block">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">People also bought</h3>
          <div className="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
            <RelatedProductCard image_url='https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg' darkmode_image_url='https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg' image_label='imac image' label='iMac 27”' desc='This generation has some improvements, including a longer continuous battery life.' price='399,99' discounted_price={299} />

            <RelatedProductCard image_url='https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg' darkmode_image_url='https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-dark.svg' image_label='ps5 image' label='Playstation 5' desc='This generation has some improvements, including a longer continuous battery life.' price='799,99' discounted_price={499} />

            <RelatedProductCard image_url='https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg' darkmode_image_url='https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg' image_label='apple watch image' label='Apple Watch Series 8' desc='This generation has some improvements, including a longer continuous battery life.' price='1799,99' discounted_price={1199} />

          </div>
        </div> */}
          </div>

          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white"><b>₹</b>{cartSummary?.sub_total.toFixed(2)}</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                    <dd className="text-base font-medium text-green-600">-<b>₹</b>{(cartSummary?.discount).toFixed(2)}</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white"><b>₹</b>{cartSummary.delivery_charges}</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax (GST 18%)</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white"><b>₹</b>{cartSummary?.taxed_amount?.toFixed(2)}</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Additional Discount</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white"><b>₹</b>{cartSummary.additional_discount}</dd>
                  </dl>

                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white"><b>₹</b>{cartSummary?.total || 0}</dd>
                </dl>
              </div>
              {/* Here the Proceed to checkout button was moved to CheckoutModal as a trigger for modal */}
              {/* <CheckoutModal /> */}
              <CheckoutModal2 cartItems={cart_products} />

              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                <Link to="/explore" title="" className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 underline hover:no-underline dark:text-blue-500">
                  Continue Shopping
                  <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <form className="space-y-4">
                <div>
                  <label for="voucher" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Do you have a voucher or gift card? </label>
                  <input type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="" required />
                </div>
                <button type="submit" title='apply code button' className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Apply Code</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShoppingCartPage;