import React, { useState, useMemo } from "react";
import SongList from "../Components/SongList.jsx";
import { songs } from "../data/songs.js";
import Player from "../Components/Player.jsx";

// The HomePage component is the main landing page, displaying the music library.
const HomePage = () => {
  // State to hold the current value of the search input.
  const [searchQuery, setSearchQuery] = useState("");
  // State to hold the currently selected song for the player.
  const [currentSong, setCurrentSong] = useState(null);

  // useMemo is used to efficiently .filter the songs based on the search query.
  // The list is only re-calculated when the searchQuery changes.
  const filteredSongs = useMemo(() => {
    // If there's no search query, return the full list of songs.
    if (!searchQuery) {
      return songs;
    }
    // Otherwise, filter the songs array.
    return songs.filter(
      (song) =>
        // Check if the song's title or artist includes the search query (case-insensitive).
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, songs]);

  const songIndex = useMemo(() => {
    return currentSong
      ? filteredSongs.findIndex((s) => s.id === currentSong.id)
      : -1;
  }, [currentSong, filteredSongs]);

  const handleNext = () => {
    if (songIndex === -1) return;
    const nextIndex = (songIndex + 1) % filteredSongs.length;
    setCurrentSong(filteredSongs[nextIndex]);
  };

  const handlePrev = () => {
    if (songIndex === -1) return;
    const prevIndex =
      (songIndex - 1 + filteredSongs.length) % filteredSongs.length;
    setCurrentSong(filteredSongs[prevIndex]);
  };

  const handleClosePlayer = () => {
    setCurrentSong(null);
  };

  return (
    <div className="space-y-8">
      {/* Header section with the title and search bar. */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-4xl font-bold text-white tracking-tight">
          Discover Music
        </h1>
        {/* The search input field. Its value is controlled by the searchQuery state. */}
        <input
          type="text"
          placeholder="Search for songs or artists..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-72 px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* The SongList component is rendered with the filtered list of songs. */}
      <SongList songs={filteredSongs} onSelectSong={setCurrentSong} />

      {/* Conditionally render the Player as a modal if a song is selected. */}
      {currentSong && (
        <Player
          song={currentSong}
          onNext={handleNext}
          onPrev={handlePrev}
          onClose={handleClosePlayer}
        />
      )}
    </div>
  );
};

export default HomePage;
