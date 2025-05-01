import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import Navbar from "../components/Navbar";

const LibraryPage = () => {
  const [cards, setCards] = useState(null);
  const API_URL = "http://localhost:5500/api/v1/character";

  useEffect(() => {
    try {
      const fetchCards = async () => {
        const response = await axios.get(`${API_URL}/`);
        console.log("****************************");
        console.log(response.data.data);
        setCards(response.data.data);
      };
      fetchCards();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-1280  flex gap-6 flex-wrap mx-auto justify-center pt-15 mb-5">
        {cards &&
          cards.map((card, index) => (
            <Card
              key={index}
              id={card._id}
              name={card.name}
              characterPicture={card.characterPicture}
              cardDescription={card.cardDescription}
              creator={card.creator}
            />
          ))}
      </div>
    </>
  );
};

export default LibraryPage;
