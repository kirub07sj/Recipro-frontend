
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Public imports
import Login from '../pages/Auth/LoginPage';
import Register from '../pages/Auth/RegisterPage';
import ForgetPassword from '../pages/Auth/ForgotPasswordPage';
import LandingPage from '../pages/public/LandingPage';
import HomePage from '../pages/HomePage';

// Protected imports
import Dashboard from '../pages/Dashboard/Dashboard';
import Profile from '../pages/Dashboard/Profile';
import GenerateRecipe from '../pages/Recipe/GenerateRecipe';
import RecipeDetails from '../pages/Recipe/RecipeDetails';
import SavedRecipe from '../pages/Recipe/SavedRecipe';

import ProtectedRoute from './ProtectedRoute';

const AppRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgetPassword />} />

                {/* Protected Routes */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/generate-recipe"
                    element={
                        <ProtectedRoute>
                            <GenerateRecipe />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/recipe/:id"
                    element={
                        <ProtectedRoute>
                            <RecipeDetails />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/saved-recipes"
                    element={
                        <ProtectedRoute>
                            <SavedRecipe />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoute;
