const baseUrl = (import.meta as any).env.VITE_API_URL?.replace('/auth', '') || 'http://localhost:8000/api/v1';
const API_URL = `${baseUrl}/intake`;

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const consumeRecipeService = async (recipe: { id: string, title: string, calories: number }) => {
    const res = await fetch(`${API_URL}/consume`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ recipe })
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to consume recipe');
    return result;
};

export const getTodayIntakeService = async () => {
    const res = await fetch(`${API_URL}/today`, {
        headers: getAuthHeaders()
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to fetch today intake');
    return result;
};
