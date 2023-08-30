import React from "react";
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "../../redux/Reducers/CartSlice";
import {
  decrementItemQuantity,
  incrementItemQuantity,
  deleteItemFromCart,
} from "../../redux/Reducers/CartSlice";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./Cart.scss";

import { useAuth } from "@clerk/clerk-react";

import { useNavigate, useLocation } from "react-router-dom";

export default function Cart({ open }) {
  const cartItems = useSelector((store) => store.cart.cartItems);
  const show = useSelector((store) => store.cart.isOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn } = useAuth();
  let total = 0;

  //Incrementing item quantity
  const Increment = (_id, size) => {
    dispatch(incrementItemQuantity({ _id, size }));
  };

  //Decrementing item quantity
  const Decrement = (_id, size) => {
    dispatch(decrementItemQuantity({ _id, size }));
  };

  //Deleting item from the cart
  const Delete = (_id, size) => {
    dispatch(deleteItemFromCart({ _id, size }));
  };

  return (
    <>
      <Offcanvas
        show={show}
        onHide={() => dispatch(toggleCart())}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-black-50">
            Products in your cart
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <section className="custom-cart">
            <div className="cart-items">
              {cartItems.map((cartItem, index) => {
                return (
                  //Calculating the total price of all products in the cart
                  (total += cartItem.price * cartItem.quantity),
                  (
                    <div className="item d-flex" key={index}>
                      <div className="left">
                        <img src={cartItem.image} alt="" />
                      </div>

                      <div className="middle">
                        <h5 className="title text-black-50">
                          {cartItem.name.slice(0, 14)}
                          {cartItem.name.length > 20 && "..."}
                        </h5>
                        <div className="cart-quantity d-flex align-items-center gap-3">
                          <button
                            onClick={() =>
                              Decrement(cartItem._id, cartItem.size)
                            }
                          >
                            -
                          </button>
                          {cartItem.quantity}
                          <button
                            onClick={() =>
                              Increment(cartItem._id, cartItem.size)
                            }
                          >
                            +
                          </button>
                        </div>
                        <p>SIZE: {cartItem.size}</p>
                        <p>{cartItem.price} ZAR</p>
                      </div>

                      <div className="right d-flex justify-content-center">
                        <MdDelete
                          className="delete-icon mt-3"
                          onClick={() => Delete(cartItem._id, cartItem.size)}
                        />
                      </div>
                    </div>
                  )
                );
              })}
            </div>
            {cartItems.length > 0 ? (
              <>
                <div className="subtotal d-flex justify-content-between mt-3 fw-bold">
                  <div>
                    <span>SUBTOTAL</span>
                  </div>
                  <p>{total.toFixed(2)} ZAR</p>
                </div>

                {isSignedIn && (
                  <button
                    className="checkout-btn border-0 text-white"
                    onClick={() => {
                      dispatch(toggleCart());
                      navigate("/checkout", {
                        state: {
                          prevPath: location.pathname,
                          items: cartItems,
                          total,
                        },
                      });
                    }}
                  >
                    CHECKOUT
                  </button>
                )}
              </>
            ) : (
              <div>
                <h3 className="cart-empty">Cart is empty</h3>
              </div>
            )}
          </section>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
