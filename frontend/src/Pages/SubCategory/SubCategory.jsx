import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { SORT_OPTIONS } from "../../components/Constants/Constants";
import { clearState, sortProducts } from "../../redux/Reducers/ProductSlice";
import { RxMixerHorizontal } from "react-icons/rx";
import { COMPONENTS } from "../../components/Constants/Constants";
import FetchData from "../../utils/FetchData";
import Card from "../../components/Card/Card";
import CardSkeleton from "../../components/Card/CardSkeleton/CardSkeleton";
import CustomPagination from "../../components/Pagination/CustomPagination";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./SubCategory.scss";

import HandleCheckbox, {
  ClearFilters,
  checkBoxState,
} from "../../utils/HandleCheckbox";

export default function SubCategory() {
  const { renderedProducts, categories, isLoading } = useSelector(
    (store) => store.products
  );
  const [selectedSortOption, setSelectedSortOption] = useState("SORT");
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const { subCategory } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const URL = `${process.env.REACT_APP_API_URL}/product/subCategory/${subCategory}`;
    dispatch(clearState());
    ClearFilters();
    setSelectedSortOption("SORT");
    FetchData(URL, dispatch, COMPONENTS.Sub_Category);
  }, [subCategory]);

  //Handle selected sort option
  function handleSelect(e) {
    setSelectedSortOption(e.target.value);

    dispatch(sortProducts(e.target.value));
  }

  const renderFilters = categories.map((category) => {
    return (
      <div key={category}>
        <input
          type="checkbox"
          id={category}
          value={category}
          name={category}
          className="me-2"
          checked={!!checkBoxState[category]}
          onChange={(e) => {
            HandleCheckbox(selectedSortOption, dispatch, e);
          }}
        />
        <label htmlFor={category}>{category}</label>
        <br />
      </div>
    );
  });

  //Filters offCanvas functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <main className="subCategory">
      <section className="left">
        <h2>Filters</h2>
        <h4>Departments</h4>
        {renderFilters}

        {/* Filters on mobile devices */}
        <Offcanvas show={show} onHide={() => handleClose()}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filters</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>{renderFilters}</Offcanvas.Body>
        </Offcanvas>
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
            <p
              onClick={handleShow}
              className="filters d-flex d-sm-none d-block mt-3 gap-3 align-items-center justify-content-center"
            >
              FILTERS <RxMixerHorizontal />
            </p>
          </div>
        </div>

        <div className="d-flex gap-1 ms-sm-2 ms-4 mt-2">
          <p className="fw-bolder ">{renderedProducts?.length}</p>
          <p className="text-black-50 fw-bold">items</p>
        </div>

        <div className="subCategory-products d-flex flex-wrap justify-content-center justify-content-sm-start gap-2 gap-sm-3 ">
          {isLoading ? (
            <CardSkeleton />
          ) : (
            renderedProducts.slice(8 * page - 8, 8 * page).map((product) => {
              return <Card product={product} key={product._id} />;
            })
          )}
        </div>
        <div className="pagination">
          {<CustomPagination setPage={setPage} />}
        </div>
      </section>
    </main>
  );
}
