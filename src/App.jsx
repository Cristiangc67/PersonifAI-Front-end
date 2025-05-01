import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet, Link } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

//paginas
import Home from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import ImagePage from "./pages/ImagePage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Outlet />
      {/* <Footer /> */}
    </AuthProvider>
  );
}

export default App;
