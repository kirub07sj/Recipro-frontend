const envUrl = (import.meta as any).env.VITE_API_URL || '';
const BASE_URL = envUrl ? envUrl.replace('/auth', '') : 'http://localhost:8000/api/v1';
const API_URL = `${BASE_URL}/user`;

export const updateUserProfile = async (
    userId: string,
    data: { username?: string; currentPassword?: string; newPassword?: string }
) => {
    const res = await fetch(`${API_URL}/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
    });
    
    const result = await res.json();
    if (!result.success) throw new Error(result.message || 'Failed to update profile');
    return result;
};
