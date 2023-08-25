import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../redux/Reducers/CartSlice";
import { useAuth, ClerkLoaded, ClerkLoading } from "@clerk/clerk-react";

import logo from "../../images/logo.PNG";
import Cart from "../Cart/Cart.jsx";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import DropdownComponent from "./components/Dropdown/DropdownComponent";
import "./Navbar.scss";
import Search from "./components/Search/Search";

function NavbarComponent() {
  const cartItems = useSelector((store) => store.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  return (
    <>
      <Navbar className="mb-3 pt-0 fixed-top flex-column">
        <Container fluid className="top-nav">
          <Search />

          <section className="middle">
            <Navbar.Brand href="#home">
              <img
                src={logo}
                className="d-inline-block align-top logo"
                alt="React Bootstrap logo"
                onClick={() => navigate("/")}
              />
            </Navbar.Brand>
          </section>

          <section className="right">
            <ClerkLoading>
              <BeatLoader />
            </ClerkLoading>

            <ClerkLoaded>
              {isSignedIn ? (
                <div className="icons d-flex gap-2 align-items-center justify-content-center">
                  {/* Dropdown menu */}
                  <DropdownComponent />

                  <div
                    className="cart-icon d-flex align-items-center justify-content-center"
                    onClick={() => dispatch(toggleCart())}
                  >
                    <FiShoppingCart />{" "}
                    {cartItems.length > 0 && (
                      <Badge bg="primary">{cartItems.length}</Badge>
                    )}
                  </div>
                </div>
              ) : (
                <Link className="custom-link " id="sign-out" to={"/signin"}>
                  Login
                </Link>
              )}
            </ClerkLoaded>
          </section>
        </Container>

        {/* Navbar Links */}

        <Container fluid id="navbar-links">
          <Nav className="align-items-center justify-content-center ">
            <NavLink className="custom-link" to={"/"}>
              HOME
            </NavLink>

            <NavLink className="custom-link" to={"products/category/Ladies"}>
              LADIES
            </NavLink>

            <NavLink className="custom-link" to={"products/category/Kids"}>
              KIDS
            </NavLink>

            <NavLink className="custom-link" to={"products/category/Men"}>
              MEN
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
      {/* Cart component */}
      <Cart />
    </>
  );
}

export default NavbarComponent;
