import { Button } from "@radix-ui/themes";
import { RiPokerHeartsFill, RiPokerHeartsLine } from "react-icons/ri";
import { BsFillCartPlusFill, BsFillCartCheckFill } from "react-icons/bs";
import { useProductContext } from "../context/ProductContext";
import { useEffect, useState } from "react";
import Utility from "../Utils/Utility";
import { Link } from "react-router-dom";

import imac_front_fallback_img from '../assets/product_images/imac-front.svg';
import imac_front_dark_fallback_img from '../assets/product_images/imac-front-dark.svg';

const SelectedItemCard = ({ product_id, image_url = imac_front_fallback_img, darkmode_image_url = imac_front_dark_fallback_img, image_label = 'unknown image', product_name = 'unknown product', price = 0, discount = 0, isCartPage = true, is_in_Cart = false, removeFromCart, is_wishlisted = false, wishlist_products = [] }) => {

  const discounted_price = price - (((discount / 100) * price)) || 0;

  const [qty, setQty] = useState(1);
  const [isChangedByUser, setisChangedByUser] = useState(false);

  const { state, addToWishlist, addToCart, removeFromWishlist, updateQuantity } = useProductContext();

  const cart_products = state?.cart || [];

  const [isWishlisted, setIsWishlisted] = useState(is_wishlisted || false);
  const [isInCart, setIsInCart] = useState(is_in_Cart || false);

  const product_info = state?.products?.products.find((each) => each.id === product_id);

  useEffect(() => {
    const prevQty = cart_products.find((each_item) => each_item.id === product_id)?.qty;
    if (prevQty === undefined) {
      setQty(product_info?.minimumOrderQuantity || 1);
      return;
    };
    const newQty = (prevQty < product_info?.minimumOrderQuantity) ? product_info?.minimumOrderQuantity : prevQty;
    if (newQty !== qty) setQty(newQty);
    if (isChangedByUser !== false) setisChangedByUser(false);

  }, [cart_products]);


  const handleCartWishlist = (handle_type = 'wishlist') => {

    if (handle_type === 'wishlist') {
      if (wishlist_products.includes(product_id)) {
        removeFromWishlist(product_id);
        setIsWishlisted(false);
      } else {
        addToWishlist(product_id);
        setIsWishlisted(true);
      }
      return;
    } else if (handle_type === 'cart') {
      if (Utility.isAvailableInCart(cart_products, product_id)) {
        removeFromCart(product_id);
        setIsInCart(false);
      } else {
        const initialQty = Math.max(qty, product_info?.minimumOrderQuantity || 1);
        addToCart(product_id, initialQty);
        setIsInCart(true);
      }

      return;
    }


  };

  const handleQty = (type = 'minus') => {

    setQty(prev => {
      let updated_qty = prev;

      if (type === 'minus') {
        if (prev > product_info?.minimumOrderQuantity) {
          updated_qty = prev - 1;
        }
      } else {
        if (prev < product_info?.stock) {
          updated_qty = prev + 1;
        }
      }

      // Set the user-trigger flag only if the qty actually changes
      if (updated_qty !== prev) {
        setisChangedByUser(true);
      }

      return updated_qty;

    });

  };

  useEffect(() => {
    if (isCartPage && isChangedByUser) {
      updateQuantity(product_id, qty);
      setisChangedByUser(false);
    }
  }, [qty]);

  // will trigger when image failed to load
  const handleImgError = (event, mode = 'dark') => {
    event.target.src = (mode === 'dark') ? imac_front_dark_fallback_img : imac_front_fallback_img;
  };


  return (
    <div className="relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6 group">
      {/* discount div */}
      <div className="absolute top-1 right-1 bg-green-600 rounded text-white p-0.5 text-xs hidden group-hover:block">-{discount}%</div>
      {/* discount div end*/}
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <a href="#" className="shrink-0 md:order-1">
          <img className="h-20 w-20 dark:hidden" src={image_url} alt={image_label} onError={(e) => handleImgError(e, 'light')} />
          <img className="hidden h-20 w-20 dark:block" src={darkmode_image_url} alt={image_label} onError={handleImgError} />
        </a>

        <label for="counter-input" className="sr-only">Choose quantity:</label>
        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center">
            <button type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700" onClick={() => handleQty()}>
              <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
              </svg>
            </button>
            <input type="text" id="counter-input" data-input-counter className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" placeholder="" value={Math.max(qty, product_info?.minimumOrderQuantity || 1)} required readOnly />
            <button type="button" id="increment-button" data-input-counter-increment="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700" onClick={() => handleQty('plus')}>
              <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
          <div className="text-end md:order-4 md:w-32">
            {discount > 0 ? (<><p className="text-base font-bold text-red-700 line-through">₹{price}</p>
              <p className="text-base font-bold text-green-600">₹{discounted_price.toFixed(2)}</p></>) :
              (<p className="text-base font-bold text-gray-900 dark:text-white">${price}</p>)
            }
          </div>
        </div>

        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <Link to={`/product/${product_id}`} className="text-base font-medium text-gray-900 hover:underline dark:text-white">{product_name}</Link>

          <div className="flex items-center gap-4">
            {isCartPage ? (<button type="button" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white" onClick={() => handleCartWishlist()}>
              {/* <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                    </svg> */}
              {isWishlisted ? <RiPokerHeartsFill fill='crimson' size={20} /> : <RiPokerHeartsLine size={20} />}
              {isWishlisted ? 'Remove from Wishlists' : 'Add to Wishlists'}
            </button>) : (<Button onClick={() => handleCartWishlist('cart')}>
              {/* <svg className="-ms-2 me-0.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                  </svg>  */}
              {isInCart ? <BsFillCartCheckFill /> : <BsFillCartPlusFill />}
              {isInCart ? "In Cart" : "Add to Cart"}
            </Button>)
            }

            <button type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500" onClick={() => isCartPage ? removeFromCart(product_id) : removeFromWishlist(product_id)}>
              <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
              </svg>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectedItemCard;