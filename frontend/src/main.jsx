import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <UserContextProvider>
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
