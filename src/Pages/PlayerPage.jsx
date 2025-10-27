import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Player from "../Components/Player.jsx";
import { songs } from "../data/songs.js";

const PlayerPage = () => {

  const { songId } = useParams();

  const navigate = useNavigate();

  const songIndex = songs.findIndex((s) => s.id === parseInt(songId));


  if (songIndex === -1) {
    return <div className="text-center text-red-500">Song not found</div>;
  }


  const handleNext = () => {
    const nextIndex = (songIndex + 1) % songs.length;
    navigate(`/song/${songs[nextIndex].id}`);
  };

  // Function to navigate to the previous song in the list.
  const handlePrev = () => {
    const prevIndex = (songIndex - 1 + songs.length) % songs.length;
    navigate(`/song/${songs[prevIndex].id}`);
  };

  return (
    // Render the Player component with the current song and the navigation functions.
    <Player song={songs[songIndex]} onNext={handleNext} onPrev={handlePrev} />
  );
};

export default PlayerPage;
