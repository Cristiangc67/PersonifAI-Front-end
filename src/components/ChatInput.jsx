import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdSend } from "react-icons/io";

const ChatInput = ({
  chatSession,
  id,
  setMessages,
  maskName,
  characterName,
  setIsLoading,
  provider
}) => {
  const API_URL = "https://personifai-back-end.onrender.com/api/v1/conversations";
  const [input, setInput] = useState("");

  const interactWithCharacter = async (chatSession, userPrompt) => {
    try {

      const result = await chatSession.sendMessage(userPrompt);
      let textResult = null
     if(provider==="gemini"){
      textResult=result.response.text()  


     }else if(provider==="llama"){
      textResult=result.text
      console.log(textResult)
     }
      
      return  textResult                          //result.response.candidates[0].content.parts[0].text //result.response.text();
    } catch (error) {
      console.error("Error interacting with the API:", error);
      return "Ocurrió un error al obtener la respuesta.";
    }
  };

  const handleSend = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!input.trim() || !chatSession) return;
    try {
      axios.patch(`${API_URL}/${id}`, {
        role: "user",
        text: input,
      });

      setMessages((prev) => [
        ...prev,
        { role: maskName, isUser: true, text: input },
      ]);
      setInput("");
      const response = await interactWithCharacter(chatSession, input);
      axios.patch(`${API_URL}/${id}`, {
        role: "model",
        text: response,
      });
      setMessages((prev) => [
        ...prev,
        { role: characterName, isUser: false, text: response },
      ]);
    } catch (error) {
      console.log(error);
    }finally {
      
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex gap-2 p-4  bg-black/30 border-t border-white/10 backdrop-blur-md"
      onSubmit={handleSend}
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="Escribe tu mensaje..."
      />
      <button
        className=" w-fit h-fit py-3 px-3 rounded-xl bg-purple-600 hover:bg-purple-700"
        type="submit"
      >
        <IoMdSend size={25} />
      </button>
    </form>
  );
};

export default ChatInput;
