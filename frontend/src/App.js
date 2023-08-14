import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initCartItems } from "./redux/Reducers/CartSlice";
import { useDispatch, useSelector } from "react-redux";

import {
  Home,
  Products,
  Product,
  Signin,
  Signup,
  MasterPage,
  SubCategory,
  Profile,
  Checkout,
  Orders,
} from "./Pages";
import "./index.css";

function App() {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.cartItems);

  useEffect(() => {
    const storedCart = window.localStorage.getItem("cart");
    if (storedCart !== null) {
      dispatch(initCartItems(JSON.parse(storedCart)));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MasterPage />}>
            <Route path="/" element={<Home />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="products/category/:category" element={<Products />} />
            <Route
              path="products/subcategory/:subCategory"
              element={<SubCategory />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
