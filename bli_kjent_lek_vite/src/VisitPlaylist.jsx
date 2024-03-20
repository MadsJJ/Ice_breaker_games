import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Card } from "./components/Card";
import { useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase"; // Importer din konfigurasjon for Firebase
import CustomWheel from "./components/CustomWheel";

import "./style/VisitPlaylist.css";

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
                const playlistDocRef = doc(db, "playlists", playlistId);
                const playlistSnapshot = await getDoc(playlistDocRef);
                // hent gamedata fra playlist
                const gamesArray = playlistSnapshot.data().games; // Access games array of DocumentReferences
                const gamesDataPromises = gamesArray.map((gameRef) => getDoc(gameRef));
                const gamesDocuments = await Promise.all(gamesDataPromises);

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

            <div className="playlistBody">
                <div className="games">
                    <h2 className="playlistTitle">{playlistTitle}</h2>
                    {playlistData.length >= 1 ? (
                        <>
                            {playlistData.map((game) => (
                                <Card
                                    key={game.id}
                                    gameId={game.id}
                                    image={game.image}
                                    title={game.title} // burde endres til "title i firebase - holde det consistent med engelsk
                                    // desc={game.description} // bare ha beskrivelse på lek-side
                                    creatorID={game.creatorID}
                                    categories={game.categories}
                                    minP={game.minNumberOfPeople}
                                    maxP={game.maxNumberOfPeople}
                                />
                            ))}
                        </>
                    ) : (
                        <p>Spillelisten er tom</p>
                    )}
                </div>
                <div id="wheelContainer">
                    <CustomWheel />
                </div>
            </div>
        </>
    );
}

export default VisitPlaylist;
