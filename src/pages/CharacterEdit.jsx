import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const CharacterEdit = () => {
  const { token, actualUser, isAuthenticated } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    description: "",
    firstMessage: "",
    personality: "",
    appearance: "",
    scenario: "",
    cardDescription: "",
  });
  const API_URL = "https://personifai-back-end.onrender.com/api/v1/character";

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
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

    const formData = new FormData();
    const userId = isAuthenticated ? actualUser.id : "";
  

    for (const key in form) {
      formData.append(key, form[key]);
    }

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.patch(`${API_URL}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });



      if (response.ok) {
        console.log("Personaje editado:", response.data.data);

      } else {
        console.error("Error en la creación:", result.message);
      }
    } catch (err) {
      console.error("Error de red:", err);
    }
  };
  return (
    <>
      <Navbar />
      <div className="max-1280 bg-neutral-900 mx-auto mt-0 py-10 rounded-2xl">
        <h2 className="text-3xl roboto-700">Editar Personaje</h2>
        <form
          action=""
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="px-36 py-14 flex flex-col gap-10 text-start"
        >
          <label className=" w-fit text-2xl roboto-600" htmlFor="inputFile">
            Imagen del personaje
          </label>

          {isAuthenticated && image ? (
            <img
              className="h-[750px] w-[500px] contain-content object-cover rounded-2xl "
              src={previewUrl}
              alt=""
            />
          ) : (
            ""
          )}
          <input
            className=" block w-fit text-lg text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-lg file:font-semibold
        file:bg-neutral-700 file:text-white
        hover:file:bg-neutral-600"
            type="file"
            name="characterimage"
            accept="image/*"
            onChange={handleFileChange}
            id="inputFile"
          />
          <div className="flex flex-col">
            <label htmlFor="name" className="text-2xl roboto-600">
              Nombre del personaje
            </label>
            <input
              className="bg-neutral-800 rounded-xl px-5 py-2 mt-5"
              required
              minLength={2}
              maxLength={50}
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className=" text-2xl roboto-600" htmlFor="description">
              Descripcion del chat
            </label>
            <textarea
              className="bg-neutral-800 resize-none rounded-xl px-5 py-2 h-48 mt-5"
              required
              name="cardDescription"
              id="cardDescription"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label className=" text-2xl roboto-600" htmlFor="description">
              Descripcion del personaje
            </label>
            <textarea
              className="bg-neutral-800 resize-none rounded-xl px-5 py-2 h-48 mt-5"
              required
              name="description"
              id="description"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label htmlFor="personality" className="text-2xl roboto-600">
              Personalidad
            </label>
            <textarea
              className="bg-neutral-800 resize-none rounded-xl px-5 py-2 h-48 mt-5"
              required
              name="personality"
              id="personality"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label htmlFor="appearance" className="text-2xl roboto-600">
              Vestimenta y accesorios
            </label>
            <textarea
              className="bg-neutral-800 resize-none rounded-xl px-5 py-2 h-48 mt-5"
              required
              name="appearance"
              id="appearance"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label htmlFor="scenario" className="text-2xl roboto-600">
              Escenario
            </label>
            <textarea
              className="bg-neutral-800 resize-none rounded-xl px-5 py-2 h-48 mt-5"
              required
              name="scenario"
              id="scenario"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label htmlFor="firstMessage" className="text-2xl roboto-600">
              Primer Mensaje
            </label>
            <textarea
              className="bg-neutral-800 resize-none rounded-xl px-5 py-2 h-48 mt-5"
              required
              name="firstMessage"
              id="firstMessage"
              onChange={handleChange}
            ></textarea>
          </div>
          <button
            type="submit"
            className=" w-5/6 mx-auto hover:from-violet-600 hover:to-fuchsia-600 roboto-500 px-4 py-2  bg-linear-to-r from-violet-500 to-fuchsia-500 rounded-3xl transition-colors ease-in duration-150 text-white mt-20 cursor-pointer nunito-600 text-xl "
          >
            Editar Personaje
          </button>
        </form>
      </div>
    </>
  );
};

export default CharacterEdit;
