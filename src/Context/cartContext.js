import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext();

let headers = {
  token: localStorage.getItem("userToken"),
};

function addToCart(productId) {
  return axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        productId: productId,
      },
      {
        headers: headers,
      }
    )
    .then((res) => {
      // Increment cart item count after adding to cart

      return res;
    })
    .catch((error) => error);
}

function getCart() {
  return axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: headers,
    })
    .then((res) => res)
    .catch((error) => error);
}

function deleteCartItem(productId) {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      headers: headers,
    })
    .then((res) => res)
    .catch((error) => error);
}


function  deleteAllCartitems()
{
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` , {
    headers : headers ,
  }).then((res)=> res).catch((error)=> error);
}

function updateCartProductQuantity(productId, count) {
  return axios
    .put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count: count },
      {
        headers: headers,
      }
    )
    .then((res) => res)
    .catch((error) => error);
}

export default function CartContextProvider(props) {
  const [cartId, setCartId] = useState(null);
  const [numCartItems, setCartItems] = useState(null);

  async function getInitialCart() {
    let { data } = await getCart();
    setCartItems(data?.numOfCartItems);
    setCartId(data?.data._id);
  }

  async function updateCartItems() {
    let { data } = await getCart();
    setCartItems(data?.numOfCartItems);
  }


  function cartOnlinePayment(shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        { shippingAddress },
        {
          headers: headers,
        }
      )
      .then((res) => res)
      .catch((error) => error);
  }

  useEffect(() => {
    getInitialCart();
  }, []);

  return (
    <cartContext.Provider
      value={{
        addToCart,
        getCart,
        deleteCartItem,
        updateCartProductQuantity,
        cartOnlinePayment,
        numCartItems,
        setCartItems,
        updateCartItems,
        deleteAllCartitems
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
