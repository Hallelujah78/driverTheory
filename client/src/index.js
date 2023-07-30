import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "./index.css";
import { AppProvider } from "./context/appContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    {/* Same as */}
    <ToastContainer />
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
