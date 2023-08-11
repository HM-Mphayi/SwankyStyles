import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { sortProducts } from "../../redux/Reducers/ProductSlice";
import { COMPONENTS, SORT_OPTIONS } from "../../components/Constants/Constants";
import { RxMixerHorizontal } from "react-icons/rx";
import { checkBoxState } from "../../utils/HandleCheckbox";
import Offcanvas from "react-bootstrap/Offcanvas";
import FetchData from "../../utils/FetchData";
import Card from "../../components/Card/Card";
import "./Products.scss";

import HandleCheckbox, { ClearFilters } from "../../utils/HandleCheckbox";

function Products() {
  const [show, setShow] = useState(false);
  const { category } = useParams();
  const { products, subCategories, filteredProducts } = useSelector(
    (store) => store.products
  );
  const [selectedSortOption, setSelectedSortOption] = useState("SORT");
  const dispatch = useDispatch();

  useEffect(() => {
    const URL = `${process.env.REACT_APP_API_URL}/product/category/${category}`;
    FetchData(URL, dispatch, COMPONENTS.Category);
    ClearFilters();
    setSelectedSortOption("SORT");
    console.log("rendered");
  }, [category]);

  //Handle selected sort option
  const handleSelect = (e) => {
    setSelectedSortOption(e.target.value);

    dispatch(sortProducts(e.target.value));
  };

  const renderFilters = subCategories.map((subCategory) => {
    return (
      <div key={subCategory}>
        <input
          type="checkbox"
          id={subCategory}
          value={subCategory}
          name={subCategory}
          className="me-2"
          checked={!!checkBoxState[subCategory]}
          onChange={(e) => {
            HandleCheckbox(selectedSortOption, dispatch, e);
          }}
        />
        <label htmlFor="Dresses">{subCategory}</label>
        <br />
      </div>
    );
  });

  //Filters offCanvas functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let x = [];

  return (
    <main className="products d-flex w-100">
      <section className="left h-50 ms-2">
        <h2 className="mt-2 mb-2">Filters</h2>
        <h4>Product Categories</h4>

        {renderFilters}
      </section>

      <section className="right">
        <div className="top d-flex flex-sm-row flex-column justify-content-between  pe-md-5 pe-3  align-items-sm-center">
          <h2 className="ms-3 ms-sm-1">{category} Fashion</h2>

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
          <p className="fw-bolder ">
            {filteredProducts.length > 0
              ? filteredProducts.length
              : products.length}
          </p>
          <p className="text-black-50 fw-bold">items</p>
        </div>

        <div className="category-products d-flex flex-wrap justify-content-around ">
          {filteredProducts.length > 0
            ? filteredProducts.map((product) => {
                return <Card product={product} key={product._id} />;
              })
            : products.map((product) => {
                return <Card product={product} key={product._id} />;
              })}
        </div>
      </section>
    </main>
  );
}

export default Products;