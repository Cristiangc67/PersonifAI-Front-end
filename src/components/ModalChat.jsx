import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router";
import axios from "axios";

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
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-950/75 backdrop-invert backdrop-opacity-10">
      <div className="bg-neutral-900 p-5 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 roboto-700">
          Proveedor de AI y mascara
        </h2>
        <form className="flex flex-col gap-6">
          <label htmlFor="provider" className="roboto-600">
            Proveedor
          </label>
          <select
            name="provider"
            id="provider"
            className="bg-zinc-600 rounded px-2 py-1"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
          >
            <option className="bg-zinc-500" value="gemini">
              Gemini
            </option>
            <option className="bg-zinc-500" value="openai">
              OpenAI
            </option>
          </select>

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
            <>
              <label htmlFor="mask" className="roboto-600">
                Máscara
              </label>
              <select
                name="mask"
                id="mask"
                className="bg-zinc-600 rounded px-2 py-1"
                value={selectedMask}
                onChange={(e) => setSelectedMask(e.target.value)}
              >
                {masks.map((mask) => (
                  <option
                    key={mask._id}
                    className="bg-zinc-500"
                    value={mask._id}
                  >
                    {mask.name || "Sin nombre"}
                  </option>
                ))}
              </select>
            </>
          )}
        </form>

        <div className="mt-10 flex gap-3">
          <button
            onClick={startOrGetChat}
            className="w-full hover:from-violet-600 hover:to-fuchsia-600 roboto-500 px-4 py-2 bg-linear-to-r from-violet-500 to-fuchsia-500 rounded-lg transition-colors ease-in duration-150 text-white cursor-pointer"
          >
            Conversar
          </button>
          <button
            onClick={modalchatClose}
            className="w-full roboto-500 bg-neutral-700 text-white px-4 py-2 rounded-lg hover:bg-neutral-800 cursor-pointer transition-colors ease-in duration-150"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalChat;
