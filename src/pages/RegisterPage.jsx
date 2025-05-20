import React, { useRef, useEffect, useState, useContext } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [playingVideo, setPlayingVideo] = useState(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  useEffect(() => {
    const videos = ["1", "2", "3"];
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    setPlayingVideo(randomVideo);
  }, []);

  useEffect(() => {
    if (videoRef.current && playingVideo) {
      videoRef.current.src = `/assets/videos/${playingVideo}.mp4`;
      videoRef.current.play();
    }
  }, [playingVideo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(username, email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="flex app pt-3 justify-center">
      <div className="relative w-full flex justify-center  ">
        {playingVideo && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            className="hidden lg:block h-10/12 rounded-3xl mt-5 shadow-2xl shadow-indigo-700/50 "
          ></video>
        )}
        <div className=" h-fit w-full pb-10 md:w-5/6 lg:w-3/6 absolute top-14 bg-neutral-900 rounded-4xl shadow-2xl">
          <h2 className="text-start px-15 pt-14 roboto-600 text-3xl">
            Registrarse
          </h2>
          <form
            onSubmit={handleSubmit}
            className="px-5 md:px-15 pt-15 flex flex-col gap-10"
          >
            <div className="flex flex-col ">
              <label htmlFor="username" className="text-start nunito-400">
                Nombre de usuario
              </label>
              <input
                required
                type="text"
                id="username"
                className="px-3 bg-neutral-800 rounded-3xl w-full h-10 mt-5"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="email" className="text-start nunito-400">
                Email
              </label>
              <input
                required
                type="text"
                id="email"
                className="px-3 bg-neutral-800 rounded-3xl w-full h-10 mt-5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="password" className="text-start nunito-400">
                Contraseña
              </label>
              <input
                required
                type="password"
                id="password"
                className="px-3 bg-neutral-800 rounded-3xl w-full h-10 mt-5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className=" w-5/6 mx-auto hover:from-violet-600 hover:to-fuchsia-600 roboto-500 px-4 py-2  bg-linear-to-r from-violet-500 to-fuchsia-500 rounded-3xl transition-colors ease-in duration-150 text-white mt-20 cursor-pointer "
            >
              Registrarse
            </button>
          </form>
          <p className="mt-10">
            ¿Ya estas registrado?{" "}
            <Link
              to="/login"
              className="hover:text-violet-600 text-violet-700 cursor-pointer "
            >
              Ingresa
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default RegisterPage;
