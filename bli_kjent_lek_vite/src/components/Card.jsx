import React from "react";
import { useNavigate } from "react-router-dom";

import "./style/Card.css";

export const Card = ({
  gameId,
  imgSrc,
  imgAlt,
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
      {/* {imgSrc && imgAlt && (
        <img className="cardImage" src={imgSrc} alt={imgAlt} />
      )} */}
      {/* Commented to have placeholder while not having proper images */}
      <img className="cardImage" src="https://placekitten.com/350/140" alt="" />
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
