import React from "react";
import Navbar from "../components/Navbar";

const NotFound = () => {
  return (
    <div className="h-full mx-auto max-1280 ">
      <Navbar />
      <div className="h-full items-center flex flex-col justify-center">
        <h2 className="text-9xl text-center roboto-600 bg-linear-65 from-purple-500 block to-pink-500 text-transparent bg-clip-text">
          404
        </h2>
        <p className="text-8xl text-wrap nunito-500"> Pagina no encontrada</p>
      </div>
    </div>
  );
};

export default NotFound;
