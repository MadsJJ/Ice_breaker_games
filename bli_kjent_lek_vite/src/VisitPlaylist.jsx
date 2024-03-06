import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";
import { doc, getDoc, collection } from "firebase/firestore";
import { db } from "./firebase"; // Importer din konfigurasjon for Firebase


function VisitPlaylist(){
    const location = useLocation();
    const { playlistTitle } = location.state || {};
    const [playlistData, setPlaylistData] = useState({});

    useEffect(() => {
        const fetchPlaylistData = async () => {
          try {
            // Hent dokumentet fra Firestore
            const playlistDocRef = doc(collection(db, "playlists"), playlistTitle);
            const playlistSnapshot = await getDoc(playlistDocRef);
    
            // Hent data fra snapshot
            if (playlistSnapshot.exists()) {
              setPlaylistData(playlistSnapshot.data());
            } else {
              console.log("Dokumentet eksisterer ikke");
            }
          } catch (error) {
            console.error("Feil ved henting av playlist-data:", error);
          }
        };
    
        if (playlistTitle) {
          fetchPlaylistData();
        }
      }, [playlistTitle]);
    

    return (
        <>
          <Navbar />
          <h2>Visited Playlist Title: {playlistTitle}</h2>
        </>
      );
    }

export default VisitPlaylist;