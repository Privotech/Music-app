// Royalty-free music from Pixabay
// This array holds placeholder URLs for the actual song audio files.
const placeholderUrls = [
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
];

// This object contains the list of artists and their corresponding song titles.
const artists = {
  "Juice WRLD": [
    "Lucid Dreams", "All Girls Are the Same", "Robbery", "Wishing Well", "Bandit",
    "Lean Wit Me", "Legends", "Righteous", "Come & Go", "Hate the Other Side",
    "Conversations", "Life's a Mess", "Armed and Dangerous", "Black & White", "Empty",
    "Fast", "Hear Me Calling", "Make Believe", "Scared of Love", "Used To"
  ],
  "Alan Walker": [
    "Faded", "Alone", "The Spectre", "On My Way", "Darkside", "Sing Me to Sleep",
    "Lily", "All Falls Down", "Diamond Heart", "Different World", "Force", "Routine",
    "Ignite", "Hope", "Tired", "Lost Control", "Heading Home", "Alone, Pt. II",
    "End of Time", "Play"
  ],
  "Gims": [
    "Bella", "J'me tire", "Sapés comme jamais", "Est-ce que tu m'aimes ?", "Laissez passer",
    "La Même", "Corazón", "Mi Gna", "Zombie", "Le pire", "Reste", "Hola Señorita",
    "Malheur, malheur", "Tout donner", "Caméléon", "Warano Style", "Brisé", "Je te pardonne",
    "Longue vie", "Maintenant"
  ],
  "Central Cee": [
    "Doja", "Obsessed With You", "Loading", "Commitment Issues", "Day in the Life",
    "6 for 6", "Khabib", "Little Bit of This", "Ungrateful", "Fraud", "Pinging (6 Figures)",
    "The Bag", "Tension", "Straight Back to It", "Retail Therapy", "Cold Shoulder",
    "Mrs", "Eurovision", "Chapters", "Let Go"
  ],
  "Connor Price": [
    "Spinnin", "The Man", "Violet", "Courage", "Splat", "Trendsetter", "Buddy",
    "False Alarm", "My Own Thing", "Lucky", "Headspace", "Till It's Over", "Trick",
    "On the Low", "Yours", "Now", "Stuck", "The Crash", "Time", "A-List"
  ],
  "BTS": [
    "Dynamite", "Butter", "Permission to Dance", "Life Goes On", "Boy With Luv",
    "ON", "IDOL", "FAKE LOVE", "DNA", "Blood Sweat & Tears", "Spring Day", "Not Today",
    "MIC Drop", "Save ME", "I NEED U", "Run", "Dope", "Fire", "Yet To Come", "For Youth"
  ],
  "Burna Boy": [
    "Last Last", "On the Low", "Ye", "Gbona", "Anybody", "Kilometre", "Location",
    "For My Hand", "Common Person", "It's Plenty"
  ],
  "Wizkid": [
    "Essence", "Joro", "Fever", "Come Closer", "Soco", "Ojuelegba", "Brown Skin Girl",
    "No Stress", "Ginger", "Blessed"
  ],
  "Davido": [
    "Fall", "If", "FEM", "Assurance", "Jowo", "The Best", "Holy Ground",
    "Blow My Mind", "Risky", "Sweet in the Middle"
  ],
  "BLACKPINK": [
    "DDU-DU DDU-DU", "Kill This Love", "How You Like That", "Lovesick Girls", "Pink Venom",
    "As If It's Your Last", "BOOMBAYAH", "Playing with Fire", "Whistle", "Ice Cream"
  ]
};

// Initialize a counter for unique song IDs.
let songId = 1;
// The main export of this file: an array of song objects.
export const songs = [
  // Use flatMap to iterate over the artists and create a single array of song objects.
  ...Object.entries(artists).flatMap(([artist, titles]) =>
    titles.map((title, index) => {
      const currentId = songId++;
      // Each song object has an id, title, artist, artwork, and a URL for the audio.
      return {
        id: currentId,
        title,
        artist,
        artwork: `https://picsum.photos/seed/${currentId}/400`,
        url: placeholderUrls[index % placeholderUrls.length],
      };
    })
  ),
  // Sort the final array of songs alphabetically by title.
].sort((a, b) => a.title.localeCompare(b.title));