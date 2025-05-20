import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatInput from "./ChatInput";
import Message from "./Message";
import { createLlamaChatSession } from "../utils/utils.js";


const Chat = ({ chat, id }) => {
  const maskName = chat.mask.name;
  const characterName = chat.character.nameCharacter;
  const [chatSession, setChatSession] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const [apiKeyError, setApiKeyError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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


  const assembleHistory = (chat.messages || []).map((message) => ({
    role: message.role,
    parts: [{ text: message.parts[0].text }],
  }));

  const assemblechat = (chat.messages || []).map((message) => ({
    role: message.role === "model" ? characterName : maskName,
    isUser: message.role === "model" ? false : true,
    text: message.parts[0].text,
  }));
  assemblechat.shift();

  const [messages, setMessages] = useState(assemblechat);


  const createGeminiChatSession = (apiKey) => {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: `Transcripción textual de una conversación interminable entre el usuario y ${characterName}, cuando relates las acciones de ${characterName} utiliza la tercera persona, para sus diálogos habla en primera persona. Para el diálogo utiliza markdown ejemplo: **"Hola"** y para las acciones y narraciones utiliza markdown ejemplo: *Saluda con una sonrisa*`,
    });

    return model.startChat({
      history: assembleHistory,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.9,
      },
    });
  };


  const createLlamaChatSessionWrapper = () => {
    const llamaHistory = assembleHistory.map((m) => ({
      role: m.role,
      content: m.parts[0].text,
    }));

    return createLlamaChatSession(characterName, llamaHistory);
  };


  const initializeChatSession = async () => {
    if (chat.provider === "gemini") {
      if (apiKey) {
        const isValid = await validateApiKey(apiKey);
        if (isValid) {
          setApiKeyError("");
          const newChatSession = createGeminiChatSession(apiKey);
          setChatSession(newChatSession);
        } else {
          setApiKeyError("Clave de API inválida");
          setChatSession(null);
        }
      } else {
        setChatSession(null);
      }
    } else if (chat.provider === "llama") {
      const newChatSession = createLlamaChatSessionWrapper();
      setChatSession(newChatSession);
    }
  };

  useEffect(() => {
    initializeChatSession();

    return () => {
      setChatSession(null);
    };
  }, [apiKey, chat.provider]);

  const handleApiKeyChange = (e) => {
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
      {chat.provider === "gemini" && (
        <div className="flex items-center gap-2 justify-center">
          <label htmlFor="api" className="me-3 font-semibold text-gray-400">
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
      )}

      <div className="h-[86.8%] bg-neutral-900 pt-10 px-2 md:px-20 lg:px-30 overflow-y-scroll">
        {messages.map((msg, index) => (
          <Message key={index} msg={msg} />
        ))}
        {isLoading && (
          <div

            className="mb-4 px-4 py-5 rounded-2xl animate-pulse  max-w-3xl mr-auto"
          >
            <div
              className="flex flex-col items-start"
            >
              <span
                className="text-sm text-gray-400 mb-1"
              >
                {characterName}:
              </span>
              <div
                className="rounded-2xl w-3xl h-40 p-4 bg-black/20 backdrop-blur-sm border border-white/10"

              >
                <div className="text-gray-200 whitespace-pre-wrap text-start">
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        chatSession={chatSession}
        id={id}
        setMessages={setMessages}
        maskName={maskName}
        characterName={characterName}
        setIsLoading={setIsLoading}
        provider={chat.provider}
      />
    </div>
  );
};

export default Chat;