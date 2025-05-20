import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import {motion} from "framer-motion"

const ModalDelete = ({ modalClose, name, token, id }) => {
  const navigate = useNavigate();
  const API_URL = "https://personifai-back-end.onrender.com/api/v1/character";
  const deleteCharacter = async (characterId) => {
    try {
 
      const response = await axios.delete(`${API_URL}/${characterId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      navigate("/library");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <motion.div
            className="fixed inset-0 flex items-center z-50 justify-center bg-neutral-950/75 backdrop-invert backdrop-opacity-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, y:20 }}>
      <div className="bg-black/80 border border-purple-500/20 backdrop-blur-lg text-white w-full max-w-md px-6 py-10 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Eliminar a {name} </h2>
        <p>¿Esta seguro de querer eliminar este personaje?</p>
        <div>
          <button
            onClick={() => deleteCharacter(id)}
            className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 cursor-pointer"
          >
            Eliminar
          </button>
          <button
            onClick={modalClose}
            className="mt-4 w-full bg-neutral-700 text-white py-2 rounded-lg hover:bg-neutral-800 cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ModalDelete;
