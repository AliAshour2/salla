import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all";
import CounterContextProvider from "./Context/Counter";
import TokenContextProvider from "./Context/TokenContext";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* -------------------------------------------------------------------------- */
/*                              import libraries                              */
/* -------------------------------------------------------------------------- */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CounterContextProvider>
      <TokenContextProvider>
        <App />
      </TokenContextProvider>
    </CounterContextProvider>
  </React.StrictMode>
);
