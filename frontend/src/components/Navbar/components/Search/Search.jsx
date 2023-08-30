import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import { clearState } from "../../../../redux/Reducers/ProductSlice";
import { COMPONENTS } from "../../../Constants/Constants";
import FetchData from "../../../../utils/FetchData";
import useDebounce from "./useDebounce";
import { Offcanvas, Form, FormControl } from "react-bootstrap";
import "./Search.scss";

const API_URL = process.env.REACT_APP_API_URL;

export default function Search() {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const debouncedText = useDebounce(searchInput);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (debouncedText.trim().length > 0) {
      const URL = `${API_URL}/product/search/?q=${debouncedText}`;

      dispatch(clearState());

      FetchData(URL, dispatch, COMPONENTS.Sub_Category);
      navigate(`/search/${debouncedText}`);
    }
  }, [debouncedText]);

  return (
    <div className="search-component align-items-center justify-content-center gap-1  ">
      <div className="search-icon " onClick={handleShow}>
        <MdSearch />
      </div>

      <input
        type="text"
        className="custom-input"
        value={searchInput}
        placeholder="Search"
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Search</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <input
            id="offcanvas-input"
            type="text"
            className="w-100 p-2 rounded-4 "
            value={searchInput}
            placeholder="Search"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
