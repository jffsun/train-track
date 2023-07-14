import React from "react";
import ReactDOM from "react-dom";
import App from "./App";  

// React context which provides info to all components in our app
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    
    {/* Wrap entire application in BrowserRouter component */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);