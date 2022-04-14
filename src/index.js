import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ContextProvider from "./context";
import { BrowserRouter } from "react-router-dom";
import 'react-alice-carousel/lib/alice-carousel.css';
ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
     <BrowserRouter>
        <App />
     </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
