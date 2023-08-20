import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { MdOutlinePending, MdLocationOn } from "react-icons/md";
import { useAuth } from "@clerk/clerk-react";
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
        const res = await axios.get(`${API_URL}/order/${user.id}`);
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getOrders();
  }, [isLoaded, isSignedIn]);

  return (
    <main className="orders">
      <section>
        <h3 className="mt-2 text-secondary">Orders</h3>
        {isSignedIn &&
          orders.map((order, index) => {
            console.log(order);
            return (
              <div
                className="single-order flex-column d-sm-flex flex-sm-row mb-3 p-4 gap-0 gap-sm-5 justify-content-between"
                key={index}
              >
                <div className="left d-flex gap-3 gap-sm-5">
                  <img src={order?.items[0]?.image} alt="orderImage" />

                  <div className="mt-2">
                    <p>Recipient: {order.recipientName}</p>
                    <p className="align-items-center d-flex gap-1">
                      Status:
                      <MdOutlinePending />
                      {order.status}
                    </p>
                    <p>
                      Delivery Address: <MdLocationOn /> {order.deliveryAddress}
                    </p>
                  </div>
                </div>

                <div className="right mt-2">
                  <p>Order date: {order.createdAt.split("T")[0]}</p>
                  <p>Total: R {order.total}</p>
                </div>
              </div>
            );
          })}
      </section>
    </main>
  );
}
