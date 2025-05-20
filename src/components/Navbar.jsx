import { React, useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext.jsx";
import { IoClose, IoMenu } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion"
import { FaUser } from "react-icons/fa6";
import { PiMaskHappyFill,PiBooksFill,PiUserCirclePlusFill, PiCurrencyCircleDollarFill    } from "react-icons/pi";


const Navbar = () => {
  const { isAuthenticated, logout, actualUser } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState(false)

  const defaultImage = "src/assets/user.png";
  useEffect(() => {
    if (!actualUser || !actualUser.id) return;
  });


  return (
    <nav className=" sticky top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10  ">
      <div className="max-w-7xl flex mx-auto px-4 sm:px-6 lg:px-8 items-center justify-between py-1">
        <NavLink
          to="/"
          className="text-2xl roboto-600 bg-linear-65 from-purple-500 to-pink-500 text-transparent bg-clip-text"
        >
          PersonifAI
        </NavLink>

        <div className=" md:flex flex-row gap-10 items-center hidden ">
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
            Crear Personaje
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
            <div className="backdrop-blur-md bg-black/30 border rounded-full border-white/10 ">
              <div className="peer flex flex-row items-center gap-4  px-4 py-1 rounded-2xl">
                <span className="roboto-400 text-sm">{actualUser.username}</span>
                <img
                  src={actualUser.image ? actualUser.image : defaultImage}
                  alt=""
                  className=" w-11 rounded-full"
                />
              </div>
              <div className="hidden w-full absolute peer-hover:flex hover:flex bg-black/80  rounded-xl py-4 gap-2  flex-col text-sm border border-white/10">
                <NavLink
                  to={`/user/${actualUser.id}`}
                  className=" hover:bg-neutral-600 px-6 py-2 "
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
        <button onClick={() => setOpenMenu(true)} className="border block md:hidden p-0.5 hover:bg-white/20 border-white/40 rounded-lg cursor-pointer"  >
          <IoMenu size={40} />
        </button>
        <AnimatePresence>
          {openMenu &&
            <motion.div
              initial={{ opacity: 0, }}
              animate={{ opacity: 1, }}
              transition={{ duration: 0.2 }}
              exit={{ opacity: 0 }} className="w-screen h-screen absolute left-0 top-0 bg-black/50 block md:hidden " >
              <div onClick={() => setOpenMenu(false)} className="w-full bg-transparent h-full"></div>
              <div className=" backdrop-blur-3xl w-1/2 transition-all duration-500 bg-gradient-to-b from-black to-purple-900/40 border-s border-white/20  h-full absolute inset-y-0 right-0 flex flex-col">
                <button onClick={() => setOpenMenu(false)} className="border w-fit ms-2 mt-2 p-0.5 hover:bg-white/20 border-white/40 rounded-lg cursor-pointer">
                  <IoClose size={40} />
                </button>
                <div className=" h-full justi flex flex-col gap-10 justi items-center mt-5 w-full roboto-400 ">
                {isAuthenticated ? (
                    <>
                      <div className=" w-full border-b-2 border-white/20 flex flex-row items-center gap-4 justify-end  px-4 py-1 ">
                        <span className="roboto-400 text-xl">{actualUser.username}</span>
                        <img
                          src={actualUser.image ? actualUser.image : defaultImage}
                          alt=""
                          className=" w-20 rounded-full"
                        />
                      </div>
                     
                        <NavLink
                          to={`/user/${actualUser.id}`}
                          className="flex items-center gap-2 w-full px-6 "
                        >
                          <FaUser size={18}/>
                          Mi perfil
                        </NavLink>
                        <NavLink
                          to={`/user/${actualUser.id}/masks`}
                          className=" flex items-center gap-2 w-full px-6"
                        >
                          <PiMaskHappyFill size={20} />
                          Mis Mascaras
                        </NavLink>
                        
                      </>
                    
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
                  <NavLink
                    to="/library"
                    className="flex items-center gap-2 w-full px-6 "
                    end
                  >
                    <PiBooksFill size={20}/>
                    Libreria
                  </NavLink>
                  <NavLink
                    to="/create-character"
                   className="flex items-center gap-2 w-full px-6 "
                    end
                  >
                    <PiUserCirclePlusFill size={20}/>
                    Crear Personaje
                  </NavLink>
                  <NavLink
                    to="/plans"
                    className="flex items-center gap-2 w-full px-6 "
                    end
                  >
                    <PiCurrencyCircleDollarFill size={20}/>
                    Planes
                  </NavLink>

                  {isAuthenticated?<button
                          className=" cursor-pointer text-purple-300 font-semibold mt-10 bg-white/20 px-2 py-1 rounded-lg "
                          onClick={logout}
                        >
                          Cerrar sesion
                        </button>:""}
                  
                </div>

              </div>
            </motion.div>}
        </AnimatePresence>

      </div>
    </nav>
  );
};

export default Navbar;
