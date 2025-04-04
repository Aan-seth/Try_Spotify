import React from "react";
import "../style.css";

const AlbumCard = ({ title, description, cover, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-img-container">
        <img className="card img" src={cover} alt={title} />
        <div className="play-button play">
          <img className="play-icon" src="/img/play.svg" alt="Play" />
        </div>
      </div>
      <h2 className="card-title">{title}</h2>
      <p className="card-description">{description}</p>
    </div>
  );
};

export default AlbumCard;
