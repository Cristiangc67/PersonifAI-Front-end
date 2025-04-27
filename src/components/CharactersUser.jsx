import React from "react";
import { NavLink } from "react-router";

const CharactersUser = ({ index, id, characterPicture, name }) => {
  return (
    <li key={index} className="border-b w-full h-36 py-2">
      <NavLink
        to={`/character/${id}`}
        className={`flex items-center gap-10 py-2 px-4 hover:bg-neutral-700 rounded-2xl `}
      >
        <img src={characterPicture} className="w-16 rounded-2xl" alt="" />
        <p className="text-lg">{name}</p>
      </NavLink>
    </li>
  );
};

export default CharactersUser;
