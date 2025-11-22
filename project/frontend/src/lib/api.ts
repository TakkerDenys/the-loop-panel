import type {SignUpRequest, LoginRequest, AuthResponse} from './types';

const API_URL = 'http://localhost:3000/api';

async function fetchAPI(endpoint: string, options?: RequestInit) {
    const url = `${API_URL}${endpoint}`;

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        ...options,
    });

    if (!response.ok) {
        const error = await response.json();
        console.error('❌ Error response:', error);
        throw new Error(error.message || 'Request failed');
    }

    return response.json();
}

export const authApi = {
    signup: async (data: SignUpRequest): Promise<AuthResponse> => {
        return fetchAPI('/auth/signup', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    login: async (data: LoginRequest): Promise<AuthResponse> => {
        return fetchAPI('/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    logout: async (): Promise<void> => {
        const token = localStorage.getItem('jwt');
        return fetchAPI('/auth/logout', {
            method: 'POST',
            headers: {Authorization: `Bearer ${token}`},
        });
    },

    refresh: async (): Promise<AuthResponse> => {
        const token = localStorage.getItem('jwt');
        return fetchAPI('/auth/refresh', {
            method: 'POST',
            headers: {Authorization: `Bearer ${token}`},
        });
    },
};