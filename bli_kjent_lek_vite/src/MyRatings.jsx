import "./style/App.css";
import Navbar from "./components/Navbar";
//import Searchbar from "./components/Searchbar";
import { Card } from "./components/Card";
import { db } from "./firebase";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
//routing

function MyRatings() {
  const [MyRatings, setMyRatings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userID = localStorage.getItem("username");
        const userRef = doc(db, "users", userID);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const myRatings = userData.myRatings || {};

          const gamesPromises = Object.keys(myRatings).map((gameTitle) =>
            getDocs(
              query(collection(db, "games"), where("title", "==", gameTitle))
            )
          );
          const gamesSnapshots = await Promise.all(gamesPromises);
          const myRatingsData = gamesSnapshots.flatMap((snapshot) =>
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
          setMyRatings(myRatingsData);
        }
      } catch (error) {
        console.error("Error fetching user's rated games:", error);
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
        Mine Ratings
      </h1>
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
        {MyRatings.map((game) => (
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

export default MyRatings;
