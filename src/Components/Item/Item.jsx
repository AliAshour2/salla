import React, { useContext, useEffect, useState } from "react";
import styles from "./Item.module.css";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { cartContext } from "../../Context/cartContext";
import { toast } from "sonner";

function Item({ id, imageUrl, title, category, rating, price }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Adjust the delay time as per your requirements
  }, []);

  let { addToCart, setCartItems } = useContext(cartContext);

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
    <div className="col">
      <div className={`cart rounded-1 ${styles.cardProduct}`}>
        <div className="cart-body p-3">
          {/* Is LOADING */}

          {isLoading && (
            <>
              <div
                className="placeholder-glow placeholder-glow w-100 mb-2"
                style={{
                  height: "200px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "10px",
                }}
              ></div>
              {/* fisrt row */}
              <div
                className="placeholder-glow w-100 mb-2"
                style={{
                  height: "20px",

                  borderRadius: "5px",
                }}
              >
                <span
                  className="placeholder w-100"
                  style={{ height: "20px", borderRadius: "8px" }}
                ></span>
              </div>
              {/* Sec row */}
              <div
                className="placeholder-glow w-100 mb-2"
                style={{
                  height: "20px",

                  borderRadius: "5px",
                }}
              >
                <span
                  className="placeholder w-100"
                  style={{ height: "20px", borderRadius: "8px" }}
                ></span>
              </div>
              
              {/* third row */}
              <div className="d-flex justify-content-between placeholder-glow">
                <span
                  className="placeholder col-4"
                  style={{ height: "25px", borderRadius: "8px" }}
                ></span>

                <button
                  className="btn btn-success placeholder  disabled col-4"
                  aria-disabled="true"
                ></button>
              </div>
            </>
          )}

          {/* IS LOADING */}

          {!isLoading && (
            <>
              <div className="text-center position-relative">
                <Link to={`/details/${id}`}>
                  <img
                    className="w-100 h-25"
                    src={imageUrl}
                    alt="product img"
                  />
                </Link>
                <div className={`${styles.cartProductAction}`}>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Quick View</Tooltip>}
                  >
                    <Link
                      to={`/details/${id}`}
                      className={`${styles.cartProductActionButton}`}
                      data-bs-container="body"
                      data-bs-toggle="popover"
                      data-bs-placement="top"
                      data-bs-content="Top popover"
                    >
                      <div className="p-1">
                        <i className="fa-regular fa-eye"></i>
                      </div>
                    </Link>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Add To Wich List</Tooltip>}
                  >
                    <Link
                      className={`${styles.cartProductActionButton}`}
                      data-bs-container="body"
                      data-bs-toggle="popover"
                      data-bs-placement="top"
                      data-bs-content="Top popover"
                    >
                      <div className="p-1">
                        <i className="fa-regular fa-heart"></i>
                      </div>
                    </Link>
                  </OverlayTrigger>
                </div>
              </div>
              <div
                className="text-sm-start mb-1 mt-1"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={title}
              >
                <Link className="text-muted text-decoration-none h6">
                  {title.split(" ").splice(0, 2).join(" ")}
                </Link>
              </div>
              <h2 className="fs-6 ">
                <Link className="text-dark text-decoration-none">
                  {category}
                </Link>
              </h2>

              <div className="text-warning ">
                <small>
                  <StarRatings
                    rating={rating}
                    starRatedColor="#ffc107"
                    starDimension="20px"
                    starSpacing="1px"
                    numberOfStars={5}
                    name="rating"
                  />
                </small>
                <span className="text-muted small px-2">{rating}</span>
              </div>

              <div className="d-flex align-items-center justify-content-between mt-3">
                <div className="text-dark">{price} EGY</div>
                {/* You can add a Link here to send the user to another page with the item id */}
                <Link
                  onClick={() => addCart(id)}
                  className="btn btn-sm bg-main text-white border-0 p-2 rounded-2"
                >
                  +Add
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Item;
