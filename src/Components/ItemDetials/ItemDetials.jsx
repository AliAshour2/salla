import React, { useContext, useEffect, useState } from "react";
import styles from "./ItemDetials.module.css";
import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Item from "./../Item/Item";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "sonner";
import { cartContext } from "../../Context/cartContext";

function ItemDetials() {
  let params = useParams();
  


  let {setCartItems } = useContext(cartContext)

  function getItemDetials(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  let { data,  error   } = useQuery("itemDetials", () =>
    getItemDetials(params.id)
  );
  console.log(data);

  const settings = {
    customPaging: function (i) {
      return (
        <a
          className="mt-5"
          style={{
            width: "250",
            height: "250px",
          }}
        >
          <img
            className="w-100"
            src={data?.data.data.images[i]}
            alt={`Dot ${i}`}
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // Simulate API call delay
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000); // Adjust the delay time as per your requirements
  // }, []);


  // Add To Cart
  let { addToCart } = useContext(cartContext);

  async function addCart(id) {
    

    let addToCardResult = await addToCart(id);

    

    if (addToCardResult.data.status === "success") {
      setCartItems(addToCardResult.data.numOfCartItems);
      toast.success("Product Successfully Added");
     
    } else if (addToCardResult.data.status === "faild") {
      toast.error("Error Adding Product");
    }
  }

   


 


  return (
    <>
      <section className="my-5">
        <div className="container">
          <div className="row">
            <div className="ItemSlider col-md-6">
              <div className="slider-container col-md-6 ms-auto mx-3 mb-5">
                <Slider {...settings}>
                  {data?.data.data.images.map((image, index) => (
                    <div key={index}>
                      <img
                        className={`${styles.maxHeight} w-100 h-25`}
                        src={image}
                        alt={`Slide ${index}`}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>

            <div className={` col-md-6`}>
              {!isLoading && (
                <>
                  <h2 className="fs-6 ">
                    <Link
                      className={` ${styles.mainColor} text-dark text-decoration-none`}
                    >
                      {data?.data.data.category.name}
                    </Link>
                  </h2>

                  <h5>
                    <Link className="text-decoration-none text-dark">
                      {data?.data.data.brand.name}
                    </Link>
                  </h5>
                  
                  <div>
                    <Link className={`text-dark text-decoration-none fs-3`}>
                      {data?.data.data.title}
                    </Link>
                  </div>
                  <p className="">{data?.data.data.description}</p>

                  <div className="d-flex justify-content-between">
                    <div className=" d-flex ">
                      <small>
                        <StarRatings
                          rating={data?.data.data.ratingsAverage}
                          starRatedColor="#ffc107"
                          starDimension="20px"
                          starSpacing="1px"
                          numberOfStars={5}
                          name="rating"
                        />
                      </small>
                      <span className="text-muted small px-2">
                        {data?.data.data.ratingsAverage}
                      </span>
                      <span className=" small px-1">
                        ({data?.data.data.ratingsQuantity} reviews){" "}
                      </span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-3">
                      <div className="text-dark fs-4">
                        {data?.data.data.price} EGY
                      </div>
                    </div>
                  </div>

                  <div className="d-flex mt-3">
                    <Link
                      onClick={() => addCart(data?.data.data.id)}
                      className="btn w-75 bg-main text-white border-0 p-2 rounded-2 me-2"
                    >
                      +Add 
                    </Link>

                    <Link
                      className={`${styles.cartProductActionButton} w-25 `}
                      data-bs-container="body"
                      data-bs-toggle="popover"
                      data-bs-placement="top"
                      data-bs-content="Top popover"
                    >
                      <div className="p-1">
                        <i className="fa-regular fa-heart"></i>
                      </div>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ItemDetials;


