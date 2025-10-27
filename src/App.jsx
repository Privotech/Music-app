import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import Header from "./components/Header.jsx";

// The main App component sets up the overall structure and routing for the application.
function App() {
  return (
    // The main container for the entire application.
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      {/* The Header component is displayed on all pages. */}
      <Header />
      {/* The main content area where pages will be rendered based on the route. */}
      <main className="p-4 md:p-8">
        {/* The Routes component defines the different pages of the application. */}
        <Routes>
          {/* The home page, which displays the list of all songs. */}
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
