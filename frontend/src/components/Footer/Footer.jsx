import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagramSquare } from "react-icons/fa";
import "./Footer.scss";

function Footer() {
  return (
    <section className="main-footer">
      <div className="wrapper">
        <div className="top d-flex flex-column flex-lg-row">
          <section className=" d-flex gap-0 gap-sm-5 me-0 me-sm-5">
            <div className="me-5 me-sm-5">
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
            <div className="me-0 me-sm-5">
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
          </section>

          <section className="d-flex flex-column flex-md-row gap-5  ms-0 ms-lg-5">
            <div className="about">
              <h3 className="mt-3 mt-lg-0">ABOUT</h3>

              <p>
                Discover the latest fashion trends at Swanky Styles. Shop our
                curated collection of stylish clothing items to elevate your
                wardrobe. Find the perfect look for every occasion and embrace
                your unique style with us today!
              </p>
            </div>
            <div className="contact">
              <h3>CONTACT</h3>
              <ul>
                <li>Address: 123 Main Street, City, State, Zip Code</li>
                <li>Phone: (123) 456-7890</li>
                <li>Email: support@swankystyles.com</li>
              </ul>
            </div>
          </section>
        </div>

        <section className="bottom d-flex flex-column">
          <div className="d-flex gap-4">
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
          <div className="copyright mt-2">
            <span>&copy; 2023 Swanky Styles</span>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Footer;
