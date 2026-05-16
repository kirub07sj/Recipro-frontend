const envUrl = (import.meta as any).env.VITE_API_URL || '';
const BASE_URL = envUrl ? envUrl.replace('/auth', '') : 'http://localhost:8000/api/v1';
const API_URL = `${BASE_URL}/scans`;

export const getUserScansService = async (userId: string) => {
    try {
        const response = await fetch(`${API_URL}/${userId}`);
        const result = await response.json();
        if (!result.success) throw new Error(result.message || 'Failed to fetch scans');
        return result.data;
    } catch (error) {
        console.error('Error fetching user scans:', error);
        return [];
    }
};

export const deleteScanService = async (scanId: string) => {
    try {
        const response = await fetch(`${API_URL}/${scanId}`, {
            method: 'DELETE'
        });
        const result = await response.json();
        return result.success;
    } catch (error) {
        console.error('Error deleting scan:', error);
        return false;
    }
};
