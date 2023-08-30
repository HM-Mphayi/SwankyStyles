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
  renderedProducts: [],
  isLoading: true,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearState: (state, actions) => {
      state.products = [];
      state.subCategories = [];
      state.categories = [];
      state.filteredProducts = [];
      state.renderedProducts = [];
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setProducts: (state, actions) => {
      state.products = actions.payload;
      state.filteredProducts = [];
      state.renderedProducts = actions.payload;
    },

    setSubCategories: (state, actions) => {
      state.subCategories = actions.payload;
    },

    setCategories: (state, actions) => {
      state.categories = actions.payload;
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
        state.renderedProducts = matchedProducts;
      } else {
        state.filteredProducts = [];
        state.renderedProducts = state.products;
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
            state.renderedProducts = sortedProducts;
          } else {
            sortedProducts = state.products.sort((a, b) => {
              return b.price - a.price;
            });
            state.renderedProducts = sortedProducts;
          }
          break;

        case PRICE_LOW_TO_HIGH:
          if (state.filteredProducts.length > 0) {
            sortedProducts = state.filteredProducts.sort((a, b) => {
              return a.price - b.price;
            });
            state.renderedProducts = sortedProducts;
          } else {
            sortedProducts = state.products.sort((a, b) => {
              return a.price - b.price;
            });
            state.renderedProducts = sortedProducts;
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
  setIsLoading,
  clearState,
  setProducts,
  setCategories,
  setSubCategories,
  filterProducts,
  sortProducts,
} = productSlice.actions;

export default productSlice.reducer;
