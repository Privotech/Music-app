import React from "react";
import SongCard from "../Components/SongCard.jsx";

const SongList = ({ songs, onSelectSong }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {songs.map((song) => (
        <SongCard key={song.id} song={song} onSelectSong={onSelectSong} />
      ))}
    </div>
  );
};

export default SongList;
