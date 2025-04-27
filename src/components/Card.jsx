import React from "react";
import { NavLink } from "react-router";

const Card = ({ id, name, characterPicture, cardDescription, creator }) => {
  console.log("username", creator);
  const newCardDescription =
    cardDescription.length > 391
      ? cardDescription.substring(0, 390).concat("...")
      : cardDescription;

  return (
    <NavLink to={`/character/${id}`} className=" group ">
      <div className=" relative group-hover:rotate-y-180 duration-300 transform-3d  transition-all  backface-hidden  w-64 h-96 rounded-2xl">
        <div className="h-96 absolute ">
          <img
            src={characterPicture}
            alt=""
            className="rounded-2xl z-0 w-full h-full"
          />
          <div className="w-full h-32 bottom-0 rounded-b-2xl  absolute z-10 bg-linear-to-t from-neutral-900 via-neutral-900/90 to-neutral-900/0 pt-10 text-start px-3 ">
            <h3 className=" text-xl">{name}</h3>
            <span className="text-neutral-500">{creator.username}</span>
          </div>
        </div>
        <div className=" h-full absolute w-full bottom-0  rotate-y-180 backface-hidden ">
          <img
            src={characterPicture}
            alt=""
            className="rounded-2xl z-0 w-full h-full -scale-x-100  "
          />
          <div className="absolute py-4 px-3 h-full w-full bg-neutral-900/80 bottom-0 rounded-xl">
            <p className=" text-white/85 h-full overflow-hidden text-start">
              {newCardDescription}
            </p>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default Card;
