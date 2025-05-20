import React from "react";
import Navbar from "../components/Navbar";
import PlanFeature from "../components/PlanFeature";
import { LuCpu } from "react-icons/lu";
import { CiStar } from "react-icons/ci";
import {motion} from "framer-motion"

const PlansPage = () => {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-24 pb-16 px-4 max-w-7xl mx-auto w-full">
        <motion.div initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}  className="text-center mb-12">
          <div  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent pb-4">
            Elige el plan perfecto para ti
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Descubre el poder de la IA conversacional con nuestros planes diseñados para diferentes necesidades.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1  }} className="rounded-xl p-8 border border-white/10 bg-black/40 backdrop-blur-sm text-white relative overflow-hidden h-full flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />
            <div className="text-center pb-2">
              <h3 className="text-2xl font-bold text-white">Free</h3>
              <div className="mt-3">
                <span className="text-3xl font-bold text-white">$0</span>
                <span className="text-gray-400 ml-1">/mes</span>
              </div>
              
            </div>
            <div className="flex-grow pt-2 space-y-4">
              <ul className="space-y-3">
                <PlanFeature available={true}>
                  Acceso a todos los personajes en la librería
                </PlanFeature>
                <PlanFeature available={true}>
                  Uso de proveedores externos (OpenAI, Gemini, Deepseek)
                </PlanFeature>
                <PlanFeature available={true}>
                  Creación de personajes personalizados
                </PlanFeature>
                <PlanFeature available={true}>
                  Creación de máscaras personalizadas
                </PlanFeature>
                <PlanFeature available={false}>
                  Acceso al modelo Stheno 8B
                </PlanFeature>
                <PlanFeature available={false}>
                  Acceso al modelo Stheno 70B
                </PlanFeature>
              </ul>
            </div>
            <div className="mt-5">
              <button className="w-full bg-white/10 py-2 rounded-xl hover:bg-white/20 text-white">
                Comenzar gratis
              </button>
            </div>
          </motion.div>



          <motion.div initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2  }} className=" rounded-xl p-8 border border-purple-500/30 bg-black/40  backdrop-blur-sm text-white relative overflow-hidden h-full flex flex-col shadow-[0_0_15px_rgba(139,92,246,0.3)]">
            
            <div className="absolute top-0 left-0 right-0 px-3 py-1">
              <div className="w-full py-0.5 rounded-full bg-purple-800 text-sm  hover:bg-purple-900 text-white">Recomendado</div>
            </div>
            <div className="text-center pb-2 ">
              <h3 className="text-2xl font-bold text-white">Turing</h3>
              <div className="mt-3">
                <span className="text-3xl font-bold text-white">$10 000</span>
                <span className="text-gray-400 ml-1">/mes</span>
              </div>
  
            </div>
            <div className="flex-grow pt-2 space-y-4">
              <ul className="space-y-3">
                <PlanFeature available={true}>
                  <span className="text-purple-400">Todo</span> lo incluido en el plan Free
                </PlanFeature>
                <PlanFeature available={true}>
                  <span className="flex items-center gap-2">
                    <LuCpu className="h-4 w-4 text-purple-400" /> 
                    Acceso al modelo Stheno 8B
                  </span>
                </PlanFeature>
                <PlanFeature available={true}>
                  Generación de respuestas mejorada
                </PlanFeature>
                <PlanFeature available={false}>
                  Acceso al modelo Stheno 70B
                </PlanFeature>
              </ul>
            </div>
            <div>
              <button className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white">
                Elegir plan Turing
              </button>
            </div>
          </motion.div>


           <motion.div initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3  }} className="rounded-xl p-8 border border-white/50 bg-black/40 border-gradient-purple backdrop-blur-sm text-white relative overflow-hidden h-full flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent pointer-events-none" />
            <div className="text-center pb-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">Premium</h3>
              <div className="mt-3">
                <span className="text-3xl font-bold text-white">$20 000</span>
                <span className="text-gray-400 ml-1">/mes</span>
              </div>
              <p className="text-gray-400 text-sm mt-2">Para profesionales</p>
            </div>
            <div className="flex-grow pt-2 space-y-4">
              <ul className="space-y-3">
                <PlanFeature available>
                  <span className="text-purple-400">Todo</span> lo incluido en el plan Turing
                </PlanFeature>
                <PlanFeature available>
                  <span className="flex items-center gap-2">
                    <LuCpu className="h-4 w-4 text-purple-400" /> 
                    <CiStar className="h-4 w-4 text-purple-400" /> 
                    Acceso al modelo Stheno 70B
                  </span>
                </PlanFeature>
                <PlanFeature available>
                  Mayor límite de tokens por mensaje
                </PlanFeature>
                
                <PlanFeature available>
                  Soporte prioritario 24/7
                </PlanFeature>
              </ul>
            </div>
            <div>
              <button className="w-full py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white">
                Elegir plan Premium
              </button>
            </div>
          </motion.div>


        </div>
      </main>
    </>
  );
};

export default PlansPage;
