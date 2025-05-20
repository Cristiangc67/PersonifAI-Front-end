import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useParams, useNavigate, NavLink } from "react-router";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa6";

const CreateCharacterPage = () => {
  const { token, actualUser, isAuthenticated, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [form, setForm] = useState({
    name: "",
    nameCharacter: "",
    description: "",
    firstMessage: "",
    personality: "",
    appearance: "",
    scenario: "",
    cardDescription: "",
  });
  const [loading,setLoading] = useState(false)
  const API_URL = "https://personifai-back-end.onrender.com/api/v1/character";

  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);

  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (isLoading) return;
    if(isAuthenticated=== false) {navigate("/login")
      return
    }
    /* if (!actualUser || !actualUser.id) {
      navigate("/forbidden");
      return
    } */
    if (isEditMode) {
  
      axios
        .get(`${API_URL}/${id}`)
        .then((res) => {
          if (
            actualUser.id != res.data.data.creator._id ||
            isAuthenticated == false
          ){
            navigate("/forbidden");
            return
          }
     
          setForm(res.data.data);
          setPreviewUrl(res.data.data.characterPicture);

        })
        .catch((err) => {
          console.error("Error al obtener el personaje:", err);
        });
    }
  }, [isLoading,isAuthenticated,actualUser, id, isEditMode]);

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
      if (isEditMode) {
        const formData = new FormData();
        for (const key in form) {
          formData.append(key, form[key]);
        }

        if (image) {
          formData.append("image", image);
        }
        
        try {
          setLoading(true)
          await axios.patch(`${API_URL}/${id}`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          navigate(`/character/${id}`);
          
        } catch (error) {
          console.log("f", error);
        }
        
      } else {
        const formData = new FormData();
        const userId = isAuthenticated ? actualUser.id : "";


        for (const key in form) {
          formData.append(key, form[key]);
        }
        formData.append("creator", isAuthenticated ? actualUser.id : "");
  

        if (image) {
          formData.append("image", image);
        }

        try {
          setLoading(true)
          const response = await axios.post(`${API_URL}/`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

  
          navigate(`/character/${response.data.data.character._id}`);
        } catch (err) {
          console.error("Error de red:", err);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900/20">
     
      <Navbar />
    {loading?(<main className="w-full h-[90vh] flex justify-center items-center ">
      <div className="loader"></div>
    </main>):(
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center mb-8">
            <NavLink
              to={isEditMode ? `/character/${id}` : "/library"}
              className=" flex items-center text-gray-400 hover:text-white mr-4 cursor-pointer"
            >
              <FaArrowLeft className="mr-4" />
              <span>Volver</span>
            </NavLink>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {isEditMode ? "Editar Personaje" : "Crear Personaje"}
            </h1>
          </div>

          <form
            action=""
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-4"
                >
                  <label className="text-lg text-white font-bold">
                    Imagen del Personaje
                  </label>
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-600 to-blue-400 opacity-50 blur-sm"></div>
                    {isAuthenticated ? (
                      <img
                        className=" relative aspect-3/4  w-full h-full object-cover rounded-lg z-10 "
                        src={
                          previewUrl ? previewUrl : "/assets/character.webp"
                        }
                        alt=""
                      />
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={(e) =>{
                        e.preventDefault()
                        document.getElementById("inputFile")?.click()}
                      }
                      className="w-full border py-2 rounded-lg border-purple-500 text-purple-400 hover:bg-purple-500/30 cursor-pointer"
                    >
                      Seleccionar Imagen
                    </button>
                    <input
                      className="hidden"
                      type="file"
                      name="characterimage"
                      accept="image/*"
                      onChange={handleFileChange}
                      id="inputFile"
                    />
                  </div>
                </motion.div>
              </div>

              <div className="md:col-span-2 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className="flex flex-col text-start">
                    <label htmlFor="name" className="text-white">
                      Nombre del personaje
                    </label>
                    <input
                      className="bg-black/40 border-white/10 text-white  border px-3 py-2 rounded-lg"
                      required
                      minLength={2}
                      maxLength={50}
                      type="text"
                      id="name"
                      name="name"
                      onChange={handleChange}
                      value={form.name}
                    />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <div className="flex flex-col text-start">
                    <label htmlFor="name" className="text-white">
                      Nombre del personaje en el chat
                    </label>
                    <input
                      className="bg-black/40 border-white/10 text-white border px-3 py-2 rounded-lg"
                      required
                      minLength={2}
                      maxLength={50}
                      type="text"
                      id="nameCharacter"
                      name="nameCharacter"
                      onChange={handleChange}
                      value={form.nameCharacter}
                    />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-lg p-4 space-y-6 shadow shadow-purple-600 "
                >
                  <div className="flex flex-col text-start">
                    <label className=" text-white mb-2" htmlFor="description">
                      Descripcion del chat
                    </label>
                    <textarea
                      className="bg-black/40 border-white/10 text-white min-h-[100px] py-1 px-2 border rounded-lg"
                      required
                      name="cardDescription"
                      id="cardDescription"
                      onChange={handleChange}
                      value={form.cardDescription}
                    ></textarea>
                  </div>
                  <div className="flex flex-col text-start">
                    <label className=" text-white mb-2" htmlFor="description">
                      Descripcion del personaje
                    </label>
                    <textarea
                      className="bg-black/40 border-white/10 text-white min-h-[100px] py-1 px-2 border rounded-lg"
                      required
                      name="description"
                      id="description"
                      onChange={handleChange}
                      value={form.description}
                    ></textarea>
                  </div>
                  <div className="flex flex-col text-start">
                    <label htmlFor="personality" className="text-white mb-2">
                      Personalidad
                    </label>
                    <textarea
                      className="bg-black/40 border-white/10 text-white min-h-[100px] py-1 px-2 border rounded-lg"
                      required
                      name="personality"
                      id="personality"
                      onChange={handleChange}
                      value={form.personality}
                    ></textarea>
                  </div>
                  <div className="flex flex-col text-start">
                    <label htmlFor="appearance" className="text-white mb-2">
                      Vestimenta y accesorios
                    </label>
                    <textarea
                      className="bg-black/40 border-white/10 text-white min-h-[100px] py-1 px-2 border rounded-lg"
                      required
                      name="appearance"
                      id="appearance"
                      onChange={handleChange}
                      value={form.appearance}
                    ></textarea>
                  </div>
                  <div className="flex flex-col text-start">
                    <label htmlFor="scenario" className="text-white mb-2">
                      Escenario
                    </label>
                    <textarea
                      className="bg-black/40 border-white/10 text-white min-h-[100px] py-1 px-2 border rounded-lg"
                      required
                      name="scenario"
                      id="scenario"
                      onChange={handleChange}
                      value={form.scenario}
                    ></textarea>
                  </div>
                  <div className="flex flex-col text-start">
                    <label htmlFor="firstMessage" className="text-white mb-2">
                      Primer Mensaje
                    </label>
                    <textarea
                      className="bg-black/40 border-white/10 text-white min-h-[100px] py-1 px-2 border rounded-lg"
                      required
                      name="firstMessage"
                      id="firstMessage"
                      onChange={handleChange}
                      value={form.firstMessage}
                    ></textarea>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="w-full max-w-xs"
              >
                <button
                  type="submit"
                  className=" rounded-lg w-full bg-purple-600 hover:bg-purple-700 text-white py-6 shadow-lg shadow-purple-700/30 cursor-pointer "
                >
                  {isEditMode ? "Guardar" : "Crear"}
                </button>
              </motion.div>
            </div>
          </form>
        </motion.div>
      </main>)}
    </div>
  );
};

export default CreateCharacterPage;
