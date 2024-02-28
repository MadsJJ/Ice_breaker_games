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
  setDoc
} from "firebase/firestore";

function NewGame() {
  const [gameData, setGameData] = useState({
    title: "",
    description: "",
    minNumberOfPeople: "",
    maxNumberOfPeople: "",
    categories: [] // Change categories to an array
  });

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  const handleChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      // If checkbox is checked, add category to the array
      setGameData(prevGameData => ({
        ...prevGameData,
        categories: [...prevGameData.categories, name]
      }));
    } else {
      // If checkbox is unchecked, remove category from the array
      setGameData(prevGameData => ({
        ...prevGameData,
        categories: prevGameData.categories.filter(cat => cat !== name)
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
        alert("Fill out all fields!");
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
        categories: []
      });

      // Alert that the game was created
      alert("Game created!");

      // Navigate back to the homepage
      navigate("/");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("An error occurred while creating the game.");
    }
  };

  const createNewGame = async (gameData) => {
    await addDoc(collection(db, "games"), gameData);
  };

  return (
    <>
      <Navbar />
      <div className="newGameBox">
        <h2 className="NGH2">Create a new game</h2>
        <form className="newGameForm">
          <label className="gameTitle">Title:</label>
          <input
            type="text"
            name="title"
            value={gameData.title}
            onChange={(e) => setGameData(prevGameData => ({
              ...prevGameData,
              title: e.target.value
            }))}
          />

          <label className="gameTitle">Description:</label>
          <textarea
            name="description"
            value={gameData.description}
            onChange={(e) => setGameData(prevGameData => ({
              ...prevGameData,
              description: e.target.value
            }))}
          ></textarea>

          <label className="gameTitle">Minimum number of people:</label>
          <input
            type="number"
            inputMode="numeric"
            name="minNumberOfPeople"
            value={gameData.minNumberOfPeople}
            onChange={(e) => setGameData(prevGameData => ({
              ...prevGameData,
              minNumberOfPeople: e.target.value
            }))}
          />


          <label className="gameTitle">Maximum number of people:</label>
          <input
            type="number"
            inputMode="numeric"
            name="maxNumberOfPeople"
            value={gameData.maxNumberOfPeople}
            onChange={(e) => setGameData(prevGameData => ({
              ...prevGameData,
              maxNumberOfPeople: e.target.value
            }))}
          />


          <label className="gameTitle">Categories:</label>
          <div>
            <label>
              <input
                type="checkbox"
                name="Outdoor"
                checked={gameData.categories.includes("Outdoor")}
                onChange={handleChange}
              />{" "}
              Outdoor
            </label>
            <label>
              <input
                type="checkbox"
                name="Indoor"
                checked={gameData.categories.includes("Indoor")}
                onChange={handleChange}
              />{" "}
              Indoor
            </label>
            <label>
              <input
                type="checkbox"
                name="Moro"
                checked={gameData.categories.includes("Moro")}
                onChange={handleChange}
              />{" "}
              Moro
            </label >
            <label className="gameTitle"></label>
            {/* Add other categories here */}
          </div>
          <br></br>

          <button className="bnConfirm" type="button" onClick={handleCreateGame}>
            Create Game
          </button>
        </form>
      </div>
    </>
  );
}

export default NewGame;
