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

function MyGames() {
  //routing
  let navigate = useNavigate();

  const handleNewGame = () => {
    if (localStorage.getItem("username")) {
      navigate("/NewGame");
    } else {
      alert("Du må være logget inn for å legge til en ny lek!");
    }
  };

  // const handleVisitGame = () => {
  //   navigate("/VisitGame");
  // };

  const handleClick = () => {
    console.log("Clicked");
    location.href = "/src/";
  };

  const [myGames, setMyGames] = useState([]);

  useEffect(() => {
    // Help from ChatGPT
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "games"),
          where("creatorID", "==", localStorage.getItem("username"))
        );
        const querySnapshot = await getDocs(q);
        const myGamesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMyGames(myGamesData);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Searchbar heading="Mine Leker" />
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
        {myGames.map((game) => (
          <Card
            key={game.id}
            gameId={game.id}
            // imgSrc={game.imgSrc} // disse er ikke lagt til i db - må finne ut om vi vil ha bilder
            // imgAlt={game.imgAlt}  / eller strings som linker til bilde r i filstrukturen
            title={game.title} // burde endres til "title i firebase - holde det consistent med engelsk
            // desc={game.description} // bare ha beskrivelse på lek-side
            creatorID={game.creatorID}
            categories={game.categories}
            minP={game.minNumberOfPeople}
            maxP={game.maxNumberOfPeople}
          />
        ))}
      </div>
      <Button
        onClick={handleNewGame}
        id="newGameButton"
        color="primary"
        variant="contained"
        size="large"
      >
        Ny lek!
      </Button>
    </>
  );
}

export default MyGames;
