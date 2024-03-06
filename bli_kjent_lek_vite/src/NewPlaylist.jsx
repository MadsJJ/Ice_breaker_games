import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";
import "./style/NewPlaylist.css";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  setDoc,
} from "firebase/firestore";

function NewPlaylist() {
  const [playlistData, setPlaylistData] = useState({
    title: "",
    games: "",
    
    creatorID: localStorage.getItem("userID"),

  });

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  const handleChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      // If checkbox is checked, add category to the array
      setPlaylistData((prevPlaylistData) => ({
        ...prevPlaylistData,
        categories: [...prevPlaylistData.categories, name],
      }));
    } else {
      // If checkbox is unchecked, remove category from the array
      setPlaylistData((prevPlaylistData) => ({
        ...prevPlaylistData,
        categories: prevPlaylistData.categories.filter((cat) => cat !== name),
      }));
    }
  };

  const handleCreatePlaylist = async (event) => {
    if (localStorage.getItem('username')) {
        try {
          // Du kan tilpasse disse feltene basert på hva som er nødvendig for spillelisten din
          const newPlaylistData = {
            title: 'Min nye spilleliste',
            creatorID: localStorage.getItem('username'),
            // Legg til andre felt etter behov
          };
    
          await addPlaylistToDB(newPlaylistData);
          alert('Ny spilleliste ble opprettet!');
        } catch (error) {
          console.error('Feil ved oppretting av spilleliste:', error);
          alert('Noe gikk galt ved oppretting av spilleliste. Vennligst prøv igjen.');
        }
      } else {
        alert('Du må være logget inn for å legge til en ny spilleliste!');
      }
    };

  const createNewPlaylist = async (playlistData) => {
    await addDoc(collection(db, "playlists"), playlistData);
  };

  return (
    <>
      <Navbar />
      <div className="newPlaylistBox">
        <h2 className="NGH2">Lag en ny spilleliste</h2>
        <form className="newPlaylistForm">
          <label className="playlistTitle">Tittel:</label>
          <input
            className="inputfeltPlaylist"
            type="text"
            name="title"
            value={playlistData.title}
            onChange={(e) =>
              setPlaylistData((prevPlaylistData) => ({
                ...prevPlaylistData,
                title: e.target.value,
              }))
            }
          />

          
        
          <button
            className="bnConfirm"
            type="button"
            onClick={handleCreatePlaylist}
          >
            Opprett Spilleliste
          </button>
        </form>
      </div>
    </>
  );
}

export default NewPlaylist;