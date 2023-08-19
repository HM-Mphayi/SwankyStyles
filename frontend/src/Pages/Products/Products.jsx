import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { sortProducts, clearState } from "../../redux/Reducers/ProductSlice";
import { COMPONENTS, SORT_OPTIONS } from "../../components/Constants/Constants";
import { RxMixerHorizontal } from "react-icons/rx";
import Offcanvas from "react-bootstrap/Offcanvas";
import FetchData from "../../utils/FetchData";
import Card from "../../components/Card/Card";
import CustomPagination from "../../components/Pagination/CustomPagination";
import "./Products.scss";

import HandleCheckbox, {
  ClearFilters,
  checkBoxState,
} from "../../utils/HandleCheckbox";

function Products() {
  const { subCategories, renderedProducts } = useSelector(
    (store) => store.products
  );
  const [selectedSortOption, setSelectedSortOption] = useState("SORT");
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const { category } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const URL = `${process.env.REACT_APP_API_URL}/product/category/${category}`;
    dispatch(clearState());
    ClearFilters();
    setSelectedSortOption("SORT");
    FetchData(URL, dispatch, COMPONENTS.Category);
  }, [category]);

  //Handle selected sort option
  function handleSelect(e) {
    setSelectedSortOption(e.target.value);

    dispatch(sortProducts(e.target.value));
  }

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
        <label htmlFor={subCategory}>{subCategory}</label>
        <br />
      </div>
    );
  });

  //Filters offCanvas functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <main className="products d-flex w-100">
      <section className="left h-50 ms-2">
        <h2 className="mt-2 mb-2">Filters</h2>
        <h4>Product Categories</h4>
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
          </div>
        </div>

        <div className="d-flex gap-1 ms-sm-2 ms-4 mt-2">
          {renderedProducts.length > 0 && (
            <>
              <p className="fw-bolder ">{renderedProducts.length}</p>
              <p className="text-black-50 fw-bold">items</p>
            </>
          )}
        </div>

        <div className="category-products d-flex flex-wrap justify-content-center justify-content-sm-start gap-4 ">
          {renderedProducts.slice(page * 8 - 8, page * 8).map((product) => {
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

export default Products;
