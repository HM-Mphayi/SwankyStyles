import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { sortProducts } from "../../redux/Reducers/ProductSlice";
import { SORT_OPTIONS } from "../../components/Constants/Constants";
import { RxMixerHorizontal } from "react-icons/rx";
import { checkBoxState } from "../../utils/HandleCheckbox";

import Card from "../../components/Card/Card";
import CardSkeleton from "../../components/Card/CardSkeleton/CardSkeleton";
import CustomPagination from "../../components/Pagination/CustomPagination";
import HandleCheckbox, { ClearFilters } from "../../utils/HandleCheckbox";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./SearchedResults.scss";

export default function SearchedResults() {
  const { categories, renderedProducts, isLoading } = useSelector(
    (store) => store.products
  );
  const [selectedSortOption, setSelectedSortOption] = useState("SORT");
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const { searchText } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  //OffCanvas filters  functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    ClearFilters();
    setSelectedSortOption("SORT");

    if (searchText?.length < 2) {
      navigate("/");
    }
  }, [searchText]);

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])

  return (
    <main className="searched-products d-flex w-100">
      <section className="left h-50 ms-2">
        <h2 className="mt-2 mb-2">Filters</h2>
        <h4>Product Categories</h4>

        {renderFilters}
      </section>

      <section className="right">
        <div className="top d-flex flex-sm-row flex-column justify-content-between  pe-md-5 pe-3  align-items-sm-center">
          <h2 className="ms-3 ms-sm-1">
            Results for {searchText ? searchText : ""}
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

            <Offcanvas show={show} onHide={() => handleClose()}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Filters</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>{renderFilters}</Offcanvas.Body>
            </Offcanvas>
          </div>
        </div>

        <div className="d-flex gap-1 ms-sm-2 ms-4 mt-2">
          <p className="fw-bolder ">{renderedProducts.length}</p>
          <p className="text-black-50 fw-bold">items</p>
        </div>

        <div className="d-flex flex-wrap justify-content-around justify-content-center justify-content-sm-start gap-2 gap-sm-3 ">
          {isLoading ? (
            <CardSkeleton />
          ) : renderedProducts.length > 0 ? (
            renderedProducts.slice(page * 8 - 8, page * 8).map((product) => {
              return <Card product={product} key={product._id} />;
            })
          ) : (
            <h1 className="no-results">NO RESULTS FOUND</h1>
          )}
        </div>

        <div className="pagination">
          {<CustomPagination setPage={setPage} />}
        </div>
      </section>
    </main>
  );
}
