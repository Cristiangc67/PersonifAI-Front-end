import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router";
import MaskCard from "../components/MaskCard";
import { FaPlus } from "react-icons/fa6";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const MasksPage = () => {
  const { token, actualUser } = useContext(AuthContext);
  const { id } = useParams();
  const [userMasks, setUserMasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMask, setNewMask] = useState({ name: "", description: "" });
  const [editingMaskId, setEditingMaskId] = useState(null);
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
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900/20">
      <Navbar />

      <main className="container mx-auto px-4 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-12"
        >
          <div className="flex w-full justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-white">Máscaras</h2>
            <button
              className="bg-violet-700 text-white px-4 py-2 rounded-lg hover:bg-violet-800 cursor-pointer flex items-center gap-5"
              onClick={() => handleOpenModal()}
            >
              <FaPlus />
              <span>Nueva Máscara</span>
            </button>
          </div>
        </motion.div>

        {userMasks.length === 0 ? (
          <p>No tenés máscaras todavía.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {userMasks.map((mask, index) => (
              <motion.div
                key={mask.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="h-full"
              >
                <MaskCard
                  mask={mask}
                  handleOpenModal={handleOpenModal}
                  handleDeleteMask={handleDeleteMask}
                />
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-neutral-950/75  flex justify-center items-center z-50">
          <div className="bg-black p-6 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingMaskId ? "Editar Máscara" : "Crear Nueva Máscara"}
            </h3>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={newMask.name}
              onChange={handleInputChange}
              className="bg-black/40 border-white/10 text-white  border px-3 py-2 rounded-lg w-full"
            />
            <textarea
              name="description"
              placeholder="Descripción"
              value={newMask.description}
              onChange={handleInputChange}
              className="bg-black/40 border-white/10 text-white  border rounded-lg px-5 py-2 mt-5 w-full"
            />
            {error && <p className="text-red-600 mb-2">{error}</p>}
            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 border rounded-lg hover:bg-gray-800 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateOrUpdateMask}
                className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-600 cursor-pointer"
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
