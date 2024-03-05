
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LayOut from "./Components/LayOut/LayOut";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import TokenContextProvider, { TokenContext } from "./Context/TokenContext";
import { useContext, useEffect } from "react";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <LayOut />,
      children: [
        { path: "home", element: <Home /> },
        { path: "products", element: <Products /> },
        { path: "categories", element: <Categories /> },
        { path: "brands", element: <Brands /> },
        { path: "cart", element: <Cart /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  let {setToken}  = useContext(TokenContext)
  useEffect(()=>{
    if(localStorage.getItem("userToken") != null)
    {
        setToken(localStorage.getItem("userToken"));
    }
  })
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
