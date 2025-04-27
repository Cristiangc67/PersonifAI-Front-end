import React from "react";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router";

const HomePage = () => {
  return (
    <main className=" max-1280 pt-3 mx-auto mb-10">
      <section className="flex flex-row mt-20 gap-20 ">
        <div className="flex flex-col items-start gap-10">
          <h1 className="roboto-700 text-6xl text-left">
            Crea, personaliza y conversa con personajes impulsados por{" "}
            <span className="bg-linear-65 from-purple-500 to-pink-500 text-transparent bg-clip-text">
              AI
            </span>
          </h1>
          <p className="text-left text-xl text-neutral-200 nunito-400">
            Desata tu creatividad o explora los personajes creados por otros
            usuarios.
          </p>
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              (isActive ? "text-black bg-neutral-200" : "text-white") +
              " hover:from-violet-600 hover:to-fuchsia-600 roboto-400 px-11 py-3 text-2xl bg-linear-to-r from-violet-500 to-fuchsia-500 rounded-4xl transition-colors ease-in duration-150 "
            }
            end
          >
            Conversar
          </NavLink>
        </div>
        <img
          src="src\assets\hero.webp"
          className=" rounded-3xl h-[35rem]"
          alt=""
        />
      </section>
      <section className=" mt-40 ">
        <h2 className="text-5xl roboto-500 text-start mb-30 ">
          Explora la AI mediante modelos
        </h2>
        <div className="flex gap-8 ">
          <div className="card flex flex-col gap-6">
            <img
              src="src\assets\chatgpt-icon-1.svg"
              className=" h-64 "
              alt="logo chatgpt"
            />
            <div className="text-start">
              <h3 className="text-2xl roboto-500 mb-3">ChatGPT</h3>
              <p className="text-xl text-neutral-500 nunito-400">
                El poderoso modelo de inteligencia artificial de OpenAI.
              </p>
            </div>
          </div>
          <div className="card flex flex-col gap-6">
            <img
              src="src\assets\google-gemini-icon-1.svg"
              alt="logo gemini"
              className=" h-64 "
            />
            <div className="text-start">
              <h3 className="text-2xl roboto-500 mb-3">Gemini</h3>
              <p className="text-xl text-neutral-500 nunito-400">
                El avanzado modelo de inteligencia artificial de Google.
              </p>
            </div>
          </div>
          <div className="card flex flex-col gap-6">
            <img
              src="src\assets\deepseek-logo-icon-1.svg"
              alt="logo deepseek"
              className="h-64"
            />
            <div className="text-start">
              <h3 className="text-2xl roboto-500 mb-3">DeepSeek</h3>
              <p className="text-xl text-neutral-500 nunito-400">
                El potente modelo de inteligencia artificial de DeepSeek.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-40 flex gap-10">
        <div className=" flex flex-col text-start">
          <h2 className="text-5xl roboto-500 text-start mb-30 ">
            Escribe tus historias
          </h2>
          <div className="gap-12 flex flex-col">
            <div>
              <h3 className="text-2xl roboto-500 mb-3">Ciencia ficción</h3>
              <p className="nunito-400 text-neutral-500 text-xl">
                Historias llenas de elementos futuristas, robots, naves
                espaciales y mas.
              </p>
            </div>
            <div>
              <h3 className="text-2xl roboto-500 mb-3">Fantasía</h3>
              <p className="nunito-400 text-neutral-500 text-xl">
                Historias fantásticas con animales y seres mitológicos que
                llamaran tu atención.
              </p>
            </div>
            <div>
              <h3 className="text-2xl roboto-500 mb-3">Otros</h3>
              <p className="nunito-400 text-neutral-500 text-xl">
                Crea personajes e historias repletas de distintos géneros
                literarios con los que conversar, moldea sus mundo y a ellos
                mismos.
              </p>
            </div>
            <div className=" flex gap-6">
              <NavLink
                to="/chat"
                className={({ isActive }) =>
                  (isActive ? "text-black bg-neutral-200" : "text-white") +
                  " hover:from-violet-600 hover:to-fuchsia-600 roboto-500 px-11 py-3 text-xl bg-linear-to-r from-violet-500 to-fuchsia-500 rounded-4xl transition-colors ease-in duration-150 "
                }
                end
              >
                Crear Personaje
              </NavLink>
              <NavLink
                to="/chat"
                className={({ isActive }) =>
                  (isActive ? "text-black bg-neutral-200" : "text-black") +
                  " hover: roboto-500 bg-neutral-200 px-11 py-3 text-xl rounded-4xl transition-colors ease-in duration-150 "
                }
                end
              >
                Ir a la libreria
              </NavLink>
            </div>
          </div>
        </div>
        <img
          src="src\assets\tales.webp"
          className="h-[44rem] rounded-3xl"
          alt=""
        />
      </section>
    </main>
  );
};

export default HomePage;
