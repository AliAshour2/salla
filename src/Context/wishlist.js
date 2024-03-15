import axios from "axios";
import { createContext } from "react";

export let wishlistContext = createContext();

let headers = {
  token: localStorage.getItem("userToken"),
};

// ADD TO WISHLIST
function addToWishList(productId) {
  return axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId: productId },
      { headers: headers }
    )
    .then((res) => res)
    .catch((error) => error);
}

function getWishList() {
  return axios
    .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: headers,
    })
    .then((res) => res)
    .catch((error) => error);
}

function deleteProductFromWishlist(productId) {
  return axios
    .delete(
      `https://ecommerce.routemisr.com/api/v1/${productId}`,
      { productId: productId },
      { headers: headers }
    )
    .then((res) => res)
    .catch((error) => error);
}

export default function WishlishContextProvider(props) {
  return (
    <wishlistContext.Provider
      value={{ addToWishList, deleteProductFromWishlist, getWishList }}
    >
      {props.children}
    </wishlistContext.Provider>
  );
}
