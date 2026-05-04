const envUrl = (import.meta as any).env.VITE_API_URL || '';
const BASE_URL = envUrl ? envUrl.replace(/\/auth$/, '') : 'http://localhost:8000/api/v1';
const API_URL = `${BASE_URL}/ingredients`;

export interface IngredientSuggestion {
    name: string;
    category: string;
    confidence: number;
}

export interface SearchResponse {
    success: boolean;
    query: string;
    suggestions: IngredientSuggestion[];
}

/**
 * Search for ingredients using fuzzy matching on the backend.
 * @param query - The user input to search for
 * @returns List of ingredient suggestions
 */
export const searchIngredients = async (query: string): Promise<SearchResponse> => {
    try {
        if (!query || query.trim().length < 2) {
            return { success: true, query, suggestions: [] };
        }

        const res = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
        const result = await res.json();
        
        return result;
    } catch (error) {
        console.error('Error searching ingredients:', error);
        return { success: false, query, suggestions: [] };
    }
};
