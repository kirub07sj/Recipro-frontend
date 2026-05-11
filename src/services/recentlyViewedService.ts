const baseUrl = (import.meta as any).env.VITE_API_URL?.replace('/auth', '') || 'http://localhost:8000/api/v1';
const API_URL = `${baseUrl}/recently-viewed`;

export const getRecentlyViewedService = async (userId: string, limit: number = 10) => {
    const res = await fetch(`${API_URL}/${userId}?limit=${limit}`);
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to fetch recently viewed recipes');
    return result;
};

export const recordRecipeViewService = async (userId: string, recipe: any) => {
    const res = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, recipe }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to record recipe view');
    return result;
};
