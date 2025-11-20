import React from "react";
import { IoMdStar } from "react-icons/io";
import { BsFillCartPlusFill, BsFillCartCheckFill } from "react-icons/bs";
import { RiPokerHeartsLine, RiPokerHeartsFill } from "react-icons/ri";
import Button from "./Button";
import { useProductContext } from "../context/ProductContext";
import Utility from "../Utils/Utility";
import { Link } from "react-router-dom";

import placeholder_image from "../assets/placeholder-image-400x400.png";

const Card = ({ item }) => {

    const [isImageError, setIsImageError] = React.useState(!window.navigator.onLine);

    const { state, addToWishlist, removeFromWishlist, addToCart, removeFromCart } = useProductContext();

    const [isInCart, setIsInCart] = React.useState(Utility.isAvailableInCart(state.cart, item.id) ? 1 : 0);

    const [isWishlisted, setIsWishlisted] = React.useState(state.wishlist.includes(item.id) ? true : false);


    const handleWishlistOperation = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const item_id = item.id;
        if (state?.wishlist.includes(item_id)) {
            removeFromWishlist(item_id);
            setIsWishlisted(false);
        } else {
            addToWishlist(item_id);
            setIsWishlisted(true);
        }
    };

    const handleCartOperation = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const item_id = item.id;
        if (Utility.isAvailableInCart(state?.cart, item_id)) {
            removeFromCart(item_id);
            setIsInCart(0)
        } else {
            addToCart(item_id, item?.minimumOrderQuantity);
            setIsInCart(1);
        }
    };

    // will trigger when image failed to load
    const handleImgError = (event) => {
        event.target.src = placeholder_image;
        // event.target.style.objectFit = 'cover';
    };


    return (<Link to={`/product/${item.id}`} className="card block min-w-48 max-w-48 overflow-hidden min-h-60 h-fit p-1 rounded-xl border dark:bg-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600 shadow-xl transition-all duration-300 hover:scale-105 hover:border-purple-800 dark:hover:bg-gray-500 will-change-transform">
        <div className='relative w-full h-32 overflow-hidden rounded-md group flex items-center justify-center'>
            <img src={isImageError ? (placeholder_image) : item?.thumbnail} alt="image is unable to load" loading="lazy" onError={handleImgError} className='w-full h-full object-cover outline-none border-none transition-transform duration-200 transform scale-100 group-hover:scale-150' />
            <span className='absolute top-1 left-1 px-1 py-0.5 border-none outline-none shadow-md w-fit h-fit rounded-md bg-green-600 text-white text-xs font-medium'>-{item?.discountPercentage || null}%</span>
            <button type='button' aria-label="add to wishlist button" title="add to wishlist" className='absolute top-1 right-1 w-fit h-1/5 py-0.5 px-1 rounded-full bg-white active:scale-90 transition-transform duration-200' onClick={handleWishlistOperation}>{isWishlisted ? <RiPokerHeartsFill fill='crimson' /> : <RiPokerHeartsLine fill='black' />}</button>
        </div>
        <div>
            <h5 className='font-semibold w-full overflow-hidden text-ellipsis text-nowrap'>{item?.title || "Product Name!"}</h5>
            <div className='flex gap-1 items-center my-1'>
                <IoMdStar fill='goldenrod' size={20} />
                {item?.rating || 'Error'}
            </div>
            <h4 className='font-semibold'>₹{item?.price}</h4>
            <div className='p-1 my-1 flex items-center justify-center'>
                <Button label={isInCart ? "In Cart" : "Add to Cart"} icon={isInCart === 0 ? <BsFillCartPlusFill size={15} /> : <BsFillCartCheckFill size={15} />} onClickHandler={handleCartOperation} />
            </div>
        </div>
    </Link>);
};

export default React.memo(Card);