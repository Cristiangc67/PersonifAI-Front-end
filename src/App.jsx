import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet, Link } from "react-router";
import Navbar from "./components/Navbar";

//paginas
import Home from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <div className=" app  pt-3 ">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
