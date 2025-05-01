import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ChatBar = ({ chat }) => {
  const characterImage = chat.character.characterPicture;
  const characterName = chat.character.nameCharacter;
  const characterScenario = chat.character.scenario;
  const maskName = chat.mask.name;
  const maskDescription = chat.mask.description;
  const [toggleBar, setToggleBar] = useState(false);

  return (
    <>
      <button
        onClick={() => setToggleBar(!toggleBar)}
        className="absolute right-5 top-[120px] z-50 hover:bg-neutral-300 rounded-xl transition-colors duration-300 "
      >
        {toggleBar ? (
          <IoIosArrowBack size={40} className=" text-gray-700" />
        ) : (
          <IoIosArrowForward size={40} className=" text-gray-700" />
        )}
      </button>
      <aside
        className={` h-full ${
          toggleBar ? "w-80 opacity-100" : "w-0 overflow-hidden opacity-0"
        } border-l border-white/10 transition-all duration-150 bg-neutral-900/80  `}
      >
        <div className="space-y-6 text-start px-4 overflow-y-scroll h-full">
          <img
            src={characterImage}
            alt={characterName}
            className="w-full h-72 object-cover "
          />

          <h2 className="text-xl font-semibold text-purple-400 mb-2">
            {characterName}
          </h2>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-2">
              Escenario
            </h3>
            <p className="text-sm text-gray-300">{characterScenario}</p>
          </div>
          <hr />
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-2">
              Mascara
            </h3>
            <p className="font-semibold text-purple-400">{maskName}</p>
            <p className="text-sm text-gray-300 mt-1">{maskDescription}</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ChatBar;
