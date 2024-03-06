import "./style/App.css";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import { Card } from "./components/Card";
import { db } from "./firebase";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
//routing

function MyFavorites() {
  const [MyFavorites, setMyFavorites] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const q = query(collection(db, "games", "user"), where());
  //       const querySnapshot = await getDocs(q);
  //       const myFavoritesData = querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setMyFavorites(myFavoritesData);
  //     } catch (error) {
  //       console.error("Error fetching games:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("username");
      const userDocRef = doc(db, "users", userId);

      try {
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userLikedGamesIds = userDocSnap.data().likedGames; // Dette er arrayen av spill-IDer brukeren liker
          const gamesPromises = userLikedGamesIds.map((title) =>
            getDoc(doc(db, "games", title))
          );

          const gamesSnapshots = await Promise.all(gamesPromises);
          const myFavoritesData = gamesSnapshots.map((snapshot) => ({
            id: snapshot.id,
            ...snapshot.data(),
          }));

          setMyFavorites(myFavoritesData);
        } else {
          console.log("No user found with the given ID");
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
      <Searchbar heading="Mine Favoritter" />
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
