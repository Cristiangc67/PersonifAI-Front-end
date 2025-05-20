import axios from "axios";
import React, { useEffect, useState,useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { NavLink, useParams } from "react-router";
import ModalChat from "./ModalChat";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
 

const HistoryChats = ({ userId, chat }) => {
   const { actualUser, isAuthenticated, token } = useContext(AuthContext);
  const characterId = chat.character._id;
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [masks, setMasks] = useState(null);
  const [toggleHistory, setToggleHistory] = useState(false);
 

  const {id} = useParams()
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
  
      setConversations(getConversations.data.data);
    };
    fetchCharacterConversations();
  }, [userId, characterId, id]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const handleDelete = async (idToDelete) => {
    try {
      const response = await axios.delete(`${API_URL}/${idToDelete}`);


   
      setConversations((prevConversations) =>
        prevConversations.filter((conv) => conv._id !== idToDelete)
      );
    } catch (error) {
      console.error("Error deleting conversation:", error);
    }
  };

  useEffect(() => {

    const fetchMasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/api/v1/users/${userId}/masks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMasks(response.data.data.masks);
      } catch (error) {
        console.log(error);
      }
    };

  
    if (isAuthenticated) {
      fetchMasks();
    }
  }, [isAuthenticated, actualUser?.id, token, id]);

  const modalChatOpen = () => setChatModalOpen(true);
  const modalChatClose = () => setChatModalOpen(false);


  return (
    <>
    <button
            onClick={() => setToggleHistory(!toggleHistory)}
            className="absolute  left-5 top-[120px] z-50 hover:bg-neutral-300 rounded-xl transition-colors duration-300 "
          >
            {toggleHistory ? (
              <IoIosArrowForward size={40} className=" text-gray-700" />
            ) : (
              <IoIosArrowBack size={40} className=" text-gray-700" />
            )}
          </button>
    <aside  className={` ${toggleHistory?"w-72 opacity-100":"w-0 overflow-hidden opacity-0"}  border-r border-white/10 space-y-10 transition-all duration-150 pt-4`}>
      <button onClick={()=>modalChatOpen()} className=" text-sm md:text-base w-fit px-3 py-1 justify-center mx-auto flex items-center gap-5 bg-purple-600 hover:bg-purple-700 rounded-lg">
        <FaPlus  className="h-4 w-4 md:h-6 md:w-6 " /> Nuevo Chat
      </button>
      <div className="relative top-10">
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
            <button onClick={()=>handleDelete(conversation._id)} className="opacity-0 group-hover:opacity-100 px-3 rounded-lg hover:bg-red-800 ">
              <FaTrash className="text-gray-400  " />
            </button>
          </NavLink>
        ))}
      </div>{chatModalOpen  && isAuthenticated && masks ? (
        
        <ModalChat
          modalchatClose={modalChatClose}
          masks={masks}
          actualUserId={userId}
          characterId={characterId}
          isFromChat={true}
          token={token}
        />
        
      ) : (
        ""
      )}
    </aside>
    </>
  );
};

export default HistoryChats;
