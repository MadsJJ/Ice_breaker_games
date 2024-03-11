import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where, updateDoc, arrayUnion } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import "./style/DropDownCategory.css";

function DropDownPlaylist() {
  const location = useLocation();

  const [myPlaylists, setMyPlaylists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "playlists"),
          where("creatorID", "==", localStorage.getItem("username"))
        );
        const querySnapshot = await getDocs(q);
        const myPlaylistsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMyPlaylists(myPlaylistsData);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = async (event) => {
    const selectedPlaylistId = event.target.value;
    const currentGameId = location.state.gameId; // Assuming you pass the gameId via location.state

    try {
      // Update the selected playlist to add the current game
      const playlistRef = collection(db, "playlists").doc(selectedPlaylistId);
      await updateDoc(playlistRef, {
        games: arrayUnion(db.doc(`games/${currentGameId}`)),
      });
      console.log("Game added to playlist successfully!");
    } catch (error) {
      console.error("Error adding game to playlist:", error);
    }
  };

  return (
    <div className="ddDiv">
      <select className="dropDown" onChange={handleSelectChange}>
        <option className="dropOptions" value="">
          Legg til spilleliste!
        </option>
        {myPlaylists.map((playlist) => (
          <option className="dropOptions" key={playlist.id} value={playlist.id}>
            {playlist.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropDownPlaylist;
