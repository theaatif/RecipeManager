import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecipeProvider } from './contexts/RecipeContext';
import Navbar from './components/Navbar';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import AddRecipe from './components/AddRecipe';

function App() {
  return (
    <RecipeProvider>
      <Router>
        <div className="min-h-screen bg-yellow-50">
          <Navbar />

          <main className="container mx-auto p-6 pt-24 pb-20 sm:pb-6">
            <Routes>
              <Route path="/" element={<RecipeList />} />
              <Route path="/recipe/:id" element={<RecipeDetails />} />
              <Route path="/add" element={<AddRecipe />} />
            </Routes>
          </main>

          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </RecipeProvider>
  );
}

export default App;
