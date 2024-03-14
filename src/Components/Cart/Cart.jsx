import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { cartContext } from "../../Context/cartContext";
import ItemDetials from "./../ItemDetials/ItemDetials";
import { useQuery } from "react-query";
import { toast } from "sonner";
import { Link } from "react-router-dom";

function Cart() {
  let { getCart, deleteCartItem, updateCartProductQuantity , updateCartItems , deleteAllCartitems } =
    useContext(cartContext);
  const [cartDetails, setCartDetials] = useState({});
  const [isLoading, setIsLaoding] = useState(false);
  const [numCartItems, setCartItems] = useState(null);

  async function getCartDetials() {
    let { data } = await getCart();
    setCartItems(data?.numOfCartItems);
    console.log("from card detalis",data);
    setCartDetials(data);
  }

  async function removeItem(productId) {
    try {
      setIsLaoding(true);
      toast.loading("Removing Cart item");
      let { data } = await deleteCartItem(productId);
      setCartItems(data.numOfCartItems);
      setCartDetials(data);
      updateCartItems();
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("Sorry , There is error in removing this item");
    } finally {
      setIsLaoding(false);
      toast.dismiss();
      toast.success("Removed from the Cart");
    }
  }

  async function deleteAllCart()
  {
    try {
      setIsLaoding(true);
      toast.loading("Delete All Cart Items");
      let {data} = await deleteAllCartitems();
      setCartItems(data.numOfCartItems);
      setCartDetials(data);
      updateCartItems();
    } catch (error) {
      console.error("Error deleting all cart items" , error);
      toast.error("There is error delete all cart try again");
    }finally{
      toast.dismiss();
      toast.success("All Cart Items Deleted ")
    }
  }

  async function updateItemCount(productId, count) {
    let data;
    try {
      setIsLaoding(true);
      toast.loading("Updating cart item...");
      const response = await updateCartProductQuantity(productId, count);
      data = response.data;
      toast.success("Cart item updated");
    } catch (error) {
      console.error("Error updating the item:", error);
      toast.error("There was an error updating the item");
    } finally {
      setIsLaoding(false);
      toast.dismiss();
      if (data) {
        setCartDetials(data);
      }
    }
  }

  useEffect(() => {
    getCartDetials();
  }, []);

  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="mx-auto p-5">
            <div className="d-flex justify-content-between">
            <h2 className="mb-3">Cart</h2>
            <button onClick={deleteAllCart}       className="btn btn-outline-danger btn-sm small">Delete All</button>
            </div>
            <div className="d-flex justify-content-between mb-4">
              <div className="text-muted">
                Total Price :{" "}
                {cartDetails.data ? (
                  <span className="mainText">
                    {cartDetails.data.totalCartPrice} EGY
                  </span>
                ) : (
                  <span>
                    <p className="placeholder-glow">
                      <span
                        className="placeholder w-20"
                        style={{
                          height: "20px",
                          backgroundColor: "#f0f0f0",
                          borderRadius: "5px",
                        }}
                      ></span>
                    </p>
                  </span>
                )}
              </div>
              <div className="text-muted">
                Total cart Items :{" "}
                {cartDetails.numOfCartItems ? (
                  <span className="mainText">{cartDetails.numOfCartItems}</span>
                ) : (
                  <span>
                    <p className="placeholder-glow">
                      <span
                        className="placeholder w-20"
                        style={{
                          height: "20px",
                          backgroundColor: "#f0f0f0",
                          borderRadius: "5px",
                        }}
                      ></span>
                    </p>
                  </span>
                )}
              </div>
            </div>
            {cartDetails.data?.products.map((ele) => (
              <div className="row  py-2 border-bottom" key={ele.product._id}>
                <div className="col-md-2">
                  <img src={ele.product.imageCover} className="w-100" />
                </div>
                <div className="col-md-10 ">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="ls">
                      <h6> {ele.product.title}</h6>
                      <span>{ele.product.brand.name}</span>
                      <h5>
                        {" "}
                        <span className="mainText">{ele.price}</span> EGY
                      </h5>
                      <p>{}</p>
                      <button
                        onClick={() => removeItem(ele.product._id)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        <i class="bi bi-trash3"></i> delete{" "}
                      </button>
                    </div>
                    <div className="rs">
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic outlined example"
                      >
                        <button
                          disabled={ele.count === 1}
                          onClick={() =>
                            updateItemCount(ele.product._id, ele.count - 1)
                          }
                          type="button"
                          className="btn btn-outline-dark"
                        >
                          -
                        </button>
                        <span className="textMain border-top border-bottom border-black p-2">
                          {ele.count}
                        </span>
                        <button
                          onClick={() =>
                            updateItemCount(ele.product._id, ele.count + 1)
                          }
                          type="button"
                          className="btn btn-outline-dark"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Link className={`btn btn-outline-success w-100 ${cartDetails.numOfCartItems === 0 && 'disabled'}`}  >
          Check Out
        </Link>
      </div>
    </>
  );
}

export default Cart;
