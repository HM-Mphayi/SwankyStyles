import { createSlice } from "@reduxjs/toolkit";
import {
  PRICE_HIGH_TO_LOW,
  PRICE_LOW_TO_HIGH,
} from "../../components/Constants/Constants";

const initialState = {
  products: [],
  subCategories: [],
  categories: [],
  filteredProducts: [],
  wishlistProducts: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, actions) => {
      state.products = actions.payload;
      state.filteredProducts = [];
    },

    setSubCategories: (state, actions) => {
      state.subCategories = actions.payload;
    },

    setCategories: (state, actions) => {
      state.categories = actions.payload;
    },

    addOrRemoveWishlistItems: (state, actions) => {
      console.log(actions.payload);
    },

    filterProducts: (state, actions) => {
      const fitlterOptions = actions.payload;

      if (fitlterOptions.length > 0) {
        const matchedProducts = [...state.products].filter((product) => {
          for (let i = 0; i < fitlterOptions.length; i++) {
            if (
              product.subCategory.toLowerCase() ===
                fitlterOptions[i].toLowerCase() ||
              product.category.toLowerCase() === fitlterOptions[i].toLowerCase()
            ) {
              return product;
            }
          }
        });

        state.filteredProducts = matchedProducts;
      } else {
        state.filteredProducts = [];
      }
    },

    sortProducts: (state, actions) => {
      const selectedSortOption = actions.payload;
      let sortedProducts;

      switch (selectedSortOption) {
        case PRICE_HIGH_TO_LOW:
          if (state.filteredProducts.length > 0) {
            sortedProducts = state.filteredProducts.sort((a, b) => {
              return b.price - a.price;
            });
            state.filteredProducts = sortedProducts;
          } else {
            sortedProducts = state.products.sort((a, b) => {
              return b.price - a.price;
            });
            state.products = sortedProducts;
          }
          break;

        case PRICE_LOW_TO_HIGH:
          if (state.filteredProducts.length > 0) {
            sortedProducts = state.filteredProducts.sort((a, b) => {
              return a.price - b.price;
            });
            state.filteredProducts = sortedProducts;
          } else {
            sortedProducts = state.products.sort((a, b) => {
              return a.price - b.price;
            });
            state.products = sortedProducts;
          }
          break;
        default:
          break;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setProducts,
  setCategories,
  setSubCategories,
  filterProducts,
  sortProducts,
} = productSlice.actions;

export default productSlice.reducer;
