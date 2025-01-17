import "./style/App.css";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./style/MyPlaylists.css";
import GameCarousel from "./components/GameCarousel";
import { CardPlaylist } from "./components/CardPlaylist";
import { db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
//routing
import { useNavigate } from "react-router-dom";

function MyPlaylists() {
    //routing
    let navigate = useNavigate();

    const handleNewPlaylist = () => {
        if (localStorage.getItem("username")) {
            navigate("/NewPlaylist");
        } else {
            alert("Du må være logget inn for å legge til en ny spilleliste!");
        }
    };

    const [myPlaylists, setMyPlaylists] = useState([]);

    useEffect(() => {
        // Help from ChatGPT
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

    return (
        <>
            <Navbar />
            <h2 className="headerspilleliste"> Mine spillelister</h2>
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
                {myPlaylists.map((playlist) => (
                    <CardPlaylist
                        key={playlist.id}
                        playlistId={playlist.id}
                        playlistTitle={playlist.title}
                        creatorID={playlist.creatorID}
                    />
                ))}
            </div>
            <Button
                onClick={handleNewPlaylist}
                id="newPlaylistButton"
                color="primary"
                variant="contained"
                size="large"
            >
                Ny spilleliste!
            </Button>
        </>
    );
}

export default MyPlaylists;
