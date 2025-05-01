import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useParams, useNavigate, data } from "react-router";
import Navbar from "../components/Navbar";

const UserEdit = () => {
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
        console.log(res.data.data);
        console.log("edit", actualUser);

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
        console.log("Contenido del FormData:");
        for (const [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }
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
    <>
      <Navbar />
      <div className="max-1280 bg-neutral-900 mx-auto mt-10 py-10 rounded-2xl">
        <h2 className="text-3xl roboto-700">Editar Usuario</h2>
        <form
          action=""
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="px-36 py-14 flex flex-col gap-10 text-start"
        >
          <label className=" w-fit text-2xl roboto-600" htmlFor="inputFile">
            Imagen del usuario
          </label>

          {isAuthenticated && (image || previewUrl) ? (
            <img
              className="h-[500px] w-[500px] contain-content object-cover rounded-2xl "
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
            name="profilePicture"
            accept="image/*"
            onChange={handleFileChange}
            id="inputFile"
          />
          <div className="flex flex-col">
            <label htmlFor="name" className="text-2xl roboto-600">
              Nombre de Usuario
            </label>
            <input
              className="bg-neutral-800 rounded-xl px-5 py-2 mt-5"
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
            <label className=" text-2xl roboto-600" htmlFor="description">
              Email
            </label>
            <input
              className="bg-neutral-800 rounded-xl px-5 py-2 mt-5"
              required
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              value={form.email}
            />
          </div>

          <button
            type="submit"
            className=" w-5/6 mx-auto hover:from-violet-600 hover:to-fuchsia-600 roboto-500 px-4 py-2  bg-linear-to-r from-violet-500 to-fuchsia-500 rounded-3xl transition-colors ease-in duration-150 text-white mt-20 cursor-pointer nunito-600 text-xl "
          >
            Guardar
          </button>
        </form>
      </div>
    </>
  );
};

export default UserEdit;
