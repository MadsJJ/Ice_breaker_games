import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import "./style/VisitGame.css";
//routing
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  //updateDoc,
  where,
} from "firebase/firestore";

import { useLocation } from "react-router-dom";
import { db } from "./firebase";

function VisitGame() {
  const [rating, setRating] = useState(0); // Initial rating is 0
  const [hoverRating, setHoverRating] = useState(0); // For hover effect
  const [liked, setLiked] = useState(false); // Initial like status is false

  const location = useLocation();

  const title = location.state.key;

  const handleRatingClick = (value) => {
    // Set the rating to the clicked value
    setRating(value);
  };

  const [game, setGame] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "games"),
          where("title", "==", title.trim())
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Assuming there's only one game with the given title
          const gameData = {
            id: querySnapshot.docs[0].id,
            ...querySnapshot.docs[0].data(),
          };
          setGame(gameData);
        } else {
          console.log("No game found with the given title:", title);
        }
      } catch (error) {
        console.error("Error fetching game:", error);
      }
      try {
        const q = query(
          collection(db, "users"),
          where("username", "==", localStorage.getItem("username"))
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Assuming there's only one user with the given username
          const userData = {
            id: querySnapshot.docs[0].id,
            ...querySnapshot.docs[0].data(),
          };
          setUser(userData);
        } else {
          console.log("No user found");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
      if (game.image) {
        setGame((prevGame) => ({
          ...prevGame,
          image: game.image,
        }));
      }

    };

    fetchData();
  }, [title]);

  // Lag en funksjon som legger til spillet i liked array for bruker

  const [categoryList, setCategories] = useState("");

  useEffect(() => {
    console.log(game.categories);
    if (typeof game.categories === "object") {
      setCategories(game.categories.join(", "));
    } else {
      setCategories(game.categories ? game.categories : "");
    }
  }, [game.categories]);

  useEffect(() => {
    // Sjekk om spillet er liket av brukeren basert på spilltittelen
    const isLiked = user.likedGames?.includes(game.title);
    setLiked(isLiked);
  }, [game.title, user.likedGames]); // Avhengigheter for å kjøre effekten

  const handleHoverRating = (value) => {
    // Set hoverRating to the value when mouse enters a star
    setHoverRating(value);
  };

  const handleHoverRatingReset = () => {
    // Reset hoverRating when mouse leaves the star container
    setHoverRating(0);
  };

  const handleLikeClick = async () => {
    let updatedUser = { ...user };
    if (!user.likedGames) {
      updatedUser.likedGames = [];
    }
    if (!liked) {
      updatedUser.likedGames = [...updatedUser.likedGames, game.title];
    } else {
      updatedUser.likedGames = updatedUser.likedGames.filter(
        (title) => title.trim() !== game.title.trim()
      );
    }
    console.log("Mine favoritter:", updatedUser.likedGames);
    setUser(updatedUser);

    // await db.collection('users').doc(user.username).update({likedGames: updatedUser.likedGames});
    setDoc(
      doc(db, "users", user.username),
      {
        likedGames: updatedUser.likedGames,
      },
      { merge: true }
    );

    // Toggle liked status
    setLiked(!liked);
  };

  return (
    <>
      <Navbar />
      <div className="content">
        <div className="newGameContainer">
          <div className="gameHeader">
            <h2>{game.title}</h2>
          </div>
          <p>Laget av: {game.creatorID ? game.creatorID : "Ukjent"}</p>
          <br></br>

          <div className="container">
            <div className="descBox">
              <div className="textLeft">
                {game.image && <img src={game.image} alt="Game" style = {{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto'}} />}
              </div>
              <div className="textRight">
                
              
                <p>{game.description}</p>
                <p>{game.minNumberOfPeople}</p>
                <p>{game.maxNumberOfPeople}</p>
              </div>
            </div>
            <div className="additionalInfo">
              <div className="ratingDiv">
                <p>Vurdering: {rating}</p>
                <div>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <span
                      key={value}
                      className={
                        value <= (hoverRating || rating) ? "on" : "off"
                      }
                      onClick={() => handleRatingClick(value)}
                      onMouseEnter={() => handleHoverRating(value)}
                      onMouseLeave={handleHoverRatingReset}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <button className="likeButton" onClick={handleLikeClick}>
                  {liked
                    ? "❤️ Lagt til i favoritter"
                    : "🤍 Legg til i favoritter"}
                </button>
              </div>
              <div className="categoryDiv">
                <p>Kategorier: {categoryList}</p>
              </div>

              <button className="reportButton">Rapporter Lek</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VisitGame;
