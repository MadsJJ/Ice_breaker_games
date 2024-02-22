import React from "react";

import "./style/Card.css";

export const Card = ({ imgSrc, imgAlt, title, desc }) => {
  const handleClick = (e) => alert("Test click");
  // This handleClick needs to be changed to properly route to correct page
  return (
    <div className="card" onClick={(e) => handleClick(e)}>
      {/* {imgSrc && imgAlt && (
        <img className="cardImage" src={imgSrc} alt={imgAlt} />
      )} */}
      {/* Commented to have placeholder while not having proper images */}
      <img className="cardImage" src="https://placekitten.com/350/140" alt="" />
      {title && <h3 className="cardTitle">{title}</h3>}
      {desc && <p className="cardDesc">{desc}</p>}
    </div>
  );
};
