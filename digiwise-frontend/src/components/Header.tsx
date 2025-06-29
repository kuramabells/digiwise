import React, { useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            DigiWise
            <span className="block text-xs text-gray-500 font-normal">
              Digitally Wise
            </span>
          </Link>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
            About
          </Link>
          <Link to="/resources" className="text-gray-600 hover:text-blue-600 transition-colors">
            Resources
          </Link>
          <Link to="/auth" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
            Take Assessment
          </Link>
        </nav>
        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-600 focus:outline-none" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 shadow-md">
          <nav className="flex flex-col space-y-4">
            <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link to="/resources" className="text-gray-600 hover:text-blue-600 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              Resources
            </Link>
            <Link to="/auth" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors w-full text-center" onClick={() => setIsMenuOpen(false)}>
              Take Assessment
            </Link>
          </nav>
        </div>}
    </header>;
};