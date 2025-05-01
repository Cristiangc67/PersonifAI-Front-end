import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatInput from "./ChatInput";
import Message from "./Message";

const Chat = ({ chat, id }) => {
  const maskName = chat.mask.name;
  const characterName = chat.character.nameCharacter;
  const [chatSession, setChatSession] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const [apiKeyError, setApiKeyError] = useState("");

  const messagesEndRef = useRef(null);

  const validateApiKey = async (key) => {
    try {
      const genAI = new GoogleGenerativeAI(key);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      await model.generateContent("Prueba");
      return true;
    } catch (error) {
      console.error("Clave inválida:", error);
      return false;
    }
  };

  let assembleHistory = chat.messages.map((message) => ({
    role: message.role,
    parts: [{ text: message.parts[0].text }],
  }));

  let assemblechat = chat.messages.map((message) => ({
    role: message.role === "model" ? characterName : maskName,
    isUser: message.role === "model" ? false : true,
    text: message.parts[0].text,
  }));
  assemblechat.shift();

  const [messages, setMessages] = useState(assemblechat);
  console.log(assembleHistory);

  const createChatSession = (genAI) => {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: `Transcripción textual de una conversación interminable entre el usuario y ${characterName}, cuando relates las acciones de ${characterName} utiliza la tercera persona, para sus diálogos habla en primera persona. Para el diálogo utiliza markdown ejemplo: **"Hola"** y para las acciones y narraciones  utiliza markdown ejemplo: *Saluda con una sonrisa*`,
    });
    return model.startChat({
      history: assembleHistory,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.9,
      },
    });
  };

  useEffect(() => {
    let genAI;
    const initializeChatSession = async () => {
      if (apiKey) {
        const isValid = await validateApiKey(apiKey);
        if (isValid) {
          setApiKeyError("");
          genAI = new GoogleGenerativeAI(apiKey);
          const newChatSession = createChatSession(genAI);
          setChatSession(newChatSession);
        } else {
          setApiKeyError("Clave de API inválida");
          setChatSession(null);
        }
      } else {
        setChatSession(null);
      }
    };

    initializeChatSession();

    return () => {
      setChatSession(null);
    };
  }, [apiKey]);

  const handleApiKeyChange = async (e) => {
    const newKey = e.target.value;
    setApiKey(newKey);
  };
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="w-full h-full bg-neutral-900 mx-auto  overflow-x-hidden">
      <div className="flex items-center gap-2 justify-center">
        <label for="api" className="me-3 font-semibold text-gray-400">
          {`API KEY ${chat.provider.toUpperCase()}`}
        </label>
        <input
          id="api"
          type="password"
          value={apiKey}
          className="bg-white/5 mt-1 border border-white/10 rounded-lg px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={handleApiKeyChange}
          placeholder="Ingresa tu API Key"
        />
        {apiKeyError && <p className="text-red-500">{apiKeyError}</p>}
      </div>
      <div className=" h-[86.8%] bg-neutral-900 pt-10 px-30 overflow-y-scroll">
        {messages.map((msg, index) => (
          <Message key={index} index={index} msg={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        chatSession={chatSession}
        id={id}
        setMessages={setMessages}
        maskName={maskName}
        characterName={characterName}
      />
    </div>
  );
};

export default Chat;
