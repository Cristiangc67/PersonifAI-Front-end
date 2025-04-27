import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import Message from "./Message";
import axios from "axios";

const Chat = ({ chat, id }) => {
  const API_URL = "http://localhost:5500/api/v1/conversations";
  const maskName = chat.mask.name;
  const characterName = chat.character.nameCharacter;

  const [input, setInput] = useState("");
  const [chatSession, setChatSession] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const [apiKeyError, setApiKeyError] = useState("");

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

  const interactWithCharacter = async (chatSession, userPrompt) => {
    try {
      const result = await chatSession.sendMessage(userPrompt);
      console.log(chatSession);
      return result.response.text();
    } catch (error) {
      console.error("Error interacting with the API:", error);
      return "Ocurrió un error al obtener la respuesta.";
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !chatSession) return;
    try {
      axios.patch(`${API_URL}/${id}`, {
        role: "user",
        text: input,
      });

      setMessages((prev) => [...prev, { role: maskName, text: input }]);
      setInput("");
      const response = await interactWithCharacter(chatSession, input);
      axios.patch(`${API_URL}/${id}`, {
        role: "model",
        text: response,
      });
      setMessages((prev) => [...prev, { role: characterName, text: response }]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full bg-neutral-900 mx-auto">
      <span>API KEY</span>
      <input
        type="password"
        value={apiKey}
        onChange={handleApiKeyChange}
        placeholder="Ingresa tu API Key"
      />
      {apiKeyError && <p className="text-red-500">{apiKeyError}</p>}
      <div className="h-11/12 bg-neutral-900 pt-10 px-30 overflow-y-scroll">
        {messages.map((msg, index) => (
          <Message key={index} index={index} msg={msg} />
        ))}
      </div>
      <form
        className="w-full h-1/12 flex justify-center gap-4"
        onSubmit={handleSend}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-1/2 h-10 rounded-3xl border border-gray-500 px-4 bg-neutral-700 focus:outline-0"
          placeholder="Escribe tu mensaje..."
        />
        <button
          className="bg-white hover:bg-neutral-300 h-10 rounded-full cursor-pointer"
          type="submit"
        >
          <img
            src="src/assets/send.svg"
            className="h-10 p-1 pointer-events-none"
            alt="Enviar"
          />
        </button>
      </form>
    </div>
  );
};

export default Chat;
