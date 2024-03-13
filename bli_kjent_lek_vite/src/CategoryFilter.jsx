import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import { Card } from "./components/Card";
import { useLocation, useNavigate } from "react-router-dom";

function CategoryFilter() {
  const [games, setGames] = useState([]);
  const [noMatches, setNoMatches] = useState(false);
  const location = useLocation();
  const { category, searchTerm } = location.state || {};
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let querySnapshot;
        if (category) {
          const q = query(
            collection(db, "games"),
            where("categories", "array-contains", category)
          );
          querySnapshot = await getDocs(q);
        } else {
          // If no category is selected, fetch all games
          querySnapshot = await getDocs(collection(db, "games"));
        }

        let gamesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter based on the searchTerm if it exists
        if (searchTerm) {
          const searchTermLower = searchTerm.toLowerCase();
          gamesData = gamesData.filter((game) =>
            game.title.toLowerCase().includes(searchTermLower)
          );
        }

        setGames(gamesData);
        setNoMatches(gamesData.length === 0);
      } catch (error) {
        console.error("Error fetching games:", error);
        setNoMatches(true);
      }
    };

    fetchData();
  }, [category, searchTerm]); // Fetch data whenever category or searchTerm changes

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
            title={game.title}
            image={game.image}
            creatorID={game.creatorID}
            minP={game.minNumberOfPeople}
            maxP={game.maxNumberOfPeople}
          />
        ))}
        {noMatches && <p>Ingen leker matcher ditt søk:(</p>}
      </div>
    </>
  );
}

export default CategoryFilter;
