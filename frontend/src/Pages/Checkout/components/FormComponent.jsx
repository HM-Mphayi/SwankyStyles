import React, { useEffect, useState } from "react";
import { FaCcVisa } from "react-icons/fa";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./FormComponent.scss";

const API_URL = process.env.REACT_APP_API_URL;

export default function FormComponent({ total, items }) {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const [orderDetails, setOrderDetails] = useState({
    userID: "",
    recipientName: "",
    email: "",
    contactNumber: "",
    deliveryAddress: "",
    items: [],
    total: 0,
  });

  useEffect(() => {
    if (isLoaded) {
      orderDetails.userID = user.id;
    }

    if (orderDetails.items.length === 0 && items) {
      orderDetails.items = items;
    }
  }, [isLoaded]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    const {
      contactNumber,
      deliveryAddress,
      email,
      items,
      recipientName,
      userID,
    } = orderDetails;

    const form = document.getElementsByClassName("form");
    const submitButton = document.getElementById("submitOrderBtn");

    if (form[0].checkValidity()) {
      if (
        contactNumber !== "" &&
        deliveryAddress !== "" &&
        email !== "" &&
        items.length > 0 &&
        recipientName !== "" &&
        userID !== ""
      ) {
        e.preventDefault();

        //Placing the order
        try {
          //calculate total
          if (total < 1000) {
            orderDetails.total = total + 50;
          } else {
            orderDetails.total = total;
          }

          const res = await axios.post(`${API_URL}/order`, orderDetails);
          console.log(res);
          if (res.status === 200) {
            submitButton.disabled = true;
            submitButton.style.cursor = "not-allowed";

            toast.success("Order successfully");
            setTimeout(() => {
              navigate("/orders");
            }, 5000);
          }
        } catch (error) {
          toast.error("Something went wrong, please try again later");
          console.log(error);
        }
      }
    }
  };

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
          {" "}
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

        <p className="fw-bold mt-2">Subtotal: {total} ZAR</p>
        <p className="fw-bold">Delivery: 50 ZAR</p>
        <p className="fw-bold">Total: {total + 50} ZAR</p>

        <button
          className="order-btn mt-1 border-0 text-white "
          id="submitOrderBtn"
          onClick={handleSubmit}
        >
          Place Order
        </button>
        <ToastContainer autoClose={5000} />
      </form>
    </div>
  );
}
