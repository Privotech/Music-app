import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Player from "../components/Player.jsx";
import { songs } from "../data/songs.js";

// The PlayerPage component is responsible for displaying the player for a single song.
const PlayerPage = () => {
  // Get the songId from the URL parameters using the useParams hook.
  const { songId } = useParams();
  // Get the navigate function from react-router-dom to programmatically change routes.
  const navigate = useNavigate();
  // Find the index of the current song in the songs array based on its ID.
  const songIndex = songs.findIndex((s) => s.id === parseInt(songId));

  // If the song is not found, display an error message.
  if (songIndex === -1) {
    return <div className="text-center text-red-500">Song not found</div>;
  }

  // Function to navigate to the next song in the list.
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
