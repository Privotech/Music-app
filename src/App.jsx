import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlayerPage from "./Pages/PlayerPage.jsx";
import Header from "./components/Header.jsx";
import HomePage from "./Pages/HomePage.jsx";

function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <Header />
      <main className="p-4 md:p-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/song" element={<PlayerPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
