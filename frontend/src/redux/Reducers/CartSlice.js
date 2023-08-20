import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  cartItems: [],
};

const findItem = (cartItems, action) => {
  const Item = cartItems.find(
    (item) =>
      item._id === action.payload._id && item.size === action.payload.size
  );
  return Item;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    initCartItems: (state, action) => {
      state.cartItems = action.payload;
    },

    addItemToCart: (state, action) => {
      const item = findItem(state.cartItems, action);
      findItem(state.cartItems, action);
      if (item) {
        item.quantity++;
      } else {
        state.cartItems.push(action.payload);
      }
    },

    decrementItemQuantity: (state, action) => {
      const item = findItem(state.cartItems, action);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },

    incrementItemQuantity: (state, action) => {
      const item = findItem(state.cartItems, action);
      if (item) {
        item.quantity++;
      }
    },

    deleteItemFromCart: (state, action) => {
      const item = findItem(state.cartItems, action);
      if (item) {
        const filteredItems = state.cartItems.filter(
          (cartItem) => cartItem !== item
        );
        state.cartItems = filteredItems;
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  toggleCart,
  addItemToCart,
  decrementItemQuantity,
  incrementItemQuantity,
  deleteItemFromCart,
  initCartItems,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
