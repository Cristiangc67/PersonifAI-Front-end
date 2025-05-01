import React from "react";
import { FaPencil, FaTrash } from "react-icons/fa6";

const MaskCard = ({ mask, handleOpenModal, handleDeleteMask }) => {
  return (
    <div
      key={mask._id}
      className="bg-black/20 border rounded-xl border-white/10 backdrop-blur-lg hover:bg-black/30 transition-all duration-300 p-6 h-full flex flex-col "
    >
      <div className="flex flex-row items-center justify-between pb-3">
        <span className="text-xl font-semibold text-white">{mask.name}</span>
        <div className="flex gap-2">
          <button
            onClick={() => handleOpenModal(mask)}
            className="flex bg-zinc-800 hover:bg-zinc-700 cursor-pointer items-center px-3 py-2 rounded-lg"
          >
            <FaPencil />
            <span className="ml-2">Editar</span>
          </button>
          <button
            onClick={() => handleDeleteMask(mask._id)}
            className="flex bg-red-900 hover:bg-red-800 cursor-pointer items-center px-3 py-2 rounded-lg"
          >
            <FaTrash />
            <span className="ml-2">Borrar</span>
          </button>
        </div>
      </div>
      <div className="flex-grow">
        <p className="text-start">{mask.description}</p>
      </div>
    </div>
  );
};

export default MaskCard;
