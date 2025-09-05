import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <>
      {/* for Desktop/Tab */}
      <nav className="hidden sm:block fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/90 backdrop-blur-md rounded-full shadow-2xl border border-white/20 px-6 py-3 flex items-center gap-6">
          <Link
            to="/"
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
              location.pathname === '/'
                ? 'bg-red-500 text-white shadow-lg'
                : 'text-gray-700 hover:bg-gray-100 hover:text-red-600'
            }`}
          >
            <span>🏠</span>
            <span>Home</span>
          </Link>

          <Link
            to="/add"
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
              location.pathname === '/add'
                ? 'bg-red-500 text-white shadow-lg'
                : 'text-gray-700 hover:bg-gray-100 hover:text-red-600'
            }`}
          >
            <span>➕</span>
            <span>Add Recipe</span>
          </Link>

          <div className="text-xl font-bold text-red-600">
            🍳 Recipe Manager
          </div>
        </div>
      </nav>

      {/* for mobile - Bottom */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200">
        <div className="flex items-center justify-around px-4 py-3">
          <Link
            to="/"
            className={`flex flex-col items-center gap-1 p-2 rounded-lg font-medium transition-all duration-200 ${
              location.pathname === '/'
                ? 'bg-red-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100 hover:text-red-600'
            }`}
          >
            <span className="text-lg">🏠</span>
            <span className="text-xs">Home</span>
          </Link>

          <Link
            to="/add"
            className={`flex flex-col items-center gap-1 p-2 rounded-lg font-medium transition-all duration-200 ${
              location.pathname === '/add'
                ? 'bg-red-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100 hover:text-red-600'
            }`}
          >
            <span className="text-lg">➕</span>
            <span className="text-xs">Add Recipe</span>
          </Link>

          <div className="flex flex-col items-center gap-1 p-2">
            <span className="text-lg">🍳</span>
            <span className="text-xs font-bold text-red-600">
              Recipes
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;