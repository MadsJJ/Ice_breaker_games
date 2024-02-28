import "./style/App.css";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import GameCarousel from "./components/GameCarousel";
import { Card } from "./components/Card";
import { db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
//routing
import React from "react";
import { useNavigate } from "react-router-dom";

function App() {
  //routing
  let navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/NewGame");
  };

  const handleVisitGame = () => {
    navigate("/VisitGame");
  };

  const handleClick = () => {
    console.log("Clicked");
    location.href = "/src/";
  };

  const [games, setGames] = useState([]);

  useEffect(() => {
    // Help from ChatGPT
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "games"));
        const gamesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGames(gamesData);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Searchbar />
      {/* <GameCarousel /> */}
      <br />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          margin: "auto",
          width: "90vw",
        }}
      >
        {/* Help from ChatGPT */}
        {games.map((game) => (
          <Card
            key={game.id}
            gameId={game.id}
            // imgSrc={game.imgSrc} // disse er ikke lagt til i db - må finne ut om vi vil ha bilder
            // imgAlt={game.imgAlt}  / eller strings som linker til bilde r i filstrukturen
            title={game.title} // burde endres til "title i firebase - holde det consistent med engelsk
            // desc={game.description} // bare ha beskrivelse på lek-side
            categories={game.categories}
            minP={game.minNumberOfPeople}
            maxP={game.maxNumberOfPeople}
          />
        ))}
      </div>
      <Button
        onClick={handleNavigate}
        id="newGameButton"
        color="primary"
        variant="contained"
        size="large"
      >
        New Game
      </Button>
    </>
  );
}

export default App;
