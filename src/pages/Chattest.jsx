import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Chattest = () => {
  const { actualUser, isAuthenticated, token } = useContext(AuthContext);
  const { id } = useParams();
  const [chat, setChat] = useState(null);
  const API_URL = "http://localhost:5500/api/v1/conversations";
  useEffect(() => {
    const fetchConversationData = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
  
        setChat(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchConversationData();
  }, [id, token]);

  return (
    <div>
      <p>
        {chat?.conversation.mask.name}-{}-{chat?.conversation._id}
      </p>
    </div>
  );
};

export default Chattest;
