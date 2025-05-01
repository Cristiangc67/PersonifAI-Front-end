import { React, useContext, useEffect } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { isAuthenticated, logout, actualUser } = useContext(AuthContext);
  const defaultImage = "src/assets/user.png";
  useEffect(() => {
    if (!actualUser || !actualUser.id) return;
  });

  return (
    <nav className=" mt-3 z-50 relative flex justify-between items-center bg-neutral-900 w-full h-20 rounded-2xl  px-20 max-1280 mx-auto">
      <NavLink
        to="/"
        className="text-2xl roboto-600 bg-linear-65 from-purple-500 to-pink-500 text-transparent bg-clip-text"
      >
        PersonifAI
      </NavLink>

      <div className=" flex flex-row gap-10 items-center ">
        <NavLink
          to="/library"
          className={({ isActive }) =>
            (isActive ? "text-violet-700" : "text-neutral-50") +
            " hover:text-violet-700 roboto-500 transition-colors ease-in duration-150"
          }
          end
        >
          Libreria
        </NavLink>
        <NavLink
          to="/create-character"
          className={({ isActive }) =>
            (isActive ? "text-violet-700" : "text-neutral-50") +
            " hover:text-violet-700 roboto-500 transition-colors ease-in duration-150"
          }
          end
        >
          Chat
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
        {isAuthenticated ? (
          <div className="bg-neutral-700 relative rounded-t-xl rounded-b-xl hover:rounded-b-none ">
            <div className="peer flex flex-row items-center gap-4 bg-neutral-700 px-4 py-2 rounded-2xl">
              <span className="roboto-500">{actualUser.username}</span>
              <img
                src={actualUser.image ? actualUser.image : defaultImage}
                alt=""
                className=" w-11 rounded-full"
              />
            </div>
            <div className="hidden w-full absolute peer-hover:flex hover:flex bg-neutral-700  rounded-b-xl py-4 gap-2  flex-col">
              <NavLink
                to={`/user/${actualUser.id}`}
                className=" hover:bg-neutral-600 px-6 py-2"
              >
                Mi perfil
              </NavLink>
              <NavLink
                to={`/user/${actualUser.id}/masks`}
                className=" hover:bg-neutral-600 px-6 py-2"
              >
                Mis Mascaras
              </NavLink>
              <button
                className=" cursor-pointer hover:bg-neutral-600 px-6 py-2"
                onClick={logout}
              >
                Cerrar sesion
              </button>
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
