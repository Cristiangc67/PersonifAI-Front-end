import { React, useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useParams, NavLink } from "react-router";
import axios from "axios";
import ModalFollower from "../components/ModalFollower.jsx";
import CharactersUser from "../components/CharactersUser.jsx";

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
    <div className="py-10">
      <div className="flex justify-center items-center flex-col w-3/4 app max-1280 pt-10 h-fit  mx-auto bg-neutral-900 rounded-2xl">
        <div className="flex flex-col items-center mb-10">
          {userProfile && userProfile.profilePicture && (
            <img
              src={
                userProfile.profilePicture != null
                  ? `${userProfile.profilePicture}`
                  : ""
              }
              className=" w-36 h-36 rounded-full"
              alt=""
            />
          )}
          {userProfile && userProfile.username && (
            <h2 className="text-2xl mt-5">{userProfile.username}</h2>
          )}
          {userProfile && userProfile.username && (
            <div>
              <button
                onClick={() => openModal("followers")}
                className="text-lg text-neutral-400 cursor-pointer mt-5"
              >
                {userProfile.followers.length} seguidores
              </button>
              <span> - </span>
              <button
                onClick={() => openModal("following")}
                className="text-lg text-neutral-400 cursor-pointer mt-5"
              >
                {userProfile.following.length} siguiendo
              </button>
            </div>
          )}
          {userProfile &&
            userProfile._id &&
            (userProfile._id != actualUser.id ? (
              userProfile.followers.some(
                (follower) => follower._id === actualUser.id
              ) ? (
                <button
                  onClick={togglefollow}
                  className="mt-4 bg-neutral-100 text-black px-5 py-2 rounded-3xl hover:bg-neutral-300 transition-all duration-150 "
                >
                  Dejar de Seguir
                </button>
              ) : (
                <button
                  onClick={togglefollow}
                  className="mt-4 bg-neutral-100 text-black px-5 py-2 rounded-3xl hover:bg-neutral-300 transition-all duration-150 "
                >
                  Seguir
                </button>
              )
            ) : (
              ""
            ))}
        </div>
        {modalOpen && userProfile && (
          <ModalFollower
            modalType={modalType}
            closeModal={closeModal}
            userProfile={userProfile}
          />
        )}
        <ul className=" w-full px-28 h-96 overflow-y-scroll">
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
        </ul>
        {actualUser && actualUser.id == id ? (
          <NavLink
            to={"edit"}
            className="bg-zinc-700 hover:bg-zinc-800 transition-colors duration-150 px-5 py-3 rounded-xl cursor-pointer"
          >
            Editar
          </NavLink>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
