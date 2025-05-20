import React from "react";
import ReactMarkdown from "react-markdown";

const Message = ({  msg }) => {
  return (
    <div
      
      className={`mb-4 px-4 py-5 rounded-2xl  max-w-3xl  ${
        msg.isUser ? "ml-auto" : "mr-auto"
      }`}
    >
      <div
        className={`flex flex-col ${msg.isUser ? "items-end" : "items-start"}`}
      >
        <span
          className={`text-sm ${
            msg.isUser ? "text-purple-400" : "text-gray-400"
          } mb-1`}
        >
          {msg.role}:
        </span>
        <div
          className={`rounded-2xl p-4 ${
            msg.isUser
              ? "bg-purple-600/20 backdrop-blur-sm border border-purple-500/20"
              : "bg-black/20 backdrop-blur-sm border border-white/10"
          }`}
        >
          <div className="text-gray-200 whitespace-pre-wrap text-start">
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
