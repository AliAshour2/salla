import React, { useContext } from "react";
import styles from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/cart.png";
import Categories from "./../Categories/Categories";
import { TokenContext } from './../../Context/TokenContext';


function NavBar() {
  let { token  , setToken} = useContext(TokenContext);
  let navigate =useNavigate()
  function logOut()
  {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand fs-3" href="#">
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
            {token ? (
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
            ) : null}

            <ul className="navbar-nav ms-auto">
              <li className="nav-item align-self-center">
                <Link to={"https://www.instagram.com"}>
                  <i className="fa-brands fa-instagram mx-1"></i>
                </Link>
                <Link to={"https://www.facebook.com"}>
                  <i className="fa-brands fa-facebook mx-1"></i>
                </Link>
                <Link to={"https://www.linkedin.com"}>
                  <i class="fa-brands fa-linkedin mx-1"></i>
                </Link>
              </li>

              {token ? (
                <li className="nav-item">
                  <button onClick={logOut} className="nav-link" >
                    LogOut
                  </button>
                </li>
              ) : (
                <>
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
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
