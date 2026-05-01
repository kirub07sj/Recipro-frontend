const baseUrl = (import.meta as any).env.VITE_API_URL?.replace('/auth', '') || 'http://localhost:8000/api/v1';
const API_URL = `${baseUrl}/health`;

export const getHealthProfileService = async (userId: string) => {
    const res = await fetch(`${API_URL}/${userId}`);
    
    // Explicitly handle 404 to gracefully support users without a health profile yet
    if (res.status === 404) {
        return { data: null };
    }
    
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to fetch health profile');
    return result;
};

export const createHealthProfileService = async (data: { user: string; health: string[]; preference: string[] }) => {
    const res = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to create health profile');
    return result;
};

export const updateHealthProfileService = async (userId: string, data: any) => {
    const res = await fetch(`${API_URL}/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Failed to update health profile');
    return result;
};
