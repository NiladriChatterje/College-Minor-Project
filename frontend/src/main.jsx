import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThirdwebProvider
    activeChain={Sepolia}
    clientId={import.meta.env.VITE_THIRDWEB_CLIENT_ID}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThirdwebProvider>
);
