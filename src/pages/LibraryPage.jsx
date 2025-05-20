import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import Navbar from "../components/Navbar";
import {motion} from "framer-motion"

const LibraryPage = () => {
  const [cards, setCards] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const API_URL = "https://personifai-back-end.onrender.com/api/v1/character";

  useEffect(() => {
    try {
      
      const fetchCards = async () => {
        
        const response = await axios.get(`${API_URL}/`);
 
        setCards(response.data.data);
      };
      setIsLoading(true)
      fetchCards();
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false)
    }
  }, [cards]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12 justify-center flex">
        {isLoading ?<div className="mx-auto loader"></div>:
        <div className="grid gap-3 lg:gap-5 md:gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {cards &&
          cards.map((card, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                
                className="h-full w-fit"
              >
            <Card
              key={index}
              id={card._id}
              name={card.name}
              characterPicture={card.characterPicture}
              cardDescription={card.cardDescription}
              creator={card.creator}
            />
            </motion.div>
          ))}
          </div>}
      </div>
    </>
  );
};

export default LibraryPage;
