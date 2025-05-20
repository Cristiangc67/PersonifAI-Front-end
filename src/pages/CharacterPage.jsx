import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, NavLink, useNavigate } from "react-router";
import Details from "../components/Details";
import { AuthContext } from "../context/AuthContext";
import ModalDelete from "../components/ModalDelete";
import ModalChat from "../components/ModalChat";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { MdOutlineChatBubbleOutline } from "react-icons/md";

const CharacterPage = () => {
  const { actualUser, isAuthenticated, token } = useContext(AuthContext);
  const API_URL = "https://personifai-back-end.onrender.com/api/v1/character";
  const [character, setCharacter] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [characterSections, setCharactersections] = useState([]);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [masks, setMasks] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setCharacter(response.data.data);
 
      } catch (error) {
        console.log(error);
      }
    };

    const fetchMasks = async () => {
      try {
        const response = await axios.get(
          `https://personifai-back-end.onrender.com/api/v1/users/${actualUser.id}/masks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMasks(response.data.data.masks);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCharacterData();
    if (isAuthenticated) {
      fetchMasks();
    }
  }, [isAuthenticated, actualUser?.id, token, id]);

  useEffect(() => {
    if (character) {
      setCharactersections([
        {
          id: "description",
          title: "Descripcion del Personaje",
          content: character.description,
        },
        {
          id: "appearance",
          title: "Vestimenta y Accesorios",
          content: character.appearance,
        },
        {
          id: "personality",
          title: "Personalidad",
          content: character.personality,
        },
        { id: "scenario", title: "Escenario", content: character.scenario },
        {
          id: "firstmessage",
          title: "Primer Mensaje",
          content: character.firstMessage,
        },
      ]);
    }
  }, [character]);

  const openModal = () => {
    setModalOpen(true);
  };

  const modalChatOpen = () => setChatModalOpen(true);
  const modalChatClose = () => setChatModalOpen(false);

  const modalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900/20">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 shadow-lg shadow-purple-500/10 max-w-4xl mx-auto"
        >
          <div className="flex flex-col items-center md:flex-row md:items-start gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative w-full max-w-sm"
            >
              <div className="absolute -inset-1 h-[85%] rounded-xl bg-gradient-to-r from-purple-600 to-blue-400 opacity-50 blur-sm"></div>
              {character && character.characterPicture && (
                <>
                  <img
                    src={character.characterPicture}
                    className="relative rounded-xl w-full object-cover shadow-lg z-10"
                    alt={character.name}
                  />

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="mt-6"
                  >
                    <NavLink
                      to={`/user/${character.creator._id}`}
                      className="mt-3 text-center text-sm text-gray-400 relative z-10"
                    >
                      Creado por {character.creator.username}
                    </NavLink>
                    <button
                      onClick={modalChatOpen}
                      className="w-full flex items-center justify-center relative rounded-lg z-10 mt-5 bg-purple-600 hover:bg-purple-700 text-white text-lg py-3 shadow-lg shadow-purple-700/30"
                    >
                      <MdOutlineChatBubbleOutline />
                      <span className="ml-2">Conversar</span>
                    </button>
                  </motion.div>
                </>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex-1 w-full"
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {character?.name}
              </h1>
              <p className="text-lg text-gray-300 text-start mb-6">
                {character?.cardDescription}
              </p>

              <div className="w-full flex flex-col gap-10">
                {characterSections.length > 0 && (
                  <div className="space-y-3">
                    {characterSections.map((section) => (
                      <Details
                        key={section.id}
                        title={section.title}
                        content={section.content}
                      />
                    ))}
                  </div>
                )}
              </div>
              {character &&
                isAuthenticated &&
                actualUser.id === character.creator._id && (
                  <div className="mt-8 flex flex-wrap gap-4">
                    <button
                      onClick={openModal}
                      className="shadow-lg flex items-center shadow-red-900/80 cursor-pointer bg-red-800 hover:bg-red-700 px-4 py-2 rounded-lg"
                    >
                      <FaTrash />
                      <span className="ml-2">Eliminar personaje</span>
                    </button>
                    <NavLink
                      to={"edit"}
                      className="border-purple-500 border flex px-4 py-2 rounded-lg items-center text-purple-400 hover:bg-purple-500/30"
                    >
                      <FaPencil />
                      <span className="ml-2">Editar</span>
                    </NavLink>
                  </div>
                )}
            </motion.div>
          </div>
        </motion.div>
      </main>

      {modalOpen &&
      id &&
      character.name &&
      isAuthenticated &&
      actualUser.id === character.creator._id ? (
        <ModalDelete
          name={character.name}
          modalClose={modalClose}
          id={id}
          token={token}
        />
      ) : (
        ""
      )}
      <AnimatePresence>
      {chatModalOpen && character.name && isAuthenticated && masks ? (
        
        <ModalChat
          modalchatClose={modalChatClose}
          masks={masks}
          actualUserId={actualUser.id}
          token={token}
          characterId={character._id}
          isFromChat={false}
        />
        
      ) : (
        ""
      )}
      </AnimatePresence>
    </div>
  );
};

export default CharacterPage;
