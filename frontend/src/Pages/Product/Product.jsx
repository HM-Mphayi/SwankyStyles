import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toggleCart, addItemToCart } from "../../redux/Reducers/CartSlice";
import { SIZES } from "../../components/Constants/Constants";
import "./Product.scss";
import axios from "axios";

function Product() {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/` + id
      );

      setProduct(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <main className="product d-flex justify-content-between w-100 flex-sm-row flex-column">
      <section className="left mt-5 ms-sm-3">
        <img src={product.image} alt="item" />
      </section>

      <section className="right ">
        <h1 className="mt-5 fw-bolder ">{product.name}</h1>
        <p className="price fs-3 fw-bold">{product.price} ZAR</p>
        <p className="desc">
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="size d-flex gap-2">
          {SIZES.map((sizeName) => {
            return (
              <button
                key={sizeName}
                onClick={() => {
                  setSelectedSize(sizeName);
                }}
                className={sizeName === selectedSize ? "size-selected" : ""}
              >
                {sizeName}
              </button>
            );
          })}
        </div>

        <div className="quantity d-flex align-items-center gap-2 mt-3">
          <button className="border-0 p-2" onClick={decrementQuantity}>
            -
          </button>
          {quantity}
          <button
            className="border-0 p-2  "
            onClick={() => setQuantity(quantity + 1)}
          >
            +{" "}
          </button>
        </div>

        <div className="text-danger fw-bold mt-3">
          {error.length > 0 && <p>{error}</p>}
        </div>

        <button
          className="cart-btn border-0 text-white fw-bold align-items-center px-5 py-2 d-flex gap-3"
          onClick={() => {
            if (selectedSize.length > 0) {
              setError("");
              dispatch(
                addItemToCart({
                  ...product,
                  quantity: quantity,
                  size: selectedSize,
                })
              );
              dispatch(toggleCart());
            } else {
              setError("Please select the size");
            }
          }}
        >
          <FiShoppingCart className="cartIcon" />
          ADD TO CART
        </button>

        <div className="d-flex align-items-center gap-2 mt-3">
          <MdFavoriteBorder className="wishlist-icon" /> ADD TO WISHLIST
        </div>
      </section>
    </main>
  );
}

export default Product;
