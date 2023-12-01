import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { BsCheckAll } from "react-icons/bs";
import { BsAirplane } from "react-icons/bs";
import { RxDividerVertical } from "react-icons/rx";
import { useAuth } from "@clerk/clerk-react";
import { Divider } from "@mui/material";
import { ORDER_STATUS } from "../../components/Constants/Constants";
import axios from "axios";
import "./Orders.scss";

const API_URL = process.env.REACT_APP_API_URL;

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const { user, isLoaded } = useUser();
  const { isSignedIn } = useAuth();

  const getOrders = async () => {
    if (isLoaded) {
      try {
        const res = await axios.get(`${API_URL}/order/user/${user.id}`);

        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  function getDeliveryDate(orderDate) {
    const orderDate_ = new Date(orderDate);
    const deliveryDate = new Date(orderDate_);

    deliveryDate.setDate(orderDate_.getDate() + 5);

    return `${deliveryDate.getDate()} ${deliveryDate.toLocaleString("default", {
      month: "long",
    })} ${deliveryDate.getFullYear()}`;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getOrders();
  }, [isLoaded, isSignedIn]);

  return (
    <main className="orders">
      <section>
        <h3 className="mt-2 mb-2 text-secondary">Orders</h3>
        {isSignedIn &&
          orders.map((order, index) => {
            return (
              <div key={index} className="mb-3 single-order">
                <h6 className="fw-bold ">
                  Order ID: {order._id.slice(0, 10)}...
                </h6>
                <div className="d-flex flex-column flex-sm-row gap">
                  <p>
                    <span className="text-black-50">Order date:</span>
                    {" " +
                      new Date(order.createdAt.split("T")[0]).toDateString()}
                  </p>

                  <RxDividerVertical
                    className="d-none d-sm-flex"
                    style={{ height: "25px", color: "grey" }}
                  />

                  {order.status === ORDER_STATUS.Delivered ? (
                    <div className="d-flex gap-1">
                      <p>Delivered</p> <BsCheckAll />
                    </div>
                  ) : (
                    <p className="fw-bold" style={{ color: "green" }}>
                      <BsAirplane /> Estimated delivery :
                      {" " + getDeliveryDate(order.createdAt.split("T")[0])}
                    </p>
                  )}
                </div>

                <Divider />
                <div className="items">
                  {order.items.map((item, index) => {
                    return (
                      <div key={index} className="mt-3 mb-3 d-flex gap-3">
                        <img src={item.image} alt="order item" width={60} />
                        <div>
                          <p>{item.name}</p>
                          <p>QTY: {item.quantity}</p>
                          <p>{item.price} ZAR</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Divider />
                <h6 className="mt-2">
                  <span>Address:</span> {order.deliveryAddress}
                </h6>
                <h6 className="mt-2">
                  <span>Total:</span> {order.total.toFixed(2)} ZAR
                </h6>
              </div>
            );
          })}
      </section>
    </main>
  );
}
