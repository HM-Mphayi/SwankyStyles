import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { SORT_OPTIONS } from "../../components/Constants/Constants";
import { sortProducts } from "../../redux/Reducers/ProductSlice";
import { RxMixerHorizontal } from "react-icons/rx";
import { COMPONENTS } from "../../components/Constants/Constants";
import HandleCheckbox, {
  ClearFilters,
  checkBoxState,
} from "../../utils/HandleCheckbox";
import FetchData from "../../utils/FetchData";
import Card from "../../components/Card/Card";
import "./SubCategory.scss";
import CustomPagination from "../../components/Pagination/CustomPagination";

let filters = [];

export default function SubCategory() {
  const [selectedSortOption, setSelectedSortOption] = useState("SORT");
  const { subCategory } = useParams();
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const { renderedProducts, categories } = useSelector(
    (store) => store.products
  );

  useEffect(() => {
    const URL = `${process.env.REACT_APP_API_URL}/product/subCategory/${subCategory}`;
    FetchData(URL, dispatch, COMPONENTS.Sub_Category);
    setSelectedSortOption("SORT");
    ClearFilters();
    filters = [];
    console.log(categories);
  }, [subCategory]);

  //Handle selected sort option
  const handleSelect = (e) => {
    setSelectedSortOption(e.target.value);

    dispatch(sortProducts(e.target.value));
  };

  return (
    <main className="subCategory">
      <section className="left">
        <h2>Filters</h2>
        <h4>Department</h4>
        {categories.map((category) => {
          return (
            <div key={category}>
              <input
                type="checkbox"
                id={category}
                value={category}
                name={category}
                className="me-2"
                checked={!!checkBoxState[category]}
                onChange={(e) =>
                  HandleCheckbox(selectedSortOption, dispatch, e)
                }
              />
              <label htmlFor="Dresses">{category}</label>
              <br />
            </div>
          );
        })}
      </section>

      <section className="right">
        <div className="top d-flex flex-sm-row flex-column justify-content-between  pe-md-5 pe-3  align-items-sm-center">
          <h2 className="ms-3 ms-sm-1">
            Shop {subCategory === "Dress" ? "Dresses" : subCategory}
          </h2>

          <div className="sort-filter d-flex align-items-center gap-5">
            <select
              name="sort"
              className="form-select"
              value={selectedSortOption}
              onChange={handleSelect}
            >
              <option disabled> SORT</option>
              {SORT_OPTIONS.map((sortOption) => {
                return <option key={sortOption}>{sortOption}</option>;
              })}
            </select>
            <p className="filters d-flex d-sm-none d-block mt-3 gap-3 align-items-center justify-content-center">
              FILTERS <RxMixerHorizontal />
            </p>
          </div>
        </div>

        <div className="d-flex gap-1 ms-sm-2 ms-4 mt-2">
          <p className="fw-bolder ">{renderedProducts.length}</p>
          <p className="text-black-50 fw-bold">items</p>
        </div>

        <div className="subCategory-products d-flex flex-wrap justify-content-around ">
          {renderedProducts.slice(8 * page - 8, 8 * page).map((product) => {
            return <Card product={product} key={product._id} />;
          })}
        </div>
        <div className="pagination">
          {<CustomPagination setPage={setPage} />}
        </div>
      </section>
    </main>
  );
}
