
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ showLogo = true }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full h-20 bg-white py-4  flex items-center md:px-[18%] px-4">
      <nav className="w-full max-w-5xl flex items-center">
        <div className="flex items-center">
          {showLogo && (
            <img src="/hp-logo.svg" alt="HP Logo" className="h-10 w-auto mr-4 inline-block align-middle" />
          )}
          {/* Desktop Menu */}
          <ul className="hidden md:flex flex-row gap-8 items-center">
            <li className="text-gray-500 text-lg font-normal">OfficeJet</li>
            <li className="text-gray-500 text-lg font-normal">DeskJet</li>
            <li className="text-gray-500 text-lg font-normal">ENVY</li>
            <li className="text-gray-500 text-lg font-normal">LaserJet</li>
          </ul>
        </div>
        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center ml-auto">
          <button
            aria-label="Open menu"
            className="focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-7 h-7 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="absolute top-20 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-6 z-50 md:hidden animate-fade-in">
            <li className="text-gray-500 text-lg font-normal">OfficeJet</li>
            <li className="text-gray-500 text-lg font-normal">DeskJet</li>
            <li className="text-gray-500 text-lg font-normal">ENVY</li>
            <li className="text-gray-500 text-lg font-normal">LaserJet</li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
