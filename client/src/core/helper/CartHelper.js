export const addProductToCart = (product, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({...product});
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const removeProductFromCart = (id) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      cart.map((product, index) => {
        if (id == product._id) {
          return cart.splice(index, 1); // bug
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
};

export const loadCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
};

export const cartEmpty = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      localStorage.removeItem("cart");
    }
  }
};
