import { React, useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useParams, NavLink } from "react-router";
import axios from "axios";
import ModalFollower from "../components/ModalFollower.jsx";
import CharactersUser from "../components/CharactersUser.jsx";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { FaPencil } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa";

const ProfilePage = () => {
  const { isAuthenticated, logout, actualUser, token } =
    useContext(AuthContext);
  const API_URL = "http://localhost:5500/api/v1/users";
  const [userProfile, setUserProfile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const { id } = useParams();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.data);
        setUserProfile(response.data.data);
        console.log("userProfile", userProfile);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserProfile();
  }, [id]);

  const togglefollow = async () => {
    try {
      const follower = actualUser.id;
      const usuario = id;
      console.log("follower" + actualUser.id);
      console.log("usuario a seguir" + id);

      const response = await axios.post(
        `${API_URL}/${id}/follow`,
        {
          follower,
          usuario,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setUserProfile((prevProfile) => {
          const isFollowing = prevProfile.followers.some(
            (f) => f._id === actualUser.id
          );

          const updatedFollowers = isFollowing
            ? prevProfile.followers.filter((f) => f._id !== actualUser.id)
            : [...prevProfile.followers, { _id: actualUser.id }];

          return {
            ...prevProfile,
            followers: updatedFollowers,
          };
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900/20">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col items-center mb-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mb-6"
          >
            {userProfile && userProfile.profilePicture && (
              <img
                src={
                  userProfile.profilePicture != null
                    ? `${userProfile.profilePicture}`
                    : ""
                }
                className="w-32 h-32 border-4 border-purple-500/30 rounded-full shadow-lg shadow-purple-500/20"
                alt=""
              />
            )}

            {/* <div className="absolute -bottom-2 -right-2">
              <NavLink className="rounded-full flex items-center bg-black border border-white/20 hover:bg-purple-900/20">
                <FaPencil />
                <span>Editar Perfil</span>
              </NavLink>
            </div> */}
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
          >
            {userProfile && userProfile.username && (
              <h1 className="text-2xl mt-5">
                {userProfile.username.charAt(0).toUpperCase() +
                  userProfile.username.slice(1)}
              </h1>
            )}
          </motion.h1>

          {userProfile && userProfile.username && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-6 mt-4"
            >
              <button
                onClick={() => openModal("followers")}
                className=" flex flex-col cursor-pointer mt-5"
              >
                <span className=" text-xl font-bold">
                  {userProfile.followers.length}
                </span>
                <span className="text-sm text-gray-400">seguidores</span>
              </button>
              <div className=" h-10 w-px bg-white/10"></div>
              <button
                onClick={() => openModal("following")}
                className="flex flex-col  cursor-pointer mt-5"
              >
                <span className="text-xl font-bold">
                  {userProfile.following.length}
                </span>
                <span className="text-sm text-gray-400">siguiendo</span>
              </button>
            </motion.div>
          )}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 flex gap-4"
          >
            {userProfile &&
              userProfile._id &&
              (userProfile._id != actualUser.id ? (
                userProfile.followers.some(
                  (follower) => follower._id === actualUser.id
                ) ? (
                  <button
                    onClick={togglefollow}
                    className="mt-4 bg-white text-black px-5 py-2 rounded-lg hover:bg-white/40 transition-all duration-150  cursor-pointer"
                  >
                    Dejar de Seguir
                  </button>
                ) : (
                  <button
                    onClick={togglefollow}
                    className="mt-4 flex items-center gap-2 bg-white text-black px-5 py-2 rounded-lg hover:bg-white/40 transition-all duration-150 cursor-pointer "
                  >
                    <FaUserPlus />
                    <span>Seguir</span>
                  </button>
                )
              ) : (
                ""
              ))}
            {actualUser && actualUser.id == id ? (
              <NavLink
                to={"edit"}
                className="rounded-lg flex items-center px-5 py-2 bg-black border border-white/20 hover:bg-purple-900/20 cursor-pointer"
              >
                <FaPencil />
                <span className="ml-2">Editar Perfil</span>
              </NavLink>
            ) : (
              ""
            )}
          </motion.div>

          <AnimatePresence>

          {modalOpen && userProfile && (
            <ModalFollower
              modalType={modalType}
              closeModal={closeModal}
              userProfile={userProfile}
            />
          )}
          </AnimatePresence>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-5 "
          >
            <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-2 text-start">
              Mis Personajes
            </h2>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userProfile
                ? userProfile.createdCharacters.map((character, index) => {
                    return (
                      <CharactersUser
                        index={index}
                        id={character._id}
                        characterPicture={character.characterPicture}
                        name={character.name}
                      />
                    );
                  })
                : "NO hay nada"}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
