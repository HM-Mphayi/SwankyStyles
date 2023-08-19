import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../images/logo.PNG";
import FormComponent from "./components/FormComponent";
import "./Checkout.scss";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <nav className="checkout-nav bg-white fixed-top d-flex align-items-center ">
        <div
          className="col-4 col-sm-5"
          onClick={() => navigate(state.prevPath)}
        >
          <BiArrowBack className="icon-back p-2" />
        </div>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <hr />
      </nav>

      <main className="checkout d-flex flex-column-reverse flex-sm-row ">
        <section className="left ">
          <h3 className="">Payment details</h3>
          <FormComponent total={state?.total} items={state?.items} />
        </section>

        <section className="right ">
          <h3>Order Summary</h3>

          <div className="items overflow-auto">
            {state.items?.map((item, index) => {
              return (
                <div key={index} className="mt-2 d-flex gap-1">
                  <div className="image">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="details">
                    <p>{item.name}</p>
                    <p>QTY: {item.quantity}</p>
                    <p>{item.price} ZAR</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
