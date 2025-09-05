import React, { createContext, useContext, useState, useEffect } from 'react';

const RecipeContext = createContext();

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load recipes from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('recipes');
      // console.log('Loading from localStorage:', stored);
      const storedRecipes = JSON.parse(stored || '[]');
      // console.log('Parsed recipes:', storedRecipes);
      setRecipes(storedRecipes);
      setIsLoaded(true);
    } catch (error) {
      console.error('Error loading recipes from localStorage:', error);
      setRecipes([]);
      setIsLoaded(true);
    }
  }, []);

  // Save recipes to localStorage whenever recipes change (but not on initial load)
  useEffect(() => {
    if (!isLoaded) return; // Don't save until we've loaded from localStorage
    try {
      const recipesJson = JSON.stringify(recipes);
      // console.log('Saving to localStorage:', recipesJson);
      localStorage.setItem('recipes', recipesJson);
    } catch (error) {
      console.error('Error saving recipes to localStorage:', error);
    }
  }, [recipes, isLoaded]);

  return (
    <RecipeContext.Provider value={{ recipes, setRecipes }}>
      {children}
    </RecipeContext.Provider>
  );
};