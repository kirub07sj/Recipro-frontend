
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Public imports
import Login from '../pages/Auth/LoginPage';
import Register from '../pages/Auth/RegisterPage';
import ForgetPassword from '../pages/Auth/ForgotPasswordPage';
import LandingPage from '../pages/public/LandingPage';

// Protected imports
import Dashboard from '../pages/Dashboard/Dashboard';
import Profile from '../pages/Dashboard/Profile';
import GenerateRecipe from '../pages/Recipe/GenerateRecipe';
import RecipeDetails from '../pages/Recipe/RecipeDetails';
import SavedRecipe from '../pages/Recipe/SavedRecipe';

import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../components/layout/MainLayout';

const AppRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgetPassword />} />

                {/* Protected Routes */}
                <Route element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/generate-recipe" element={<GenerateRecipe />} />
                    <Route path="/recipe/:id" element={<RecipeDetails />} />
                    <Route path="/saved-recipes" element={<SavedRecipe />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoute;
