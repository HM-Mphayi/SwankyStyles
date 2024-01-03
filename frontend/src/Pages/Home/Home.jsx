import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../../components/Constants/Constants";
import Woman from "../../images/Home.jpg";
import Card from "../../components/Card/Card";
import Container from "react-bootstrap/Container";
import axios from "axios";
import CardSkeleton from "../../components/Card/CardSkeleton/CardSkeleton";
import "./Home.scss";

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function FetchProducts() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/home`
      );
      setProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

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
          <div className="items mt-3 d-flex flex-wrap justify-content-around gap-0 gap-3">
            {isLoading ? (
              <CardSkeleton />
            ) : (
              products.map((product) => {
                return <Card product={product} key={product._id} />;
              })
            )}
          </div>
        </Container>
      </section>

      <hr />
      <h3 className="position-absolute divider">BROWSE CATEGORIES</h3>

      <section className="categories d-flex flex-wrap justify-content-around mt-5">
        {CATEGORIES.map((category) => {
          return (
            <div className="category" onClick={() => navigate(category.PATH)} key={category.name}>
              <img src={category.Img_Src} alt={category.name} />
              <h4>SHOP {category.name}</h4>
            </div>
          );
        })}
      </section>
    </main>
  );
}
