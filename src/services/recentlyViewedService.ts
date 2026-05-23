const baseUrl = (import.meta as any).env.VITE_API_URL?.replace('/auth', '') || 'http://localhost:8000/api/v1';
const API_URL = `${baseUrl}/recently-viewed`;

export const getRecentlyViewedService = async (userId: string, limit: number = 10) => {
    const res = await fetch(`${API_URL}/${userId}?limit=${limit}`);
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to fetch recently viewed recipes');
    return result;
};

export const recordRecipeViewService = async (userId: string, recipe: any) => {
    const resolvedId = recipe?.recipeId || recipe?.id || recipe?._id;
    if (!userId || !resolvedId) return;

    const payload = {
        ...recipe,
        recipeId: resolvedId,
    };

    const res = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, recipe: payload }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to record recipe view');
    return result;
};

export const clearRecentlyViewedService = async (userId: string) => {
    if (!userId) return;
    const res = await fetch(`${API_URL}/${userId}`, {
        method: 'DELETE',
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to clear recently viewed recipes');
    return result;
};
