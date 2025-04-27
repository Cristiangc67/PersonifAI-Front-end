import React from "react";
import ReactMarkdown from "react-markdown";

const Message = ({ index, msg }) => {
  return (
    <div
      key={index}
      className={`mb-4 px-4 py-5 rounded-2xl w-full  ${
        msg.role === "Dana Scully"
          ? "text-white bg-zinc-700 text-start"
          : "text-violet-400 bg-violet-950/60 text-start"
      }`}
    >
      <strong>{msg.role}:</strong> <ReactMarkdown>{msg.text}</ReactMarkdown>
    </div>
  );
};

export default Message;
