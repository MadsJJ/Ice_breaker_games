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
          const likedGames = userData.likedGames || []; // Hent listen over likte spill, eller en tom liste hvis den ikke finnes

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
      {/* <Searchbar heading="Mine Favoritter" /> */}
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
        {MyFavorites.map((game) => (
          <Card
            key={game.id}
            gameId={game.id}
            // imgSrc={game.imgSrc} // disse er ikke lagt til i db - må finne ut om vi vil ha bilder
            // imgAlt={game.imgAlt}  / eller strings som linker til bilde r i filstrukturen
            title={game.title} // burde endres til "title i firebase - holde det consistent med engelsk
            // desc={game.description} // bare ha beskrivelse på lek-side
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
