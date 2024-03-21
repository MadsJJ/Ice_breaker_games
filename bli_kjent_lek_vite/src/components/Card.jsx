import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../firebase";

import "./style/Card.css";

export const Card = ({
    gameId,
    image,
    title,
    desc,
    categories,
    minP,
    maxP,
    creatorID,
    playlistView,
    onRemove,
}) => {
    let navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        console.log("Clicked game id:", gameId); // Log gameId
        navigate(`/VisitGame/${gameId}`, {
            state: { title: title, gameId: gameId },
        });
    };

    const handleRemoveFromPlaylist = async () => {
        try {
            const playlistId = location.state.playlistId;
            const playlistDocRef = doc(db, "playlists", playlistId);
            const gameRef = doc(db, "games", gameId);
            await updateDoc(playlistDocRef, {
                games: arrayRemove(gameRef),
            });
            alert("Spillet ble fjernet fra spillelisten!");
            onRemove();
        } catch (error) {
            console.error("Error removing game from playlist:", error);
        }
    };

    const categoriesString = () => {
        if (typeof categories === "string") {
            return categories;
        }
        return categories.join(", "); // Join array elements with commas
    };

    return (
        <div className="card" onClick={handleClick}>
            {image && <img className="cardImage" src={image} />}

            {title && <h3 className="cardTitle">{title}</h3>}
            {desc && <p className="cardDesc">{desc}</p>}

            {categories && <p className="cardCats">Kategorier: {categoriesString()}</p>}

            {minP && maxP && (
                <p className="numPlayers">
                    Spillere: {minP}-{maxP}
                </p>
            )}

            {creatorID && <p id="creator">Laget av: {creatorID}</p>}

            {playlistView && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFromPlaylist();
                    }}
                    className="bnRemove"
                >
                    Fjern fra liste
                </button>
            )}
        </div>
    );
};
