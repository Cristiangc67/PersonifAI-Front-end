import React, { useEffect, useState, useContext } from "react";
import Chat from "../components/Chat";
import ChatBar from "../components/ChatBar";
import HistoryChats from "../components/HistoryChats";
import axios from "axios";
import { useParams, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const ChatPage = () => {
  const { actualUser, isAuthenticated, token } = useContext(AuthContext);
  const { id } = useParams();
  const [chat, setChat] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = "http://localhost:5500/api/v1/conversations";
  useEffect(() => {
    const fetchConversationData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_URL}/${id}`);

        setChat(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchConversationData();
  }, [id, token]);

  return (
    <>
      <Navbar />
      <div className="flex app pt-3 overflow-x-hidden">
        {actualUser && chat ? (
          <HistoryChats userId={actualUser.id}  chat={chat} />
        ) : (
          ""
        )}
        {isLoading ? (
    <div className="w-full h-full bg-neutral-900 mx-auto  overflow-x-hidden animate-pulse"></div>
  ) : (
    <>
      {chat && <Chat  chat={chat} id={id} />}
      {chat && <ChatBar  chat={chat} />}
    </>
  )}
      </div>
    </>
  );
};

export default ChatPage;
