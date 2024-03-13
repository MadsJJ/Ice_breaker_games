import React from "react";
import { useNavigate } from "react-router-dom";

import "./style/Card.css";

export const Card = ({
  gameId,
  image,
  title,
  desc,
  categories,
  minP,
  maxP,
  creatorID,
}) => {
  let navigate = useNavigate();

  const handleClick = () => {
    console.log("Clicked game id:", gameId); // Log gameId
    navigate("/VisitGame/${gameId}", { state: { key: title } });
  };

  const categoriesString = () => {
    if (typeof categories === "string") {
      return categories;
    }
    return categories.join(", "); // Join array elements with commas
  };

  // This handleClick needs to be changed to properly route to correct page
  return (
    <div className="card" onClick={handleClick}>
      {image && 
         <img className="cardImage" src={image}/>
         }
     
      {title && <h3 className="cardTitle">{title}</h3>}
      {desc && <p className="cardDesc">{desc}</p>}
      
      {categories && (
        <p className="cardCats">Kategorier: {categoriesString()}</p>
      )}
     
      {minP && maxP && (
        <p className="numPlayers">
          Spillere: {minP}-{maxP}
        </p>
      )}

      {creatorID && (
        <p id="creator">
          Laget av: {creatorID}
        </p>
      )}
      
    </div>
  );
};
