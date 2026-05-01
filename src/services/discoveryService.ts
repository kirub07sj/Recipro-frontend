const API_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/auth$/, '') : 'http://localhost:8000/api/v1';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

export const searchMealsByNameService = async (name: string) => {
    try {
        const response = await fetch(`${API_URL}/discovery/search?name=${encodeURIComponent(name)}`, {
            headers: getAuthHeaders()
        });
        const data = await response.json();
        return data.success ? data.data : [];
    } catch (error) {
        console.error('Error searching meals:', error);
        return [];
    }
};

export const listMealsByLetterService = async (letter: string) => {
    try {
        const response = await fetch(`${API_URL}/discovery/letter?letter=${encodeURIComponent(letter)}`, {
            headers: getAuthHeaders()
        });
        const data = await response.json();
        return data.success ? data.data : [];
    } catch (error) {
        console.error('Error listing meals by letter:', error);
        return [];
    }
};

export const lookupMealByIdService = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/discovery/lookup/${id}`, {
            headers: getAuthHeaders()
        });
        const data = await response.json();
        return data.success ? data.data : null;
    } catch (error) {
        console.error('Error looking up meal:', error);
        return null;
    }
};

export const getRandomMealService = async () => {
    try {
        const response = await fetch(`${API_URL}/discovery/random`, {
            headers: getAuthHeaders()
        });
        const data = await response.json();
        return data.success ? data.data : null;
    } catch (error) {
        console.error('Error fetching random meal:', error);
        return null;
    }
};
