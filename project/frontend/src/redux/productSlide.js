import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Function to load cart items from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
  } catch (e) {
    console.error("Could not load cart items from localStorage", e);
    return [];
  }
};

// Function to save cart items to localStorage
const saveCartToLocalStorage = (cartItems) => {
  try {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  } catch (e) {
    console.error("Could not save cart items to localStorage", e);
  }
};

const initialState = {
  productList: [],
  cartItem: loadCartFromLocalStorage(), // Load cart items from localStorage on init
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      state.productList = [...action.payload];
    },
    addCartItem: (state, action) => {
      const check = state.cartItem.some((el) => el._id === action.payload._id);
      if (check) {
        toast("Already Item in Cart");
      } else {
        toast("Item Added successfully");

        const total = action.payload.price;
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qty: 1, total: total },
        ];

        saveCartToLocalStorage(state.cartItem); // Save updated cart to localStorage
      }
    },
    deleteCartItem: (state, action) => {
      toast("Item is removed from CART");
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      if (index !== -1) {
        state.cartItem.splice(index, 1);
        saveCartToLocalStorage(state.cartItem); // Save updated cart to localStorage
      }
    },
    increaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      if (index !== -1) {
        let qty = state.cartItem[index].qty;
        const qtyInc = ++qty;
        state.cartItem[index].qty = qtyInc;

        const price = state.cartItem[index].price;
        const total = price * qtyInc;
        state.cartItem[index].total = total;

        saveCartToLocalStorage(state.cartItem); // Save updated cart to localStorage
      }
    },
    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      if (index !== -1) {
        let qty = state.cartItem[index].qty;
        if (qty > 1) {
          const qtyDec = --qty;
          state.cartItem[index].qty = qtyDec;

          const price = state.cartItem[index].price;
          const total = price * qtyDec;
          state.cartItem[index].total = total;

          saveCartToLocalStorage(state.cartItem); // Save updated cart to localStorage
        }
      }
    },
    updateProduct: (state, action) => {
      const updatedProduct = action.payload;
      const index = state.productList.findIndex(
        (product) => product._id === updatedProduct._id
      );
      if (index !== -1) {
        state.productList[index] = updatedProduct; // Update the product in the list
      }
    },
    // New action to clear the cart
    clearCart: (state) => {
      state.cartItem = []; // Clear the cart
      saveCartToLocalStorage([]); // Clear the localStorage as well
      toast("Cart cleared successfully!");
    },
  },
});

export const {
  setDataProduct,
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty,
  updateProduct,
  clearCart, // Export the clearCart action
} = productSlice.actions;

export default productSlice.reducer;
