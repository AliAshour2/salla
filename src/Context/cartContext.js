import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

export let cartContext = createContext();

let headers = {
  token: localStorage.getItem("userToken"),
};

function addToCart(productId) {
  const promise = axios
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
      return res;
    })
    .catch((error) => error);

  toast.promise(promise, {
    loading: "Adding Cart item",
    success: "Cart Item Added",
    error: "error adding item",
  });
  return promise;
}

function getCart() {
  return axios
    .get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: headers,
    })
    .then((res) => res)
    .catch((error) => error);
}

// function deleteCartItem(productId) {
//   return axios
//     .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
//       headers: headers,
//     })
//     .then((res) => res)
//     .catch((error) => error);
// }

function deleteCartItem(productId) {
  const promise = axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      headers: headers,
    })
    .then((res) => res)
    .catch((error) => error);

  toast.promise(promise, {
    loading: "Delteing Cart Item...",
    success: "Cart Item Deleted",
    error: "Error deleting from cart",
  });

  return promise;
}

function deleteAllCartitems() {
  let promise = axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: headers,
    })
    .then((res) => res)
    .catch((error) => error);

  toast.promise(promise, {
    loading: "Deleting all cart...",
    success: "All Cart Deleted",
    error: "Error deleting all cart",
  });

  return promise;
}

function updateCartProductQuantity(productId, count) {
  const promise = axios
    .put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count: count },
      {
        headers: headers,
      }
    )
    .then((res) => res)
    .catch((error) => error);
  toast.promise(promise, {
    loading: "Updating Cart Item...",
    success: "Item Updated",
    error: "Error Updating Cart Item",
  });
  return promise;
}

export default function CartContextProvider(props) {
  const [cartId, setCartId] = useState(null);
  const [ numCartItems, setCartItems] = useState(null);

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
        deleteAllCartitems,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
