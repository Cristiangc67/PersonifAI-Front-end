import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, NavLink, useNavigate } from "react-router";
import Details from "../components/Details";
import { AuthContext } from "../context/AuthContext";
import ModalDelete from "../components/ModalDelete";
import ModalChat from "../components/ModalChat";

const CharacterPage = () => {
  const { actualUser, isAuthenticated, token } = useContext(AuthContext);
  const API_URL = "http://localhost:5500/api/v1/character";
  const [character, setCharacter] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [chatModalOpen, setchatModalOpen] = useState(false);
  const [masks, setMasks] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        //console.log(response.data.data);
        setCharacter(response.data.data);
        console.log("despues de setear per", response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchMasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/api/v1/users/${actualUser.id}/masks`,
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
  }, [isAuthenticated]);

  /* const startOrGetChat = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5500/api/v1/conversations/get-or-create",
        {
          userId: actualUser.id,
          characterId: id,
          provider: "openai", // o el que elijas por defecto
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const conversationId = response.data.data._id;
      navigate(`/chat/${conversationId}`);
    } catch (error) {
      console.error("Error al obtener o crear la conversación:", error);
    }
  }; */

  const deleteCharacter = async () => {
    try {
      console.log(id);
      const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
      navigate("/library");
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const modalchatOpen = () => setchatModalOpen(true);
  const modalchatClose = () => setchatModalOpen(false);

  const modalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="py-10">
      <div className=" w-3/4  max-1280 py-10  mx-auto bg-neutral-900 rounded-2xl">
        {character && character.name && (
          <h2 className="text-2xl roboto-700 tracking-wider block">
            {character.name}
          </h2>
        )}
        <div className="flex w-full gap-20 mt-10 px-10 pb-20">
          {character && character.characterPicture && (
            <div className=" w-2/5 items-center flex flex-col gap-10">
              <img
                src={character.characterPicture}
                className="w-80 h-[30rem] rounded-xl"
                alt=""
              />
              <NavLink
                to={`/user/${character.creator._id}`}
                className="text-white/50"
              >
                Creado por {character.creator.username}
              </NavLink>
              <button
                onClick={modalchatOpen}
                className=" w-4/6 mx-auto hover:from-violet-600 hover:to-fuchsia-600 roboto-500 px-4 py-2  bg-linear-to-r from-violet-500 to-fuchsia-500 rounded-3xl transition-colors ease-in duration-150 text-white  cursor-pointer "
              >
                Conversar
              </button>
            </div>
          )}
          <div className=" w-3/5 flex flex-col gap-10">
            <div>
              <h3 className="text-xl text-start nunito-500">
                Descripcion Del Chat
              </h3>
              {character && character.cardDescription && (
                <p className="text-start mt-5">{character.cardDescription}</p>
              )}
            </div>

            {character ? (
              <div className="flex flex-col gap-10 h-fit">
                <Details
                  characterSection={character.description}
                  characterSectionTitle={"Descripcion del Personaje"}
                />
                <Details
                  characterSection={character.appearance}
                  characterSectionTitle={"Vestimenta y accesorios"}
                />
                <Details
                  characterSection={character.personality}
                  characterSectionTitle={"Personalidad"}
                />
                <Details
                  characterSection={character.scenario}
                  characterSectionTitle={"Escenario"}
                />
                <Details
                  characterSection={character.firstMessage}
                  characterSectionTitle={"Primer mensaje"}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {character &&
          isAuthenticated &&
          actualUser.id == character.creator._id && (
            <div className="flex gap-5 justify-center ">
              <button
                onClick={openModal}
                className="bg-red-700 hover:bg-red-800 transition-colors duration-150 px-5 py-3 rounded-xl cursor-pointer"
              >
                Eliminar personaje
              </button>
              <NavLink
                to={"edit"}
                className="bg-zinc-700 hover:bg-zinc-800 transition-colors duration-150 px-5 py-3 rounded-xl cursor-pointer"
              >
                Editar
              </NavLink>
            </div>
          )}
      </div>
      {modalOpen &&
      character.name &&
      isAuthenticated &&
      actualUser.id == character.creator._id ? (
        <ModalDelete
          name={character.name}
          modalClose={modalClose}
          deleteCharacter={deleteCharacter}
        />
      ) : (
        ""
      )}
      {chatModalOpen && character.name && isAuthenticated && masks ? (
        <ModalChat
          modalchatClose={modalchatClose}
          masks={masks}
          actualUserId={actualUser.id}
          token={token}
          characterId={character._id}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default CharacterPage;
