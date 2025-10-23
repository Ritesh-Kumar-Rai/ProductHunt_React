// The productStore is for useReducer() hook

import product_raw_data from "../constants/products.json";
import Utility from "../Utils/Utility";

const INITIAL_VALUE = {
  products: product_raw_data, // an object which has {products: Array(194), total: 194, skip: 0, limit: 194}
  cart: [], // {id: Number, qty: Number}
  wishlist: [],
};

const init = (prev_state) => {
  return prev_state;
};

const ACTIONS = {
  ADD_TO_CART: "ADD_TO_CART",
  ADD_TO_WISHLIST: "ADD_TO_WISHLIST",
  REMOVE_FROM_WISHLIST: "REMOVE_FROM_WISHLIST",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
};

const reducer = (state, action) => {
  try {
    switch (action?.type) {
      case ACTIONS.ADD_TO_CART: {
        const isExist = Utility.isAvailableInCart(
          state.cart,
          action.payload.product_id
        );
        if (!isExist) {
          return {
            ...state,
            cart: [
              ...state.cart,
              {
                id: action.payload.product_id,
                qty: action.payload.product_qty || 1,
              },
            ],
          };
        }
        return state;
      }
      case ACTIONS.ADD_TO_WISHLIST:
        if (!state.wishlist.includes(action.payload.product_id)) {
          return {
            ...state,
            wishlist: [...state.wishlist, action.payload.product_id],
          };
        }
        return state;
      case ACTIONS.REMOVE_FROM_CART:
        return {
          ...state,
          cart: state.cart.filter(
            (obj) => obj.id !== action.payload.product_id
          ),
        };
      case ACTIONS.REMOVE_FROM_WISHLIST:
        // const index_to_remove = state.wishlist.indexOf(action.payload.product_id);
        return {
          ...state,
          wishlist: state.wishlist.filter(
            (id) => id !== action.payload.product_id
          ),
        };
      case ACTIONS.UPDATE_QUANTITY: {
        if (!action.payload.product_qty) {
          return state; // incase qty is not passed from user then, return the whole state without modifying anything
        }

        return {
          ...state, // restore the all state like products and wishlist arrays
          cart: state.cart.map((each_item) => {
            // start manipulating cart array for qty updation
            if (each_item.id === action.payload.product_id) {
              // perform qty operation
              if (
                each_item.qty < action.payload.product_qty ||
                each_item.qty > action.payload.product_qty
              ) {
                return { ...each_item, qty: action.payload.product_qty };
              }
              return {
                ...each_item,
                qty: each_item.qty + 1, // increment by 1, if the cart current qty is equal to user passed qty..
              };
            }
            return each_item;
          }),
        };
      }
      default:
        return state;
    }
  } catch (error) {
    console.error(`${error.name} -> ${error.message}`);
  }
};

export { INITIAL_VALUE, ACTIONS, init, reducer };
