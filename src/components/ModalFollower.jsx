import React from "react";
import { NavLink } from "react-router";

const ModalFollower = ({ modalType, closeModal, userProfile }) => {
  console.log(userProfile.followers[0]);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-950/75 backdrop-invert backdrop-opacity-10 ">
      <div className="bg-neutral-900 p-5 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">
          {modalType === "followers" ? "Seguidores" : "Siguiendo"}
        </h2>
        <ul className="">
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
    </div>
  );
};

export default ModalFollower;
