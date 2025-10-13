// This class is responsible for the multi-utility methods

class Utility {
  static findLengthOfCart(cart_arr = []) {
    const arr = structuredClone(cart_arr);
    let count_product_total_qty = 0;

    arr.forEach((obj) => {
      count_product_total_qty += obj.qty;
    });
    // alert(count_product_total_qty);
    // console.log("CART ARR", cart_arr);
    return count_product_total_qty;
  }

  static isAvailableInCart(cart_arr = [], id) {
    return cart_arr.some((each_obj) => each_obj.id === id);
  }

  static isAvailableInWishlist(wishlist_arr = [], id) {
    //
  }

  static fetchProductDataFromArr(product_arr, id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // console.error(product_arr);
          const result = product_arr?.find(
            (each_product) => each_product.id == id
          );
          // console.log("--->", result);
          resolve(result);
        } catch (error) {
          console.error(`${error.name} -> ${error.message}`);
          reject(null);
        }
      }, 2000);
    });
  }
}

export default Utility;
