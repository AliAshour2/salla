import React, { useContext, useEffect, useState } from "react";
import styles from "./Item.module.css";
import { Link, useLocation } from "react-router-dom";
import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { cartContext } from "../../Context/cartContext";
import { toast } from "sonner";
import ItemPlaceholder from "./ItemPlaceholder";
import { wishlistContext } from "../../Context/wishlist";
import { TokenContext } from "./../../Context/TokenContext";

function Item({ id, imageUrl, title, category, rating, price }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Adjust the delay time as per your requirements
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                               Cart FUNCTIONS                               */
  /* -------------------------------------------------------------------------- */
  let { addToCart, setCartItems } = useContext(cartContext);

  async function addCart(id) {
    let addToCardResult = await addToCart(id);

    if (addToCardResult.data.status === "success") {
      setCartItems(addToCardResult.data.numOfCartItems);
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                            END OF CART FUNCTIONS                           */
  /* -------------------------------------------------------------------------- */

  




  /* -------------------------------------------------------------------------- */
  /*                             WISH LIST FUNCTIONS                            */
  /* -------------------------------------------------------------------------- */

  let { wishList ,addToWishList, getWishList, removeItemFromWishlist  , updateWishlistCount , setwishlistItemsCount} =
    useContext(wishlistContext);

    const [addedToWishList, setAddedToWishList] = useState(false);

 

    useEffect(() => {
      if (wishList) {
        const isInWishlist = wishList.find((prod) => prod._id === id);
        setAddedToWishList(isInWishlist !== undefined);
      }
    }, [id, wishList]);

    
    async function handleAddToWishlist(id) {
      try {
        let addToWishListResult = await addToWishList(id);
        console.log("from add to wishlist"  , addToWishListResult);
        if (addToWishListResult.data.status === "success") {
          setAddedToWishList(true);
          setwishlistItemsCount(addToWishListResult.data.count);
          updateWishlistCount();
          getWishList();
        }
      } catch (error) {
        console.error("Error occurred while adding to wishlist:", error);
      }
    }
    

    async function handleRemoveFromWishlist(id)
    {
      try{
        let removeFromWishlistReq = await removeItemFromWishlist(id);
       
          setAddedToWishList(false);
          setwishlistItemsCount(removeFromWishlistReq.data.count);
          updateWishlistCount();
          getWishList();
        
      }catch(error)
      {
        console.error("Error occurred while remove to wishlist:", error);
      }
      
    }
    

   
    
    
  
  /* -------------------------------------------------------------------------- */
  /*                           END WISHLIST FUNCTIONS                           */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="col">
      <div className={`cart rounded-1 ${styles.cardProduct}`}>
        <div className="cart-body p-3">
          {/* Is LOADING */}

          {isLoading && (
            <>
              <ItemPlaceholder />
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
                  <OverlayTrigger placement="top" overlay={<Tooltip>{addedToWishList ? "Remove from Wishlist" : "Add to Wishlist"}</Tooltip>}>
                    <div onClick={() => addedToWishList ? handleRemoveFromWishlist(id) : handleAddToWishlist(id)} className={`${styles.cartProductActionButton}`}>
                      <div className="p-1">
                       
                        <i className={`fa-solid fa-heart ${addedToWishList ? styles.addedToWishlist : ""}`}></i>
                      </div>
                    </div>
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
