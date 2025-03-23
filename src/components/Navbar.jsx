import React from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-neutral-900 w-full h-20 rounded-2xl  px-20 max-1280 mx-auto">
      <h2 className="text-2xl roboto-600 bg-linear-65 from-purple-500 to-pink-500 text-transparent bg-clip-text">
        PersonifAI
      </h2>

      <div className=" flex flex-row gap-10 items-center ">
        <NavLink
          to="/"
          className={({ isActive }) =>
            (isActive ? "text-violet-700" : "text-neutral-50") +
            " hover:text-violet-700 roboto-500 transition-colors ease-in duration-150"
          }
          end
        >
          Inicio
        </NavLink>
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            (isActive ? "text-violet-700" : "text-neutral-50") +
            " hover:text-violet-700 roboto-500 transition-colors ease-in duration-150"
          }
          end
        >
          Libreria
        </NavLink>
        <NavLink
          to="/plans"
          className={({ isActive }) =>
            (isActive ? "text-violet-700" : "text-neutral-50") +
            " hover:text-violet-700 roboto-500 transition-colors ease-in duration-150"
          }
          end
        >
          Planes
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            (isActive ? "text-black bg-neutral-200" : "text-neutral-50") +
            " hover:text-black roboto-500 px-4 py-2 hover:bg-neutral-200 rounded-3xl transition-colors ease-in duration-150 "
          }
          end
        >
          Ingresar
        </NavLink>
        <NavLink
          to="/register"
          className={({ isActive }) =>
            (isActive ? "text-black bg-neutral-200" : "text-white") +
            " hover:from-violet-600 hover:to-fuchsia-600 roboto-500 px-4 py-2  bg-linear-to-r from-violet-500 to-fuchsia-500 rounded-3xl transition-colors ease-in duration-150 "
          }
          end
        >
          Registrarse
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
