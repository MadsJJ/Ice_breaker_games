import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Card } from "./components/Card";
import { useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase"; // Importer din konfigurasjon for Firebase

function VisitPlaylist() {
  const location = useLocation();
  const playlistTitle = location.state.playlistTitle;
  const playlistId = location.state.playlistId;
  const [playlistData, setPlaylistData] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        // Hent spilleliste fra Firestore
        console.log("playlistId:", playlistId);
        const playlistDocRef = doc(db, "playlists", playlistId);
        const playlistSnapshot = await getDoc(playlistDocRef);
        // hent gamedata fra playlist
        const gamesArray = playlistSnapshot.data().games; // Access games array of DocumentReferences
        const gamesDataPromises = gamesArray.map((gameRef) => getDoc(gameRef));
        const gamesDocuments = await Promise.all(gamesDataPromises);
        console.log("gamesDocuments:", gamesDocuments);

        const gamesData = gamesDocuments.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPlaylistData(gamesData);
      } catch (error) {
        console.error("Feil ved henting av playlist-data:", error);
      }
    };

    if (playlistTitle && playlistId) {
      fetchPlaylistData();
    }
  }, [playlistId, playlistTitle, updateTrigger]);

  return (
    <>
      <Navbar />
      <h2>{playlistTitle}</h2>

      {playlistData.length >= 1 ? (
        <>
          {playlistData.map((game) => (
            <Card
              key={game.id}
              gameId={game.id}
              image={game.image} // disse er ikke lagt til i db - må finne ut om vi vil ha bilder
              // imgAlt={game.imgAlt}  / eller strings som linker til bilde r i filstrukturen
              title={game.title} // burde endres til "title i firebase - holde det consistent med engelsk
              // desc={game.description} // bare ha beskrivelse på lek-side
              creatorID={game.creatorID}
              categories={game.categories}
              minP={game.minNumberOfPeople}
              maxP={game.maxNumberOfPeople}
              playlistView={true}
              onRemove={() => setUpdateTrigger((prev) => !prev)}
            />
          ))}
        </>
      ) : (
        <p>Spillelisten er tom</p>
      )}
    </>
  );
}

export default VisitPlaylist;
