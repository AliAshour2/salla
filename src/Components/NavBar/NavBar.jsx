import React from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import logo from "../assets/images/cart.png";
import Categories from "./../Categories/Categories";
function NavBar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" href="#">
            <img className="w-25" src={logo} alt="" /> Salla
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={"home"}
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={"cart"}
                >
                  Cart
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={"products"}
                >
                  products
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={"Brands"}
                >
                  Brands
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={"categories"}
                >
                  Categories
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto">
              <li className="nav-item align-self-center">
                <i className="fa-brands fa-instagram mx-1"></i>
                <i className="fa-brands fa-facebook mx-1"></i>
                <i class="fa-brands fa-linkedin mx-1"></i>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={"register"}>
                  Rigester
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={"login"}>
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={"logout"}>
                  LogOut
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
