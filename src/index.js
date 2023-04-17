import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./components/App";
import LoginProvider from "./providers/UserContext";
import StateProvider from "./providers/StateContext";
import WebSocketProvider from './providers/WebSocketContext';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StateProvider>
    <WebSocketProvider>
      <LoginProvider>
        <App />
      </LoginProvider>
    </WebSocketProvider>
  </StateProvider>
);
