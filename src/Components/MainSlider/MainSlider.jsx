import React from "react";
import styles from "./MainSlider.module.css";
import Slider from "react-slick";
import ms1 from "../assets/images/ms1.jpg";
import ms2 from "../assets/images/ms2.jpg";

function MainSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,

    appendDots: (dots) => (
      <div
        style={{
          bottom: "5px",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
  };

  return (
    <>
      <div className={`slider-container overflow-hidden py-5 ${styles.imgBox}`}>
        <Slider {...settings}>
          <div>
            <div
              className={` ${styles.imgBox} `}
              style={{
                backgroundImage: `url(${ms1})`,
                backgroundRepeat: `no-repeat`,
                width: `100%`,
                backgroundSize: `cover`,
                overflow: `hidden`,
                borderRadius: `0.5rem`,
              }}
            >
              <div className="ps-lg-12 py-lg-16 col-xxl-5 col-md-7 py-5 px-5 text-xs-center">
                <span className="badge text-bg-warning">
                  Opening Sale Discount 50%
                </span>

                <h2 className="text-dark display-5 fw-bold mt-4">
                  SuperMarket For Fresh Grocery
                </h2>
                <p className="lead">
                  Introduced a new model for online grocery shopping and
                  convenient home delivery.
                </p>
                <a href="#!" className="btn btn-dark mt-3" tabIndex="-1">
                  Shop Now
                  <i className="feather-icon icon-arrow-right ms-1"></i>
                </a>
              </div>
            </div>
          </div>

          <div>
            <div
              className={` ${styles.imgBox} `}
              style={{
                backgroundImage: `url(${ms2})`,
                backgroundRepeat: `no-repeat`,
                width: `100%`,
                backgroundSize: `cover`,
                overflow: `hidden`,
                borderRadius: `0.5rem`,
              }}
            >
              <div className="ps-lg-12 py-lg-16 col-xxl-5 col-md-7 py-5 px-5 text-xs-center">
                <span className="badge text-bg-warning">
                  Opening Sale Discount 50%
                </span>

                <h2 className="text-dark display-5 fw-bold mt-4">
                  SuperMarket For Fresh Grocery
                </h2>
                <p className="lead">
                  Introduced a new model for online grocery shopping and
                  convenient home delivery.
                </p>
                <a href="#!" className="btn btn-dark mt-3" tabIndex="-1">
                  Shop Now
                  <i className="feather-icon icon-arrow-right ms-1"></i>
                </a>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </>
  );
}

export default MainSlider;
