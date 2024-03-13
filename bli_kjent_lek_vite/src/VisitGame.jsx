import DropDownPlaylist from "./components/DropDownPlaylist";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./style/VisitGame.css";
import { db } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  deleteField,
} from "firebase/firestore";



function VisitGame() {
  const [rating, setRating] = useState(0); // Initial rating is 0
  const [hoverRating, setHoverRating] = useState(0); // For hover effect
  const [liked, setLiked] = useState(false); // Initial like status is false

  const location = useLocation();
  const navigate = useNavigate();

  const title = location.state.title;
  const gameId = location.state.gameId;

  console.log("title", title);
  console.log("gameid", gameId);

  //Adds a game to my ratings
  // const handleRatingClick = async (value) => {
  //   if (!localStorage.getItem("username")) {
  //     alert("Du må være logget inn for å kunne gi en rating!");
  //     return;
  //   }

  //   let updatedUser = { ...user };
  //   if (!updatedUser.myRatings) {
  //     updatedUser.myRatings = {};
  //   }

  //   const currentRating = updatedUser.myRatings[game.title.trim()];

  //   // Sjekk om den nye ratingen er lik den eksisterende ratingen for spillet
  //   if (value === currentRating) {
  //     // Fjern ratingen ved å sette den til 0 eller fjerne nøkkelen
  //     delete updatedUser.myRatings[game.title.trim()];
  //     setRating(0);
  //     await updateDoc(updatedUser, {
  //       [`myRatings.${game.title.trim()}`]: deleteField(),
  //     });
  //   } else {
  //     // Oppdater med den nye ratingen
  //     updatedUser.myRatings[game.title.trim()] = value;
  //     setRating(value);
  //   }

  //   console.log("Mine Ratings:", updatedUser.myRatings);
  //   setUser(updatedUser);

  //   // Oppdater brukerens ratinger i databasen
  //   await setDoc(
  //     doc(db, "users", user.username),
  //     { myRatings: updatedUser.myRatings },
  //     { merge: true }
  //   );
  // };

  const handleRatingClick = async (value) => {
    const username = localStorage.getItem("username");
    if (!username) {
      alert("Du må være logget inn for å kunne gi en rating!");
      return;
    }

    let updatedUser = { ...user };
    if (!updatedUser.myRatings) {
      updatedUser.myRatings = {};
    }

    const gameTitle = game.title.trim();
    const userDocRef = doc(db, "users", username);

    if (value === updatedUser.myRatings[gameTitle]) {
      // Removes the rating from the local state and in the db
      delete updatedUser.myRatings[gameTitle];
      setRating(0);
      // updates the db and removes the game form the list myRatings
      await updateDoc(userDocRef, {
        [`myRatings.${gameTitle}`]: deleteField(),
      });
    } else {
      // Updates with the new rating
      updatedUser.myRatings[gameTitle] = value;
      setRating(value);
      // Updates the rating in the db
      await updateDoc(userDocRef, {
        [`myRatings.${gameTitle}`]: value,
      });
    }

    console.log("Mine Ratings:", updatedUser.myRatings);
    setUser(updatedUser);
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

  const [categoryList, setCategories] = useState("");

  useEffect(() => {
    console.log(game.categories);
    if (typeof game.categories === "object") {
      setCategories(game.categories.join(", "));
    } else {
      setCategories(game.categories ? game.categories : "");
    }
  }, [game.categories]);

  //Sets the heart to red if the game is liked by the user
  useEffect(() => {
    // Sjekk om spillet er liket av brukeren basert på spilltittelen
    const isLiked = user.likedGames?.includes(game.title);
    setLiked(isLiked);
  }, [game.title, user.likedGames]);

  useEffect(() => {
    // Sjekk om brukeren har gitt en rating til spillet basert på spilltittelen
    const userRating = user.myRatings?.[game.title];
    setRating(userRating || 0); // Setter ratingen til brukerens rating, eller 0 hvis ingen rating er gitt
  }, [game.title, user.myRatings]);

  const handleHoverRating = (value) => {
    // Set hoverRating to the value when mouse enters a star
    setHoverRating(value);
  };

  const handleHoverRatingReset = () => {
    // Reset hoverRating when mouse leaves the star container
    setHoverRating(0);
  };

  //Add game to my favorites
  const handleLikeClick = async () => {
    if (!localStorage.getItem("username")) {
      alert("Du må være logget inn for å legge til en lek i dine favoritter!");
      return;
    }
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
                <p>Rating: {rating}</p>
                <div>
                  {[1, 2, 3, 4, 5].map((value) => (
                    // <span
                    //   key={value}
                    //   className={
                    //     value <= (hoverRating || rating) ? "on" : "off"
                    //   }
                    //   onClick={() => handleRatingClick(value)}
                    //   onMouseEnter={() => handleHoverRating(value)}
                    //   onMouseLeave={handleHoverRatingReset}
                    // >
                    //   ★
                    // </span>
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

              <DropDownPlaylist gameId={gameId}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VisitGame;
