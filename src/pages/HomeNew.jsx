import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router";
import { LuRocket, LuSparkles, LuBookOpen } from "react-icons/lu";
import { PiUserCirclePlus } from "react-icons/pi";
import Navbar from "../components/Navbar";
import Openai from "/src/assets/chatgpt-icon-1.svg";
import Deepseek from "/src/assets/deepseek-logo-icon-1.svg";
import Gemini from "/src/assets/google-gemini-icon-1.svg";
import Footer from "../components/Footer";

const HomeNew = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900/20">
      <Navbar />

      <section className="container mx-auto px-4 pt-10 pb-16 ">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 text-start"
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white text-start">
              Crea, personaliza y conversa con{" "}
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                personajes impulsados por IA
              </span>
            </h1>
            <p className="text-gray-300 text-xl">
              Desata tu creatividad o explora los personajes creados por otros
              usuarios.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg cursor-pointer">
                <NavLink to="/login">Empezar a conversar</NavLink>
              </button>
              <button className="border-purple-600 text-purple-400 hover:bg-purple-600/40 border rounded-lg px-4 py-2  cursor-pointer">
                <NavLink to="/library">Explorar Máscaras</NavLink>
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-full flex justify-end"
          >
            <img
              src="src\assets\herotry.png"
              alt="AI Character"
              className="relative rounded-2xl w-3/5 h-auto object-cover z-10 drop-shadow-rose-400 pb-5 "
            />
            <div className="absolute w-3/5 h-3/4  -bottom-1  rounded-2xl  bg-linear-to-t from-black to-[rgba(0, 0, 0, 0)]    blur-lg z-20"></div>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Explora la{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              IA
            </span>{" "}
            mediante modelos
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Aprovecha el poder de los modelos de inteligencia artificial más
            avanzados para crear personajes únicos.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              name: "ChatGPT",
              icon: (
                <div className="w-16 h-16 bg-green-800 rounded-full flex items-center justify-center">
                  <img src={Openai} alt="" />
                </div>
              ),
              description:
                "El poderoso modelo de inteligencia artificial de OpenAI.",
            },
            {
              name: "Gemini",
              icon: (
                <div className="w-16 h-16 bg-neutral-200 rounded-full flex items-center justify-center">
                  <img src={Gemini} alt="" />
                </div>
              ),
              description:
                "El avanzado modelo de inteligencia artificial de Google.",
            },
            {
              name: "DeepSeek",
              icon: (
                <div className="w-16 h-16 bg-neutral-200 rounded-full flex items-center justify-center">
                  <img src={Deepseek} alt="" />
                </div>
              ),
              description:
                "El potente modelo de inteligencia artificial de DeepSeek.",
            },
          ].map((model, index) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:border-purple-500/50 transition-all hover:shadow-[0_0_25px_rgba(139,92,246,0.15)] group"
            >
              <div className="flex justify-center mb-4">{model.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                {model.name}
              </h3>
              <p className="text-gray-400">{model.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Escribe tus historias
            </h2>

            <div className="space-y-6">
              {[
                {
                  title: "Ciencia ficción",
                  icon: <LuRocket className="h-7 w-7 text-purple-400" />,
                  description:
                    "Historias llenas de elementos futuristas, robots, naves espaciales y más.",
                },
                {
                  title: "Fantasía",
                  icon: <LuSparkles className="h-7 w-7 text-purple-400" />,
                  description:
                    "Historias fantásticas con animales y seres mitológicos que llamarán tu atención.",
                },
                {
                  title: "Otros",
                  icon: <LuBookOpen className="h-7 w-7 text-purple-400" />,
                  description:
                    "Crea personajes e historias repletas de distintos géneros literarios con los que conversar.",
                },
              ].map((genre) => (
                <div
                  key={genre.title}
                  className="flex gap-4 text-start bg-black/20 border border-white/5 p-4 rounded-lg hover:border-purple-500/30 transition-all"
                >
                  <div className="bg-purple-900/30 p-3 rounded-full flex items-center justify-center">
                    {genre.icon}
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-semibold mb-1">
                      {genre.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{genre.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button className="flex items-center px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white cursor-pointer">
                <PiUserCirclePlus className="mr-2 h-4 w-4" />
                Crear Personaje
              </button>
              <button className="border-purple-600 border-1 px-4 py-2 rounded-lg  text-purple-400 hover:bg-purple-600/40 cursor-pointer">
                Ir a la librería
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600/40 to-blue-500/40 opacity-75 blur-xl"></div>
            <img
              src="/src/assets/tale.webp"
              alt="Fantasy Characters"
              className="relative rounded-2xl shadow-2xl w-full h-auto object-cover z-10"
            />
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomeNew;
