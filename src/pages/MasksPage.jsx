import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router";

const MasksPage = () => {
  const { token, actualUser } = useContext(AuthContext);
  const { id } = useParams();
  const [userMasks, setUserMasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMask, setNewMask] = useState({ name: "", description: "" });
  const [editingMaskId, setEditingMaskId] = useState(null); // ← Para saber si es edición
  const [error, setError] = useState("");

  const API_URL = "http://localhost:5500/api/v1/users";

  useEffect(() => {
    const fetchUserMasks = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}/masks`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setUserMasks(response.data.data.masks);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserMasks();
  }, [id, token]);

  const handleOpenModal = (mask = null) => {
    if (mask) {
      setNewMask({ name: mask.name, description: mask.description || "" });
      setEditingMaskId(mask._id);
    } else {
      setNewMask({ name: "", description: "" });
      setEditingMaskId(null);
    }
    setError("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewMask({ name: "", description: "" });
    setEditingMaskId(null);
  };

  const handleInputChange = (e) => {
    setNewMask({ ...newMask, [e.target.name]: e.target.value });
  };

  const handleCreateOrUpdateMask = async () => {
    if (!newMask.name.trim()) {
      setError("El nombre es obligatorio");
      return;
    }

    try {
      if (editingMaskId) {
        // EDITAR
        const response = await axios.put(
          `http://localhost:5500/api/v1/masks/${editingMaskId}`,
          {
            name: newMask.name,
            description: newMask.description,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setUserMasks((prev) =>
          prev.map((m) => (m._id === editingMaskId ? response.data.data : m))
        );
      } else {
        // CREAR
        const response = await axios.post(
          "http://localhost:5500/api/v1/masks/",
          {
            ...newMask,
            userId: id,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setUserMasks((prev) => [...prev, response.data.data]);
      }

      handleCloseModal();
    } catch (err) {
      console.error(err);
      setError("Error al guardar la máscara");
    }
  };

  const handleDeleteMask = async (maskId) => {
    try {
      await axios.delete(
        `http://localhost:5500/api/v1/masks/${maskId}`,

        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: { userId: actualUser.id },
        }
      );
      setUserMasks((prev) => prev.filter((m) => m._id !== maskId));
    } catch (err) {
      console.error("Error al borrar la máscara", err);
    }
  };

  return (
    <div className="py-10">
      <div className="w-3/4 max-1280 mx-auto bg-neutral-900 rounded-xl p-6 shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Máscaras</h2>
          <button
            className="bg-violet-700 text-white px-4 py-2 rounded hover:bg-violet-800 cursor-pointer"
            onClick={() => handleOpenModal()}
          >
            + Nueva Máscara
          </button>
        </div>

        {userMasks.length === 0 ? (
          <p>No tenés máscaras todavía.</p>
        ) : (
          <ul className="space-y-10 overflow-y-scroll">
            {userMasks.map((mask) => (
              <li
                key={mask._id}
                className="bg-neutral-800 p-4 rounded-xl flex justify-between items-start gap-4"
              >
                <div className="text-start">
                  <strong>{mask.name}</strong>
                  {mask.description && <p>{mask.description}</p>}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenModal(mask)}
                    className="bg-zinc-600 hover:bg-zinc-700 transition-colors duration-150 px-3 py-2 rounded-xl cursor-pointer"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteMask(mask._id)}
                    className="bg-red-700 hover:bg-red-800 transition-colors duration-150 px-3 py-2 rounded-xl cursor-pointer"
                  >
                    Borrar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-neutral-950/75  flex justify-center items-center z-50">
          <div className="bg-neutral-900 p-6 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingMaskId ? "Editar Máscara" : "Crear Nueva Máscara"}
            </h3>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={newMask.name}
              onChange={handleInputChange}
              className="bg-neutral-800 rounded-xl px-5 py-2 mt-5 w-full"
            />
            <textarea
              name="description"
              placeholder="Descripción"
              value={newMask.description}
              onChange={handleInputChange}
              className="bg-neutral-800 rounded-xl px-5 py-2 mt-5 w-full"
            />
            {error && <p className="text-red-600 mb-2">{error}</p>}
            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-800 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateOrUpdateMask}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
              >
                {editingMaskId ? "Actualizar" : "Crear"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MasksPage;
