import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router";
import axios from "axios";
import {motion} from "framer-motion"

const ModalChat = ({
  modalchatClose,
  masks,
  actualUserId,
  characterId,
  token,
}) => {
  const [provider, setProvider] = useState("gemini");
  const [selectedMask, setSelectedMask] = useState(masks[0]?._id || "");
  const navigate = useNavigate();

  const startOrGetChat = async () => {
    try {
      console.log(token);
      const response = await axios.post(
        "http://localhost:5500/api/v1/conversations/get-or-create",
        {
          userId: actualUserId,
          characterId,
          provider,
          mask: selectedMask,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const conversationId = response.data.data.conversation._id;

      navigate(`/chat/${conversationId}`);
    } catch (error) {
      console.error("Error al iniciar el chat:", error);
    }
  };

  return (
    <motion.div
            className="fixed inset-0 flex items-center justify-center bg-neutral-950/75 backdrop-invert backdrop-opacity-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, y:20 }}>
      <div className="bg-black/80 border border-purple-500/20 backdrop-blur-lg text-white w-full max-w-md px-6 py-10 rounded-xl">
        <h2 className="text-xl font-bold mb-12 roboto-700 text-start">
          Proveedor de AI y mascara
        </h2>
        <form className="flex flex-col gap-8">
          <div className="space-y-2 flex flex-col">
          <label htmlFor="provider" className="roboto-600 text-start">
            Proveedor
          </label>
          <select
            name="provider"
            id="provider"
            className="px-3 py-3 rounded-xl w-full bg-black/40 border border-white/10 text-white"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
          >
            <option className="bg-black/90 border border-white/10 text-white" value="gemini">
              Gemini
            </option>
            <option className="bg-black/90 border border-white/10 text-white" value="openai">
              OpenAI
            </option>
          </select>
          </div>

          {masks.length === 0 ? (
            <div className="nunito-500">
              <span>Sin máscaras aún </span>
              <NavLink
                to={`/user/${actualUserId}/masks`}
                className="text-violet-600 hover:text-violet-500"
              >
                A máscaras
              </NavLink>
            </div>
          ) : (
            <div className="space-y-2 flex flex-col">
              <label htmlFor="mask" className="roboto-600 text-start">
                Máscara
              </label>
              <select
                name="mask"
                id="mask"
                className="px-3 py-3 rounded-xl w-full bg-black/40 border border-white/10 text-white "
                value={selectedMask}
                onChange={(e) => setSelectedMask(e.target.value)}
              >
                {masks.map((mask) => (
                  <option
                    key={mask._id}
                    className="bg-black/90 border border-white/10 text-white "
                    value={mask._id}
                  >
                    {mask.name || "Sin nombre"}
                  </option>
                ))}
              </select>
            </div>
          )}
        </form>

        <div className="mt-10 flex justify-end gap-5">
          <button
            onClick={modalchatClose}
            className="px-4 py-2 border text-lg font-semibold rounded-lg hover:bg-purple-700/20 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={startOrGetChat}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 font-semibold text-white text-lg  rounded-lg shadow-lg shadow-purple-700/30  cursor-pointer"
          >
            Conversar
          </button>
        </div>
      </div>
    
    </motion.div>
  );
};

export default ModalChat;
