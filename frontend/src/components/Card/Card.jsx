import React from "react";
import { useNavigate } from "react-router-dom";
import { MdFavoriteBorder } from "react-icons/md";
import "./Card.scss";

export default function Card({ product }) {
  const navigate = useNavigate();

  return (
    <>
      <section className="custom-card mb-3 position-relative" key={product.id}>
        <div
          className="img object-fit-fill"
          onClick={() => navigate(`/product/${product._id}`)}
        >
          <img src={`${product.image}?tr=w-300`} alt={product.name} />
        </div>

        <div
          className="card-details p-2"
          onClick={() => navigate(`/product/${product._id}`)}
        >
          <p className="title">{product.name}</p>
          <p className="text-black-50 ">{product.price} ZAR</p>
        </div>
      </section>
    </>
  );
}
