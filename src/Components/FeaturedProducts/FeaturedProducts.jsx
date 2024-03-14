import React, { useEffect, useState } from "react";
import styles from "./FeaturedProducts.module.css";
import axios from "axios";
import Item from "./../Item/Item";
import { useQuery } from "react-query";


function FeaturedProducts() {
  // const [items, setItems] = useState([]);

  // async function getFeaturedProduct() {
  //   try {
  //     let { data } = await axios.get(
  //       "https://ecommerce.routemisr.com/api/v1/products"
  //     );
  //     setItems(data.data);
  //   } catch (error) {}
  // }

  // useEffect(() => {
  //   getFeaturedProduct();
  // }, []);
  function getFeaturedProduct() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  let { isLoading , error, data } = useQuery("featuredProductes", getFeaturedProduct);

  return (
    <>
      <div className="container">
        <div className="row py-5">
          <div className="row g-4 row-cols-lg-5 row-cols-2 row-cols-md-3 row-cols-sm-1">
            {data?.data.data.map((item) => (
                <Item
                  key={item.id}
                  id={item.id}
                  imageUrl={item.images[0]}
                  title={item.title}
                  category={item.category.name}
                  rating={item.ratingsAverage}
                  price={item.price}
                  isLoading ={isLoading}
              
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default FeaturedProducts;
