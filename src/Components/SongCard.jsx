import React from "react";

// The SongCard component displays a single song in a card format.
const SongCard = ({ song, onSelectSong }) => {
  return (
    // Each card is a button that opens the player for that specific song.
    <div
      onClick={() => onSelectSong(song)}
      className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
    >
      <div>
        {/* Song artwork image. */}
        <img
          src={song.artwork}
          alt={song.title}
          className="w-full h-40 object-cover rounded-md mb-2"
        />
        {/* Song title and artist information. */}
        <h3 className="font-bold text-lg truncate">{song.title}</h3>
        <p className="text-gray-400 text-sm">{song.artist}</p>
      </div>
    </div>
  );
};

export default SongCard;
