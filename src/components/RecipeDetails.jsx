import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecipes } from "../contexts/RecipeContext";

const RecipeDetails = () => {
  const { id } = useParams();
  const { recipes, setRecipes } = useRecipes();
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [isEditingSteps, setIsEditingSteps] = useState(false);
  const [editedSteps, setEditedSteps] = useState("");

  useEffect(() => {
    const foundRecipe = recipes.find((r) => r.id === parseInt(id));
    if (foundRecipe) {
      setRecipe(foundRecipe);
      setIngredients(foundRecipe.ingredients || []);
      setEditedSteps(foundRecipe.steps.join("\n"));
    }
  }, [id, recipes]);

  const toggleAvailability = (index) => {
    const updatedIngredients = ingredients.map((ing, i) =>
      i === index ? { ...ing, available: !ing.available } : ing
    );
    setIngredients(updatedIngredients);

    // Update recipes in context
    const updatedRecipes = recipes.map((r) => {
      if (r.id === parseInt(id)) {
        return { ...r, ingredients: updatedIngredients };
      }
      return r;
    });
    setRecipes(updatedRecipes);
    toast.success("Ingredient availability updated!");
  };

  const handleEditSteps = () => {
    setIsEditingSteps(true);
  };

  const handleSaveSteps = () => {
    const updatedSteps = editedSteps.split("\n").filter((step) => step.trim());
    if (updatedSteps.length === 0) {
      toast.error("Steps cannot be empty!");
      return;
    }

    const updatedRecipes = recipes.map((r) => {
      if (r.id === parseInt(id)) {
        return { ...r, steps: updatedSteps };
      }
      return r;
    });
    setRecipes(updatedRecipes);
    setRecipe({ ...recipe, steps: updatedSteps });
    setIsEditingSteps(false);
    toast.success("Steps updated successfully!");
  };

  const handleCancelEdit = () => {
    setEditedSteps(recipe.steps.join("\n"));
    setIsEditingSteps(false);
  };

  // Prevent whitespace as first character
  const handleTextareaChange = (setter) => (e) => {
    const value = e.target.value;
    if (value.length === 1 && value === " ") {
      return; // Don't allow space as first character
    }
    setter(value);
  };

  if (!recipe) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-red-600 hover:text-red-800 font-medium mb-6 transition-colors duration-200"
      >
        <span>←</span>
        Back to Recipes
      </Link>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {recipe.image && (
          <div className="relative">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        )}

        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            {recipe.name}
          </h1>

          {/* Ingredients Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              Ingredients
            </h3>
            <div className="bg-gray-50 rounded-xl p-6">
              <ul className="space-y-3">
                {ingredients.map((ing, index) => (
                  <li
                    key={index}
                    className={`flex justify-between items-center p-3 rounded-lg transition-all duration-200 ${
                      ing.available
                        ? "bg-white shadow-sm hover:shadow-md"
                        : "bg-red-50 border border-red-200"
                    }`}
                  >
                    <span
                      className={`font-medium ${
                        !ing.available ? "text-red-700" : "text-gray-700"
                      }`}
                    >
                      {ing.name}
                    </span>
                    <button
                      onClick={() => toggleAvailability(index)}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 transform hover:scale-105 ${
                        ing.available
                          ? "bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg"
                          : "bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg"
                      }`}
                    >
                      {ing.available ? "✓ Available" : "✗ Missing"}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Steps Section */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              Preparation Steps
            </h3>

            {isEditingSteps ? (
              <div className="bg-gray-50 rounded-xl p-6">
                <textarea
                  value={editedSteps}
                  onChange={handleTextareaChange(setEditedSteps)}
                  className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  rows="6"
                  placeholder="Enter each step on a new line..."
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleSaveSteps}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-6">
                <ol className="space-y-4 mb-6">
                  {recipe.steps.map((step, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 leading-relaxed pt-1">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
                <button
                  onClick={handleEditSteps}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                >
                  Edit Steps
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
