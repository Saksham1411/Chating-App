import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";
// import dotenv from 'dotenv';

// dotenv.config();
function App() {
  // const PORT = process.env.PORT || 4000;
  axios.defaults.baseURL = `https://chatapp-backend-sabz.onrender.com`;
  // axios.defaults.baseURL = `http://localhost:4000`;
  axios.defaults.withCredentials = true;
  const { authUser } = useContext(AuthContext);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUp />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
