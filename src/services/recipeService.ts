const baseUrl = (import.meta as any).env.VITE_API_URL?.replace('/auth', '') || 'http://localhost:8000/api/v1';
const API_URL = `${baseUrl}/recipe`;

export const getSavedRecipesService = async (userId: string) => {
    const res = await fetch(`${API_URL}/${userId}`);
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to fetch saved recipes');
    return result;
};

export const saveRecipeService = async (userId: string, recipe: any) => {
    const res = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, recipe }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to save recipe');
    return result;
};

export const deleteSavedRecipeService = async (userId: string, recipeId: string) => {
    const res = await fetch(`${API_URL}/${userId}/${recipeId}`, {
        method: 'DELETE',
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to delete saved recipe');
    return result;
};
