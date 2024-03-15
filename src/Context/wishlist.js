import axios from "axios";

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
