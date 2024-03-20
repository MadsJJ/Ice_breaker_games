import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
    collection,
    getDocs,
    doc,
    query,
    where,
    getDoc,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";
import { useLocation } from "react-router-dom";
import "./style/DropDownCategory.css";

function DropDownPlaylist({ gameId }) {
    // const location = useLocation();

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

        // Logging selected playlist ID and current game ID
        console.log("Selected Playlist ID:", selectedPlaylistId);
        console.log("Current Game ID:", gameId);

        try {
            // Update the selected playlist to add the current game
            // const playlistRef = collection(db, "playlists").doc(selectedPlaylistId);¨

            const docRef = doc(db, "playlists", selectedPlaylistId);
            const docSnapshot = await getDoc(docRef);

            if (docSnapshot.exists()) {
                const playlistData = {
                    id: docSnapshot.id,
                    ...docSnapshot.data(),
                };
                console.log("Playlistref", docSnapshot);
            } else {
                console.log("No such document!");
            }

            const gameRef = doc(db, "games", gameId);

            await updateDoc(docRef, {
                games: arrayUnion(gameRef),
            });
            console.log("Game added to playlist successfully!");
            alert("Spillet ble lagt til i spilleliste!");
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
