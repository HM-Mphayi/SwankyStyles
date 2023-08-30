import {
  setIsLoading,
  setProducts,
  setCategories,
  setSubCategories,
} from "../redux/Reducers/ProductSlice";
import axios from "axios";
import { COMPONENTS } from "../components/Constants/Constants";

const FetchData = async (URL, dispatch, component) => {
  let subCategories = [];
  let categories = [];
  try {
    dispatch(setIsLoading(true));
    const response = await axios.get(URL);

    if (component === COMPONENTS.Category) {
      //Get sub-categories
      response.data.map((product) => {
        const exist = subCategories.find(
          (subCategory) => subCategory === product.subCategory
        );

        if (!exist && product.subCategory !== "N/A") {
          subCategories.push(product.subCategory);
        }
      });

      //set categories
      dispatch(setSubCategories(subCategories));
    } else if (component === COMPONENTS.Sub_Category) {
      //Get categories (KIDS, LADIES, MEN)
      response.data.map((product) => {
        const exist = categories.find(
          (category) => category === product.category
        );

        if (!exist && product.category !== "N/A") {
          categories.push(product.category);
        }
      });
      dispatch(setCategories(categories));
    }

    //Set products
    dispatch(setProducts(response.data));

    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
};

export default FetchData;
