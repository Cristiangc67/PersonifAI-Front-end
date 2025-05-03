import React from "react";
import { NavLink } from "react-router";
import {motion} from "framer-motion"

const ModalFollower = ({ modalType, closeModal, userProfile }) => {
  console.log(userProfile.followers[0]);
  return (
    <motion.div
            className="fixed z-50 inset-0 flex items-center justify-center bg-neutral-950/75 backdrop-invert backdrop-opacity-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, y:20 }}>
      <div className="bg-black/80 border flex flex-col justify-between border-purple-500/20 backdrop-blur-lg text-white w-full max-h-2/4 max-w-md px-6 py-10 rounded-xl">
        <h2 className="text-xl font-bold mb-4">
          {modalType === "followers" ? "Seguidores" : "Siguiendo"}
        </h2>
        <ul className=" overflow-y-scroll">
          {(modalType === "followers"
            ? userProfile.followers
            : userProfile.following
          ).map((user, index) => (
            <li key={index} className="border-b py-2">
              <NavLink
                to={`/user/${user._id}`}
                onClick={closeModal}
                className={`flex items-center gap-10 py-2 px-4 hover:bg-neutral-700 rounded-2xl `}
              >
                <img
                  src={user.profilePicture}
                  className="w-16 rounded-full"
                  alt=""
                />
                <p className="text-lg">{user.username}</p>
              </NavLink>
            </li>
          ))}
        </ul>
        <button
          onClick={closeModal}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Cerrar
        </button>
      </div>
    </motion.div>
  );
};

export default ModalFollower;
