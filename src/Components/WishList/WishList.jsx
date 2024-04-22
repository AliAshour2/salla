import styles from "./WishList.module.css";

import axios from "axios";
import { useQuery } from "react-query";
import Item from "../Item/Item";
import { useContext, useEffect, useState } from "react";
import { wishlistContext } from "../../Context/wishlist";
function WishList() {

  let headers = {
    token: localStorage.getItem("userToken"),
  };

 
  
  
  function getWishList() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist" , {headers:headers});
  }
  let { isLoading , error, data } = useQuery("getWishList", getWishList);

  console.log("data from wishlist" , data);
 
  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="row g-4 row-cols-lg-5 row-cols-2 row-cols-md-3 row-cols-sm-1">
            {data?.data.data.map((item) => (
              <Item
                key={item._id}
                id={item._id}
                imageUrl={
                  "https://ecommerce.routemisr.com/Route-Academy-products/" +
                  item.images[0]
                }
                title={item.title}
                category={item.category.name}
                rating={item.ratingsAverage}
                price={item.price}
                isLoading={isLoading}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default WishList;
