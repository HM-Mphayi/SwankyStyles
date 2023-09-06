import React, { useEffect, useState } from "react";
import { FaCcVisa } from "react-icons/fa";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./FormComponent.scss";

import { useDispatch } from "react-redux";
import { clearCart } from "../../../redux/Reducers/CartSlice";

const API_URL = process.env.REACT_APP_API_URL;
const order = {
  userID: "",
  recipientName: "",
  email: "",
  contactNumber: "",
  deliveryAddress: "",
  items: [],
  total: 0,
};

export default function FormComponent({ total, items }) {
  const [orderDetails, setOrderDetails] = useState(order);
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = document.getElementsByClassName("form");
  const submitButton = document.getElementById("submitOrderBtn");

  function handleInput(e) {
    const { name, value } = e.target;
    setOrderDetails((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit(e) {
    //Disabling the submit order button to prevent placing multiple orders
    submitButton.disabled = true;
    submitButton.style.cursor = "not-allowed";

    if (form[0].checkValidity()) {
      if (
        orderDetails.contactNumber !== "" &&
        orderDetails.deliveryAddress !== "" &&
        orderDetails.email !== "" &&
        orderDetails.items.length > 0 &&
        orderDetails.recipientName !== "" &&
        orderDetails.userID !== ""
      ) {
        e.preventDefault();
        orderDetails.total = total;

        try {
          const response = await axios.post(`${API_URL}/order`, orderDetails);

          if (response.status === 200) {
            dispatch(clearCart());

            toast.success("Order successfully");

            setTimeout(() => {
              navigate("/orders");
            }, 2000);
          }
        } catch (error) {
          toast.error("Something went wrong, please try again later");
          console.log(error);
        }
      } else {
        e.preventDefault();
        toast.error("Missing order details");
      }
    }
  }

  useEffect(() => {
    if (isLoaded) {
      orderDetails.userID = user.id;
    }

    setOrderDetails((prev) => ({
      ...prev,
      items,
    }));
  }, [isLoaded]);

  return (
    <div className="form-component">
      <form className="form">
        <label htmlFor="email"> Email</label>
        <br />
        <input
          type="email"
          id="email"
          name="email"
          required
          value={orderDetails.email}
          onChange={handleInput}
        />

        <br />
        <label htmlFor="recipientName"> Recipient Name</label>
        <br />
        <input
          type="text"
          id="recipientName"
          name="recipientName"
          required
          value={orderDetails.recipientName}
          onChange={handleInput}
        />

        <br />
        <label htmlFor="contact"> Contact number</label>
        <br />
        <input
          type="text"
          id="contact"
          name="contactNumber"
          required
          value={orderDetails.contactNumber}
          onChange={handleInput}
        />

        <br />
        <label htmlFor="address">Delivery Address</label>
        <br />
        <input
          type="text"
          id="address"
          name="deliveryAddress"
          required
          value={orderDetails.deliveryAddress}
          onChange={handleInput}
        />

        <br />
        <label htmlFor="cardName"> Name on card</label>
        <br />
        <input type="text" id="cardName" required />

        <br />
        <label htmlFor="cardNumber"> Card Number</label>
        <br />
        <div>
          <input
            type="text"
            maxLength={16}
            id="cardNumber"
            placeholder="XXXX-XXXX-XXXX-XXXX"
            required
          />
          <FaCcVisa className="visa-icon" />
        </div>

        <label htmlFor="date" className="exp-label">
          Expiration
        </label>
        <br />
        <div className="d-flex gap-2 align-items-center">
          <input
            type="number"
            className="date-input"
            maxLength={2}
            id="date"
            placeholder="mm"
            required
            min={1}
            max={12}
          />
          /
          <input
            type="number"
            className="date-input"
            maxLength={2}
            id="date"
            placeholder="yy"
            required
            min={1}
            max={31}
          />
          <input
            type="number"
            className="date-input"
            maxLength={3}
            id="date"
            placeholder="CVV"
            required
          />
        </div>

        <p className="fw-bold">Total: {total?.toFixed(2)} ZAR</p>

        <button
          className="order-btn mt-1 border-0 text-white "
          id="submitOrderBtn"
          onClick={handleSubmit}
        >
          Place Order
        </button>
        <ToastContainer autoClose={2000} />
      </form>
    </div>
  );
}
