// This class is responsible for the multi-utility methods

class Utility {
  static findLengthOfCart(cart_arr = []) {
    const arr = structuredClone(cart_arr);
    let count_product_total_qty = 0;

    arr.forEach((obj) => {
      count_product_total_qty += obj.qty;
    });
    return count_product_total_qty;
  }

  static isAvailableInCart(cart_arr = [], id) {
    return cart_arr.some((each_obj) => each_obj.id === id);
  }

  static fetchProductDataFromArr(product_arr, id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const result = product_arr?.find(
            (each_product) => each_product.id == id
          );
          resolve(result);
        } catch (error) {
          console.error(`${error.name} -> ${error.message}`);
          reject(null);
        }
      }, 2000);
    });
  }

  // Auth form validation
  static validateForm(type, data) {
    const errors = {};

    // Email validation
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@(?!.*\.\.)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!data.email || !emailRegex?.test(data.email)) {
      errors.email = "Valid email is required";
    }

    // Password validation
    const password = data.password || "";
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

    if (!passwordRegex.test(password)) {
      errors.password =
        "Password must be at least 6 characters and include uppercase, lowercase, number, and special character";
    }

    // Registration-specific validations
    if (type === "register") {
      if (!data.username || data.username.trim().length < 3) {
        errors.username = "Username must be at least 3 characters";
      }

      if (!data.confirmPassword || data.confirmPassword !== data.password) {
        errors.confirmPassword = "Passwords do not match";
      }
    }

    return errors;
  }
  // debounce method
  static debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }
}

export default Utility;
