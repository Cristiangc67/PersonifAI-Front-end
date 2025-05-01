import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { NavLink } from "react-router";

const HistoryChats = ({ userId, chat }) => {
  const characterId = chat.character._id;
  console.log(characterId);
  const [conversations, setConversations] = useState(null);
  const API_URL = "http://localhost:5500/api/v1/conversations";
  useEffect(() => {
    const fetchCharacterConversations = async () => {
      const getConversations = await axios.get(
        `${API_URL}/user-character/${userId}`,
        {
          params: { characterId: characterId },
        }
      );
      console.log("array", getConversations.data);
      setConversations(getConversations.data.data);
    };
    fetchCharacterConversations();
  }, [userId, characterId]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <aside className="w-72 border-r border-white/10 space-y-10  pt-4">
      <button className="w-fit px-3 py-1 justify-center mx-auto flex items-center gap-5 bg-purple-600 hover:bg-purple-700 rounded-lg">
        <FaPlus size={20} /> Nuevo Chat
      </button>
      <div>
        {conversations?.map((conversation) => (
          <NavLink
            key={conversation._id}
            to={`/chat/${conversation._id}`}
            className="w-full flex px-3 justify-between group"
          >
            <div className="flex flex-col items-start">
              <span className="text-sm truncate">
                {chat.character.nameCharacter}
              </span>
              <span className="text-xs text-gray-400">
                {formatDate(conversation.createdAt)}
              </span>
            </div>
            <button className="opacity-0 group-hover:opacity-100 px-3 rounded-lg hover:bg-red-800 ">
              <FaTrash className="text-gray-400  " />
            </button>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default HistoryChats;
