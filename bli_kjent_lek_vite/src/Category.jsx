import "./style/App.css";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
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

  const handleClick = () => {
    console.log("Clicked");
    location.href = "/src/";
  };

  const [games, setGames] = useState([]);

  useEffect(() => {
    // Help from ChatGPT
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "games"),
          where("Category", "==", "ute")
        );
        const querySnapshot = await getDocs(q);
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
      <h2>{Category}</h2>
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
            // imgSrc={game.imgSrc} // disse er ikke lagt til i db - må finne ut om vi vil ha bilder
            // imgAlt={game.imgAlt}  / eller strings som linker til bilder i filstrukturen
            title={game.Tittel} // burde endres til "title i firebase - holde det consistent med engelsk
            desc={game.description} // burde kanskje ha en kortere beskrivelse til kortene?
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
