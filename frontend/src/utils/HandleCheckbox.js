import { filterProducts, sortProducts } from "../redux/Reducers/ProductSlice";

let Filters = [];
export let checkBoxState = {};

export default function HandleCheckbox(selectedSortOption, dispatch, e) {
  const { name, checked } = e.target;

  //Track the state of the checkboxes
  checkBoxState[name] = checked;

  /*
   *If the filter is checked, add it to the Filters array
   *If the filter is unchecked, remove it from Filters array
   */

  if (checked) {
    Filters.push(name);
  } else {
    const updatedFilters = Filters.filter(
      (filterOption) => filterOption !== name
    );
    Filters = updatedFilters;
  }

  dispatch(filterProducts(Filters));

  //If the user also selected the sort option, sort the products after applying filters
  if (selectedSortOption !== "SORT") {
    dispatch(sortProducts(selectedSortOption));
  }
}

export const ClearFilters = () => {
  Filters = [];
  checkBoxState = {};
};
