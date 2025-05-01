import React from "react";
import { NavLink } from "react-router";
import { motion } from "framer-motion";

const CharactersUser = ({ index, id, characterPicture, name }) => {
  return (
    <div
      key={index}
      className="rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 overflow-hidden hover:border-purple-500/30 transition-all hover:shadow-md hover:shadow-purple-500/10"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 * index + 0.8 }}
        className="flex items-center gap-4 p-4"
      >
        <div className="w-16  rounded-md overflow-hidden bg-gradient-to-br from-purple-500/20 to-purple-800/20">
          <img
            src={characterPicture}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <h3 className="font-medium text-white">{name}</h3>
          <NavLink
            to={`/character/${id}`}
            className="py-2 px-4 hover:bg-white/80 h-8 text-xs rounded-lg bg-white mx-10 text-black mt-2"
          >
            Ver
          </NavLink>
        </div>
      </motion.div>
    </div>
  );
};

export default CharactersUser;
