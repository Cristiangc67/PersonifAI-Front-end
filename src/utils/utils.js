import axios from "axios";

export const createLlamaChatSession = (characterName, initialHistory = []) => {
  let conversation = [...initialHistory];

  const systemInstruction = `Transcripción textual de una conversación interminable entre el usuario y ${characterName}, cuando relates las acciones de ${characterName} utiliza la tercera persona, para sus diálogos habla en primera persona. Para el diálogo utiliza markdown ejemplo: **"Hola"** y para las acciones y narraciones utiliza markdown ejemplo: *Saluda con una sonrisa*`;


  if (!conversation.some(msg => msg.role === 'system')) {
    conversation.unshift({ role: 'system', content: systemInstruction });
  }

  const sendMessage = async (userMessage) => {
 
    conversation.push({ role: 'user', content: userMessage });
  
    try {
      const res = await axios.post("https://jkf327f0-8080.brs.devtunnels.ms/v1/chat/completions", {
        "model": "L3-8B-Stheno-v3.2-IQ4_XS-imat",
        "messages": conversation,
        "temperature": 0.9,
        "max_tokens": 1000,
        "stop": ["<|im_start|>user"]
      });
  
      const data = res.data;
  

      if (!data || !data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
        console.error("Respuesta inesperada de llama.cpp:", data);
        throw new Error("Respuesta inválida: choices está vacío o no existe.");
      }
  
      let assistantReply = data.choices[0].message?.content ?? "";

      assistantReply = assistantReply.replace(/<\|im_end\|>/g, "").replace(/<\|im_start\|>/g, "").trim()
  
      if (!assistantReply) {
        console.warn("El contenido del mensaje del assistant está vacío o undefined.");
      }

      conversation.push({ role: 'assistant', content: assistantReply });
  
      return assistantReply;
    } catch (error) {
      console.error("Error al enviar mensaje a llama.cpp:", error);
      throw error;
    }
  };
  
  

  return { sendMessage };
};
