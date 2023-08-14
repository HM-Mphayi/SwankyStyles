import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import { useSelector } from "react-redux";

export default function CustomPagination({ setPage }) {
  const { renderedProducts } = useSelector((store) => store.products);
  const [active, setActive] = useState(1);

  const handleSelectedPage = (selectedPage) => {
    setPage(selectedPage);
    setActive(selectedPage);
  };

  let pageNumbers = [...Array(Math.ceil(renderedProducts.length / 8))].map(
    (_, i) => {
      return (
        <Pagination.Item
          onClick={() => handleSelectedPage(i + 1)}
          key={i}
          active={i + 1 === active}
        >
          {i + 1}
        </Pagination.Item>
      );
    }
  );

  useEffect(() => {
    handleSelectedPage(1);
  }, [renderedProducts.length]);

  return (
    <div>
      <div className="">
        {renderedProducts.length > 8 && <Pagination>{pageNumbers}</Pagination>}
      </div>
    </div>
  );
}
