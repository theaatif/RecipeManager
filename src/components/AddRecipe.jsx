  import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecipes } from '../contexts/RecipeContext';

const AddRecipe = () => {
  const { recipes, setRecipes } = useRecipes();
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  // to prevent whitespace as first character
  const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    if (value.length === 1 && value === ' ') {
      return; // Don't allow space as first character
    }
    setter(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trim and validate name
    const trimmedName = name.trim();
    if (!trimmedName) {
      toast.error('Please enter a recipe name!');
      return;
    }

    // Validate ingredients: split by comma, trim, filter empty, check if any remain
    const ingredientList = ingredients.split(',').map(ing => ing.trim()).filter(ing => ing);
    if (ingredientList.length === 0) {
      toast.error('Please enter at least one ingredient!');
      return;
    }

    // Validate steps: split by newline, trim, filter empty, check if any remain
    const stepList = steps.split('\n').map(step => step.trim()).filter(step => step);
    if (stepList.length === 0) {
      toast.error('Please enter at least one step!');
      return;
    }

    const newRecipe = {
      id: Date.now(),
      name: trimmedName,
      ingredients: ingredientList.map(ing => ({ name: ing, available: false })),
      steps: stepList,
      image: image.trim() || null
    };

    setRecipes([...recipes, newRecipe]);

    toast.success('Recipe added successfully!');
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-red-600 hover:text-red-800 font-medium mb-6 transition-colors duration-200"
      >
        <span>←</span>
        Back to Home
      </Link>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🍳</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create New Recipe</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Recipe Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={handleInputChange(setName)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-red-400"
              placeholder="Enter recipe name..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ingredients (comma-separated) *
            </label>
            <textarea
              value={ingredients}
              onChange={handleInputChange(setIngredients)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-red-400"
              rows="4"
              placeholder="e.g., flour, sugar, eggs, milk"
            />
            <p className="text-sm text-gray-500 mt-1">Separate each ingredient with a comma</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preparation Steps (one per line) *
            </label>
            <textarea
              value={steps}
              onChange={handleInputChange(setSteps)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-red-400"
              rows="6"
              placeholder="1. Preheat oven to 350°F&#10;2. Mix ingredients&#10;3. Bake for 30 minutes"
            />
            <p className="text-sm text-gray-500 mt-1">Write each step on a new line</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Recipe Image URL (optional)
            </label>
            <input
              type="url"
              value={image}
              onChange={handleInputChange(setImage)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-red-400"
              placeholder="https://example.com/img.jpg"
            />
            <p className="text-sm text-gray-500 mt-1">Add a beautiful image of your finished dish</p>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Create Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;