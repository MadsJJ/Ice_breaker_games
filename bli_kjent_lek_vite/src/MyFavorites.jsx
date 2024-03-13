import "./style/App.css";
import Navbar from "./components/Navbar";
//import Searchbar from "./components/Searchbar";
import { Card } from "./components/Card";
import { db } from "./firebase";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
//routing

function MyFavorites() {
  const [MyFavorites, setMyFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userID = localStorage.getItem("username");
        const userRef = doc(db, "users", userID);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const likedGames = userData.likedGames || []; // Gets the list over liked games, or an empty list

          const gamesPromises = likedGames.map((gameTitle) =>
            getDocs(
              query(collection(db, "games"), where("title", "==", gameTitle))
            )
          );
          const gamesSnapshots = await Promise.all(gamesPromises);
          const myFavoritesData = gamesSnapshots.flatMap((snapshot) =>
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
          setMyFavorites(myFavoritesData);
        }
      } catch (error) {
        console.error("Error fetching user's favorite games:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <h1
        style={{
          display: "flex",
          flexWrap: "wrap",
          margin: "auto",
          marginTop: "20px",
          width: "90vw",
          color: "#064789",
          borderBottom: "1px solid gray",
        }}
      >
        Mine Favoritter
      </h1>
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
        {MyFavorites.map((game) => (
          <Card
            key={game.id}
            gameId={game.id}
            image={game.image}
            title={game.title}
            creatorID={game.creatorID}
            categories={game.categories}
            minP={game.minNumberOfPeople}
            maxP={game.maxNumberOfPeople}
          />
        ))}
      </div>
    </>
  );
}

export default MyFavorites;
