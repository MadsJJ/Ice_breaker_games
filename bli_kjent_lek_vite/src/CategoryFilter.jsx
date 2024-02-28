import "./style/App.css";
import { Button } from "@mui/material";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import { Card } from "./components/Card";
import { db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function CategoryFilter() {
    const [games, setGames] = useState([]);
    const location = useLocation();
    const { category, searchTerm } = location.state || {};

    useEffect(() => {
        const fetchData = async () => {
            let gamesQuery;
            try {
                if (searchTerm) {
                    // Query based on the "Tittel" field if there's a searchTerm
                    gamesQuery = query(collection(db, "games"), where("title", "==", searchTerm));
                } else if (category) {
                    // Query based on category if there's a category
                    gamesQuery = query(collection(db, "games"), where("category", "array-contains", category));
                } else {
                    // Default query if no searchTerm or category is provided
                    gamesQuery = collection(db, "games");
                }

                const querySnapshot = await getDocs(gamesQuery);
                const gamesData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setGames(gamesData);
            } catch (error) {
                console.error("Error fetching games:", error);
            }
        };

        fetchData();
    }, [searchTerm, category]); // Depend on both searchTerm and category

    return (
        <>
            <Navbar />
            <Searchbar heading={category} />
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    margin: "auto",
                    width: "90vw",
                }}
            >
                {games.map((game) => (
                    <Card
                        key={game.id}
                        title={game.Tittel}
                        desc={game.description}
                        category={game.category}
                    />
                ))}
            </div>
        </>
    );
}

export default CategoryFilter;
