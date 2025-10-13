// This is context for global state management which uses createContext & useContext hook from React 
// And It also utilizes the product store via useReducer() hook for better state management

import { createContext, useCallback, useContext, useReducer } from "react";

import { ACTIONS, init, INITIAL_VALUE, reducer } from "../store/productStore";

const DEFAULT_VALUES = {
    product_store: {}, // came from productStore.js
    addToWishlist: () => { },
    removeFromWishlist: () => { },
    addToCart: () => { },
    removeFromCart: () => { },
    updateQuantity: () => { },
    ACTIONS, // action obj came from productStore.js
};

const ProductContext = createContext(DEFAULT_VALUES);

const ProductContextProvider = (props) => {

    const [state, dispatch] = useReducer(reducer, INITIAL_VALUE, init);

    // methods for dispatch

    // the method to add product to wishlist
    const addToWishlist = useCallback((id) => {
        try {
            console.warn("addToWishlist called for id", id);
            if (!id) {
                throw new ReferenceError("`id` param is required before adding item to wishlist!");
            }

            dispatch({
                type: ACTIONS.ADD_TO_WISHLIST,
                payload: { product_id: id }
            });
        } catch (error) {
            console.error(`${error.name} -> ${error.message}`);
        }

    }, []);

    // the method to remove product from wishlist
    const removeFromWishlist = useCallback((id) => {
        try {
            console.warn("removeFromWishlist called for id", id);
            if (!id) {
                throw new ReferenceError("`id` param is required before removing item from wishlist!");
            }

            dispatch({
                type: ACTIONS.REMOVE_FROM_WISHLIST,
                payload: { product_id: id }
            });
        } catch (error) {
            console.error(`${error.name} -> ${error.message}`);
        }

    }, []);

    // the method to add product to cart
    const addToCart = useCallback((id, qty) => {
        try {
            console.warn("addToCart called for id", id);
            if (!id) {
                throw new ReferenceError("`id` param is required before adding item to cart!");
            }

            dispatch({
                type: ACTIONS.ADD_TO_CART,
                payload: { product_id: id, product_qty: qty || 1 },
            });
        } catch (error) {
            console.error(`${error.name} -> ${error.message}`);
        }
    }, []);

    // the method to remove product from cart
    const removeFromCart = useCallback((id) => {
        try {
            console.warn("removeFromCart called for id", id);
            if (!id) {
                throw new ReferenceError("`id` param is required before removing item from cart!");
            }

            dispatch({
                type: ACTIONS.REMOVE_FROM_CART,
                payload: { product_id: id }
            });
        } catch (error) {
            console.error(`${error.name} -> ${error.message}`);
        }
    }, []);

    const updateQuantity = useCallback((id, qty) => {
        try {
            if (!id) {
                throw new ReferenceError("`id` param is required before updating quantity from cart!");
            } else if (!qty) {
                throw new ReferenceError("`qty` param is required before updating quantity from cart!");
            }

            dispatch({
                type: ACTIONS.UPDATE_QUANTITY,
                payload: { product_id: id, product_qty: qty || 1 },
            });
        } catch (error) {
            console.error(`${error.name} -> ${error.message}`);
        }
    }, []);


    return (
        <ProductContext.Provider value={{ state, addToWishlist, addToCart, updateQuantity, removeFromWishlist, removeFromCart, ACTIONS }}>
            {props?.children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => {
    return useContext(ProductContext);
};

export default ProductContextProvider;