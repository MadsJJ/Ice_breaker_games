import React from "react";
import { useNavigate } from "react-router-dom";

import "./style/CardPlaylist.css";

export const CardPlaylist = ({
  playlistId,
  imgSrc,
  imgAlt,
  playlistTitle,
  creatorID,
}) => {
  let navigate = useNavigate();

  const handleClick = () => {
    console.log("Clicked playlist id:", playlistId); // Log gameId
    navigate("/VisitPlaylist/${playlistId}", { state: { key: playlistTitle } });
  };

//   const categoriesString = () => {
//     if (typeof categories === "string") {
//       return categories;
//     }
//     return categories.join(", "); // Join array elements with commas
//   };

  // This handleClick needs to be changed to properly route to correct page
  return (
    <div className="cardPlaylist" onClick={handleClick}>
      {/* {imgSrc && imgAlt && (
        <img className="cardImage" src={imgSrc} alt={imgAlt} />
      )} */}
      {/* Commented to have placeholder while not having proper images */}
      <img className="cardPlaylistImage" src="https://placekitten.com/350/140" alt="" />
      {playlistTitle && <h3 className="cardPlaylistTitle">{playlistTitle}</h3>}
      
      
    </div>
  );
};