import React, { useEffect, useState, useContext } from "react";
import Chat from "../components/Chat";
import ChatBar from "../components/ChatBar";
import HistoryChats from "../components/HistoryChats";
import axios from "axios";
import { useParams, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const ChatPage = () => {
  const { actualUser, isAuthenticated, token } = useContext(AuthContext);
  const { id } = useParams();
  const [chat, setChat] = useState(null);
  const API_URL = "http://localhost:5500/api/v1/conversations";
  useEffect(() => {
    const fetchConversationData = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        console.log(response.data.data);
        setChat(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchConversationData();
  }, [id, token]);

  return (
    <div className="flex app pt-3">
      <HistoryChats />
      {chat ? <Chat chat={chat} id={id} /> : ""}
      <ChatBar />
    </div>
  );
};

export default ChatPage;
