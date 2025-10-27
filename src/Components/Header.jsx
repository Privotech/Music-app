import React from "react";
import { NavLink } from "react-router-dom";

// The Header component provides navigation for the application.
const Header = () => {
  // Style object for the active navigation link.
  const activeLinkStyle = {
    color: "#3b82f6", // blue-500
    borderBottom: "2px solid #3b82f6",
  };

  return (
    // The header bar container.
    <header className="bg-gray-800 p-4 shadow-md flex justify-between items-center">
      {/* The application logo, which links back to the home page. */}
      <NavLink to="/" className="text-2xl font-bold text-white">
        MusicApp
      </NavLink>
      {/* The main navigation links. */}
      <nav>
        <ul className="flex space-x-6">
          <li>
            {/* NavLink to the Home page with active styling. */}
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              className="text-white hover:text-blue-400 transition-colors"
            >
              Home
            </NavLink>
          </li>
          <li>
            {/* NavLink to the Search page (currently links to a non-existent route, but ready for implementation). */}
            <NavLink
              to="/search"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              className="text-white hover:text-blue-400 transition-colors"
            >
              Search
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
