import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";
import "./style/NewGame.css";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  setDoc,
} from "firebase/firestore";

function NewGame() {
  const [gameData, setGameData] = useState({
    title: "",
    description: "",
    minNumberOfPeople: "",
    maxNumberOfPeople: "",
    creatorID: localStorage.getItem("userID"),
    categories: [], // Change categories to an array
  });

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  const handleChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      // If checkbox is checked, add category to the array
      setGameData((prevGameData) => ({
        ...prevGameData,
        categories: [...prevGameData.categories, name],
      }));
    } else {
      // If checkbox is unchecked, remove category from the array
      setGameData((prevGameData) => ({
        ...prevGameData,
        categories: prevGameData.categories.filter((cat) => cat !== name),
      }));
    }
  };

  const handleCreateGame = async (event) => {
    event.preventDefault();
    try {
      if (
        !gameData.title ||
        !gameData.description ||
        !gameData.minNumberOfPeople ||
        !gameData.maxNumberOfPeople ||
        gameData.categories.length === 0 // Ensure at least one category is selected
      ) {
        alert("Fyll inn alle felter!");
        return;
      }

      // Add the game to "games" collection
      await createNewGame(gameData);

      // Reset the form after the game is added to the database
      setGameData({
        title: "",
        description: "",
        minNumberOfPeople: "",
        maxNumberOfPeople: "",
        categories: [],
      });

      // Alert that the game was created
      alert("Leken er opprettet!");

      // Navigate back to the homepage
      navigate("/");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Et problem oppstod når vi forsøkte å opprette leken.");
    }
  };

  const createNewGame = async (gameData) => {
    await addDoc(collection(db, "games"), gameData);
  };

  return (
    <>
      <Navbar />
      <div className="newGameBox">
        <h2 className="NGH2">Lag en ny lek</h2>
        <form className="newGameForm">
          <label className="gameTitle">Tittel:</label>
          <input
            className="inputfeltGame"
            type="text"
            name="title"
            value={gameData.title}
            onChange={(e) =>
              setGameData((prevGameData) => ({
                ...prevGameData,
                title: e.target.value,
              }))
            }
          />

          <label className="gameTitle">Beskrivelse:</label>
          <textarea
            className="inputfeltGame"
            name="description"
            value={gameData.description}
            onChange={(e) =>
              setGameData((prevGameData) => ({
                ...prevGameData,
                description: e.target.value,
              }))
            }
          ></textarea>

          <label className="gameTitle">Minimum antall deltakere:</label>
          <input
            className="inputfeltGame"
            type="number"
            inputMode="numeric"
            name="minNumberOfPeople"
            value={gameData.minNumberOfPeople}
            onChange={(e) =>
              setGameData((prevGameData) => ({
                ...prevGameData,
                minNumberOfPeople: e.target.value,
              }))
            }
          />

          <label className="gameTitle">Maks antall deltakere:</label>
          <input
            className="inputfeltGame"
            type="number"
            inputMode="numeric"
            name="maxNumberOfPeople"
            value={gameData.maxNumberOfPeople}
            onChange={(e) =>
              setGameData((prevGameData) => ({
                ...prevGameData,
                maxNumberOfPeople: e.target.value,
              }))
            }
          />

          <label className="gameTitle">Kategorier:</label>
          <div>
            <label>
              <input
                className="inputfeltGame2"
                type="checkbox"
                name="Ute"
                checked={gameData.categories.includes("Ute")}
                onChange={handleChange}
              />{" "}
              Ute
            </label>
            <label>
              <input
                className="inputfeltGame2"
                type="checkbox"
                name="Inne"
                checked={gameData.categories.includes("Inne")}
                onChange={handleChange}
              />{" "}
              Inne
            </label>
            <label>
              <input
                className="inputfeltGame2"
                type="checkbox"
                name="Moro"
                checked={gameData.categories.includes("Moro")}
                onChange={handleChange}
              />{" "}
              Moro
            </label>
            <label className="gameTitle"></label>
            {/* Add other categories here */}


            <br></br>
            <br></br>

            



          
            <button
              className="bnConfirm"
             type="button"
              onClick={handleCreateGame}>Opprett lek
            </button>
          </div>
         

         
          <br></br>
          <br></br>
          <br></br>
        </form>
      </div>
    </>
  );
}

export default NewGame;
