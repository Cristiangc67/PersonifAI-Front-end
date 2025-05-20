import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useParams, useNavigate, data, NavLink } from "react-router";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { BsUpload } from "react-icons/bs";

const UserEditNew = () => {
  const { token, actualUser, isAuthenticated, refreshUser } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    username: "",
    email: "",
  });
  const API_URL = "http://localhost:5500/api/v1/users";

  const [image, setImage] = useState(null);

  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!actualUser || !actualUser.id) return;
    if (!isAuthenticated || actualUser.id != id) {
      navigate("/forbidden");
    }
    axios
      .get(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {

        setForm(res.data.data);
        setPreviewUrl(res.data.data.profilePicture);
      })
      .catch((err) => {
        console.error("Error al obtener el usuario:", err);
      });
  }, [actualUser, id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setImage(null);
      setPreviewUrl(null);
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key]);
      }

      if (image) {
        formData.append("image", image);
      }
      try {
        /* console.log("Contenido del FormData:");
        for (const [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        } */
        await axios.patch(`${API_URL}/${id}/edit`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        await refreshUser();
      } catch (error) {
        console.log("formulario NO actualizado", error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-black/40 backdrop-blur-sm border border-white/10 overflow-hidden shadow-lg shadow-purple-900/20 rounded-lg">
            <div className="bg-gradient-to-b from-purple-900/30 to-transparent pt-8 pb-8">
              <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Editar Perfil
              </h1>
            </div>
            <div className="space-y-8 px-6">
              <div className="flex flex-col items-center py-6">
                <p className="text-gray-400 mb-4">Imagen del Perfil</p>
                <div className="relative group">
                  <div className="w-32 h-32 border-4 border-purple-500/30 shadow-lg shadow-purple-500/20 group-hover:border-purple-500/50 transition-all rounded-full overflow-hidden">
                    {isAuthenticated && (image || previewUrl) ? (
                      <img
                        className=" object-cover rounded-full "
                        src={previewUrl}
                        alt=""
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <label
                      htmlFor="inputFile"
                      className="cursor-pointer p-3 rounded-full hover:bg-white/10 transition-colors"
                    >
                      <BsUpload />
                    </label>
                  </div>
                  <input
                    className=" hidden"
                    type="file"
                    name="profilePicture"
                    accept="image/*"
                    onChange={handleFileChange}
                    id="inputFile"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Haz clic en la imagen para cambiarla
                </p>
              </div>

              <form
                action=""
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="space-y-6"
              >
                <div className="flex flex-col">
                  <label
                    htmlFor="username"
                    className="text-gray-300 text-start font-semibold mb-2 "
                  >
                    Nombre de Usuario
                  </label>
                  <input
                    className="bg-black/50 border-white/10  border-2 px-2 py-2 rounded-lg"
                    required
                    minLength={2}
                    maxLength={50}
                    type="text"
                    id="username"
                    name="username"
                    onChange={handleChange}
                    value={form.username}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    className=" text-gray-300 text-start font-semibold mb-2"
                    htmlFor="description"
                  >
                    Email
                  </label>
                  <input
                    className="bg-black/50 border-white/10 border-2 px-2 py-2 rounded-lg"
                    required
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    value={form.email}
                  />
                </div>

                <div className="flex gap-4 justify-end mb-10">
                  <NavLink
                    to={`/user/${id}`}
                    className="border-white/10 hover:bg-white/20 border-2 rounded-lg hover:text-white px-5 py-2 cursor-pointer"
                  >
                    Cancelar
                  </NavLink>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 px-5 py-2 rounded-lg cursor-pointer "
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserEditNew;
