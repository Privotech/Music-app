import React, { useState, useRef, useEffect } from "react";


const Player = ({ song, onNext, onPrev, onClose }) => {

  const [isPlaying, setIsPlaying] = useState(false);

  const [duration, setDuration] = useState(0);

  const [currentTime, setCurrentTime] = useState(0);

  const [volume, setVolume] = useState(0.8);


  const audioRef = useRef(null);
  const progressBarRef = useRef(null);


  useEffect(() => {
    setIsPlaying(true);
    const audio = audioRef.current;
    if (audio && song.url) {

      const handleMetadata = () => {
        setDuration(audio.duration);
        setCurrentTime(0);

        setIsPlaying(true);
      };

      audio.addEventListener("loadedmetadata", handleMetadata);

      audio.src = song.url;
      audio.load();


      return () => {
        audio.removeEventListener("loadedmetadata", handleMetadata);
        audio.pause();
      };
    }
  }, [song.id, song.url]);

  // This effect handles play/pause, time updates, and cleanup.
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Function to update the current time state as the song plays.
      const setAudioTime = () => setCurrentTime(audio.currentTime);
      // Function to automatically play the next song when the current one finishes.
      const handleEnd = () => {
        if (onNext) onNext();
      };

      // Add event listeners for time updates and when the song ends.
      audio.addEventListener("timeupdate", setAudioTime);
      audio.addEventListener("ended", handleEnd);

      if (isPlaying) {
        audio
          .play()
          .catch((error) => console.error("Error playing audio:", error));
      } else {
        audio.pause();
      }

      // Cleanup function to remove event listeners.
      return () => {
        audio.removeEventListener("timeupdate", setAudioTime);
        audio.removeEventListener("ended", handleEnd);
      };
    }
  }, [isPlaying, onNext]);

  // Toggles the play/pause state.
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Helper function to format time in minutes and seconds (e.g., 2:05).
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Handles seeking through the song when the user drags the progress bar.
  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };

  // Handles volume changes from the volume slider.
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  };

  return (
    // Main container for the player modal.
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-xl scale-110"
        style={{ backgroundImage: `url(${song.artwork})` }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 w-full max-w-md bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-6 text-white">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <img
          src={song.artwork}
          alt={song.title}
          className="w-full h-64 object-cover rounded-lg shadow-lg mb-6"
        />

        {/* Song title and artist. */}

        <div className="text-center">
          <h2 className="text-3xl font-bold">{song.title}</h2>
          <p className="text-lg text-gray-300 mb-6">{song.artist}</p>
        </div>
        <audio ref={audioRef} preload="metadata"></audio>

        {/* Progress bar section. */}
        <div className="w-full">
          <input
            type="range"
            ref={progressBarRef}
            value={currentTime}
            max={duration || 0}
            onChange={handleProgressChange}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />


          <div className="flex justify-between text-sm text-gray-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>


        <div className="flex items-center justify-center space-x-8 mt-6">
          <button
            onClick={onPrev}
            className="text-gray-300 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={togglePlayPause}
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transform hover:scale-110 transition-transform"
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 9v6m4-6v6"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
              </svg>
            )}
          </button>
          <button
            onClick={onNext}
            className="text-gray-300 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Volume control section. */}
        <div className="flex items-center space-x-3 mt-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.858 8.464a5 5 0 000 7.072m2.828 2.828a9 9 0 000-12.728"
            />
          </svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
