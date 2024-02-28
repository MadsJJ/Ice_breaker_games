import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./style/VisitGame.css";
//routing
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

function VisitGame() {
  const [rating, setRating] = useState(0); // Initial rating is 0
  const [hoverRating, setHoverRating] = useState(0); // For hover effect
  const [liked, setLiked] = useState(false); // Initial like status is false

  const location = useLocation();
  const navigate = useNavigate();

  const title = location.state.key;

  const handleRatingClick = (value) => {
    // Set the rating to the clicked value
    setRating(value);
  };

  const [games, setGame] = useState([]);

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
          console.log("No game found with the given title:", gameId);
        }
      } catch (error) {
        console.error("Error fetching game:", error);
      }
    };

    fetchData();
  }, []);

  const [categoryList, setCategories] = useState("");

  useEffect(() => {
    console.log(games.categories);
    if (typeof games.categories === "object") {
      setCategories(games.categories.join(", "));
    } else {
      setCategories(games.categories ? games.categories : "");
    }
  }, [games.categories]);

  const handleHoverRating = (value) => {
    // Set hoverRating to the value when mouse enters a star
    setHoverRating(value);
  };

  const handleHoverRatingReset = () => {
    // Reset hoverRating when mouse leaves the star container
    setHoverRating(0);
  };

  const handleLikeClick = () => {
    // Toggle liked status
    setLiked(!liked);
  };

  return (
    <>
      <Navbar />
      <div className="content">
        <div className="newGameContainer">
          <div className="gameHeader">
            <h2>{games.title}</h2>
          </div>
          <p>Laget av: {games.creatorID ? games.creatorID : "Ukjent"}</p>
          <br></br>

          <div className="container">
            <div className="descBox">
              <div className="textLeft">
                <p>Bilde</p>
              </div>
              <div className="textRight">
                <p>{games.description}</p>
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
