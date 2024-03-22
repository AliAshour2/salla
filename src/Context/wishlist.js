import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { createRoutesFromChildren } from "react-router-dom";
import { toast } from "sonner";

export let wishlistContext = createContext();

let headers = {
  token: localStorage.getItem("userToken"),
};


function addToWishList(productId) {
  const promise = axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        productId: productId,
      },
      {
        headers: headers,
      }
    )
    .then((res) => {
      return res;
    })
    .catch((error) => error);
  toast.promise(promise, {
    loading: "Adding WishList item",
    success: "WishList Item Added",
    error: "error adding item",
  });
  return promise;
}

function getWishList() {
  return axios
    .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: headers,
    })
    .then((res) => res)
    .catch((error) => error);
}





function removeItemFromWishlist(productId) {
  const promise = axios
    .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
      headers: headers,
    })
    .then((res) => res)
    .catch((error) => error);
  toast.promise(promise, {
    loading: "deleting Product from wishlist",
    error: "there is error removing product from wishlist",
    success: "Product deleted from wishlist",
  });
}

export default function WishlistContextProvider(props) {
  const [wishList, setWishList] = useState([]);
  const [wishlistItemsCount , setwishlistItemsCount] = useState(null)

 


  async function getInitialWishlist() {
    try {
      const response = await getWishList();
      setwishlistItemsCount(response.data?.count); // Set wishList to the array of wishlist items
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }

  async function updateWishlistCount()
  {
    let {data} = await getWishList();
    setwishlistItemsCount(data.count);
  }
  

  useEffect(()=>{
    getInitialWishlist();
  } , [])

  return (
    <wishlistContext.Provider
      value={{
        wishList,
        setWishList,
        addToWishList,
        getWishList,
        removeItemFromWishlist,
        wishlistItemsCount , 
        setwishlistItemsCount,
        updateWishlistCount,
      }}
    >
      {props.children}
    </wishlistContext.Provider>
  );
}
