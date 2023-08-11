import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagramSquare } from "react-icons/fa";
import "./Footer.scss";

function Footer() {
  return (
    <section className="main-footer">
      <div className="wrapper">
        <div className="top">
          <div className="col">
            <h3>CATEGORIES</h3>
            <div>
              <Link className="custom-link" to={"products/category/Men"}>
                MEN
              </Link>
            </div>
            <div>
              <Link className="custom-link" to={"products/category/Kids"}>
                KIDS
              </Link>
            </div>
            <div>
              <Link className="custom-link" to={"products/category/Ladies"}>
                WOMEN
              </Link>
            </div>
          </div>
          <div className="col">
            <h3>LINKS</h3>
            <div>
              <Link className="custom-link">FAQ</Link>
            </div>
            <div>
              <Link className="custom-link">PAGES</Link>
            </div>
            <div>
              <Link className="custom-link">STORES</Link>
            </div>
          </div>

          <div className="col" id="about">
            <h3>ABOUT</h3>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="col">
            <h3>CONTACT</h3>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        <div className="bottom">
          <div>
            <FaFacebookF />
          </div>
          <div>
            <FaInstagramSquare />
          </div>
          <div>
            <FaTwitter />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
