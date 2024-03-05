import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "./components/Card";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import { db } from "./firebase";
import "./style/App.css";

function CategoryFilter() {
  const [games, setGames] = useState([]);
  const [noMatches, setNoMatches] = useState(false); //if no games matches the search
  const location = useLocation();
  const { categories, searchTerm } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        // gets all the games form the db
        const gamesQuery = collection(db, "games");
        const querySnapshot = await getDocs(gamesQuery);
        let gamesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        // Filter based on the serachTerm
        if (searchTerm) {
          const searchTermLower = searchTerm.toLowerCase();
          gamesData = gamesData.filter(game =>
            game.title.toLowerCase().includes(searchTermLower)
          );
        }
        
        // Filter based on categories
        if (categories) {
          gamesData = gamesData.filter(game =>
            game.categories && game.categories.includes(categories)
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
  }, [searchTerm, categories]);

  return (
    <>
      <Navbar />
      <Searchbar heading={categories} />
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
          />
        ))}
        {noMatches && <p>Ingen leker matcher ditt søk:(</p>}
      </div>
    </>
  );
}

export default CategoryFilter;
