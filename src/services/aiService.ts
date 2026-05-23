const envUrl = (import.meta as any).env.VITE_API_URL || '';
const BASE_URL = envUrl ? envUrl.replace('/auth', '') : 'http://localhost:8000/api/v1';
const API_URL = `${BASE_URL}/ai`;

export const extractIngredientsFromImage = async (file: File, userId?: string | null) => {
    const formData = new FormData();
    formData.append('image', file);
    if (userId) {
        formData.append('userId', userId);
    }

    const res = await fetch(`${API_URL}/extract-ingredients`, {
        method: 'POST',
        body: formData, // fetch will automatically set the correct Content-Type for FormData
    });

    const result = await res.json();
    if (!result.success) throw new Error(result.message || 'Failed to extract ingredients');
    return result;
};

export const generateRecipeVariants = async (userId: string | undefined | null, ingredients: string[], healthProfile: any, isManual: boolean = false) => {
    const res = await fetch(`${API_URL}/generate-recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ingredients, healthProfile, isManual })
    });

    const result = await res.json();
    if (!result.success) {
        const error = new Error(result.message || 'Failed to generate recipes') as any;
        error.invalidIngredients = result.invalidIngredients;
        throw error;
    }
    return result;
};
