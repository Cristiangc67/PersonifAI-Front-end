import React from "react";
import Chat from "../components/Chat";
import ChatBar from "../components/ChatBar";
import HistoryChats from "../components/HistoryChats";

const ChatPage = () => {
  return (
    <div className="flex app pt-3">
      <HistoryChats />
      <Chat />
      <ChatBar />
    </div>
  );
};

export default ChatPage;
