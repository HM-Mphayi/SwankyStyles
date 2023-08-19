import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Woman from "../../images/Home.png";
import Card from "../../components/Card/Card";
import Container from "react-bootstrap/Container";
import axios from "axios";
import "./Home.scss";

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const FetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/home`
      );
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    FetchProducts();
  }, []);

  return (
    <main className="home">
      <section className="hero position-relative">
        <img src={Woman} className="hero-img" alt="hero" />

        <button
          onClick={() => navigate("/products/category/Ladies")}
          className="position-absolute"
        >
          SHOP NOW
        </button>
      </section>

      <section className="featured-products pt-5">
        <Container>
          <span className="fw-bold">FEATURED PRODUCTS</span>
          <div className="items mt-3 d-flex flex-wrap justify-content-around">
            {products.map((product) => {
              return <Card product={product} key={product._id} />;
            })}
          </div>
        </Container>
      </section>

      <hr />
      <h3 className="position-absolute divider">BROWSE CATEGORIES</h3>

      <section className="categories d-flex flex-wrap justify-content-around mt-5">
        <div
          className="category"
          onClick={() => navigate("products/subcategory/Dress")}
        >
          <img
            src="https://res.cloudinary.com/dwtvyau3c/image/upload/v1688399338/Swanky%20Styles/steptodown.com508369_anw8j0.jpg"
            alt="dress"
          />
          <h4>SHOP DRESSES</h4>
        </div>
        <div
          className="category"
          onClick={() => navigate("products/subcategory/Pants")}
        >
          <img
            src="https://res.cloudinary.com/dwtvyau3c/image/upload/v1688399338/Swanky%20Styles/steptodown.com262307_ilyidu.jpg"
            alt="pants"
          />
          <h4>SHOP PANTS</h4>
        </div>
        <div
          className="category"
          onClick={() => navigate("products/subcategory/Top")}
        >
          <img
            src="https://res.cloudinary.com/dwtvyau3c/image/upload/v1688399338/Swanky%20Styles/steptodown.com336758_hkk2x6.jpg"
            alt="tops"
          />
          <h4>SHOP TOPS</h4>
        </div>
        <div
          className="category"
          onClick={() => navigate("products/subcategory/Jacket")}
        >
          <img
            src="https://res.cloudinary.com/dwtvyau3c/image/upload/v1688399339/Swanky%20Styles/steptodown.com442016_fsq8jg.jpg"
            alt="Jacket"
          />
          <h4>SHOP JACKETS</h4>
        </div>
      </section>
    </main>
  );
}
