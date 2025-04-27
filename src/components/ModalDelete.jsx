import React from "react";

const ModalDelete = ({ modalClose, name, deleteCharacter }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-950/75 backdrop-invert backdrop-opacity-10 ">
      <div className="bg-neutral-900 p-5 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Eliminar a {name} </h2>
        <p>¿Esta seguro de querer eliminar este personaje?</p>
        <div>
          <button
            onClick={deleteCharacter}
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
    </div>
  );
};

export default ModalDelete;
