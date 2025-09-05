import React from 'react';
import { Link } from 'react-router-dom';
import { useRecipes } from '../contexts/RecipeContext';

const RecipeList = () => {
  const { recipes } = useRecipes();

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">My Recipes</h2>
          <p className="text-gray-600">Discover and manage your favorite recipes</p>
        </div>
        <Link
          to="/add"
          className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
        >
          <span>+</span>
          Add Recipe
        </Link>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">No recipes yet</h3>
          <p className="text-gray-500 mb-6">Start by adding your first recipe!</p>
          <Link
            to="/add"
            className="bg-red-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 inline-block"
          >
            Create Your First Recipe
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden group"
            >
              {recipe.image ? (
                <div className="relative overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ) : (
                <div className="w-full h-48 bg-red-100 flex items-center justify-center">
                  <span className="text-4xl">🍳</span>
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors duration-200">
                  {recipe.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {recipe.ingredients?.length || 0} ingredients
                  </span>
                  <Link
                    to={`/recipe/${recipe.id}`}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    View Recipe
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;