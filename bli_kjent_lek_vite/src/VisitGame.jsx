import React, { useState } from "react";
import Navbar from "./components/Navbar";
import "./style/VisitGame.css";
//routing
import react from "react";
import { useNavigate } from "react-router-dom";

function VisitGame() {
  const [rating, setRating] = useState(0); // Initial rating is 0
  const [hoverRating, setHoverRating] = useState(0); // For hover effect
  const [liked, setLiked] = useState(false); // Initial like status is false

  const navigate = useNavigate();

  const handleRatingClick = (value) => {
    // Set the rating to the clicked value
    setRating(value);
  };

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
      <div className="newGameContainer">
        <div className="gameHeader">
          <h2>Navn på lek</h2>
        </div>
        <p>Laget av: Brukernavn</p>
        <br></br>

        <div className="descBox">
          <div className="descBox">
            <div className="textLeft">
              <p>Bilde</p>
            </div>
            <div className="textRight">
              <p>Beskrivelse</p>
            </div>
          </div>
          <div className="additionalInfo">
            <div className="ratingDiv">
              <p>Rating: {rating}</p>
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

            <button className = 'likeButton' onClick={handleLikeClick}>
              {liked ? "❤️ Lagt til i favoritter" : "🤍 Legg til i favoritter"}
            </button>

            </div>
            <div className="categoryDiv">
              <p>Category: Example Category</p>
            </div>
           
            <button className="reportButton">Rapporter Lek</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default VisitGame;
