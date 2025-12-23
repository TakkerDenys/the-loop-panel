import type {SignUpRequest, LoginRequest, AuthResponse} from './types';
import type {StopPlayerRequest, RemoveVideoRequest, ChangeOrderRequest} from './videoTypes';

const API_URL = 'http://localhost:3000/api';

async function fetchAPI(endpoint: string, options?: RequestInit) {
    const url = `${API_URL}${endpoint}`;

    const response = await fetch(url, {
        ...options,  // Спочатку розгортаємо options
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,  // ПОТІМ мержимо headers
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Request failed');
    }

    return response.json();
}

async function fetchAPIWithAuth(endpoint: string, options?: RequestInit) {
    const token = localStorage.getItem('jwt');
    return fetchAPI(endpoint, {
        ...options,
        headers: {
            ...options?.headers,
            Authorization: `Bearer ${token}`,
        },
    });
}

async function fetchMultipart(endpoint: string, formData: FormData) {
    const token = localStorage.getItem('jwt');
    const url = `${API_URL}${endpoint}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json();
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

export const videoPlayerApi = {
    upload: async (file: File, description: string): Promise<any> => {
        const formData = new FormData();
        formData.append('video', file);
        formData.append('description', description);
        return fetchMultipart('/video-player/upload', formData);
    },

    getOwn: async (): Promise<any> => {
        return fetchAPIWithAuth('/video-player/own', {method: 'GET'});
    },

    stop: async (data: StopPlayerRequest): Promise<any> => {
        return fetchAPIWithAuth('/video-player/stop', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    removeVideo: async (data: RemoveVideoRequest): Promise<any> => {
        console.log('[API] removeVideo - data:', data);
        console.log('[API] removeVideo - JSON.stringify:', JSON.stringify(data));
        return fetchAPIWithAuth('/video-player/remove-video', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    changeOrder: async (data: ChangeOrderRequest): Promise<any> => {
        return fetchAPIWithAuth('/video-player/change-order-of-video', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    launch: async (): Promise<any> => {
        return fetchAPIWithAuth('/video-player/launch', {method: 'POST'});
    },

    getAll: async (): Promise<any> => {
        return fetchAPIWithAuth('/video-player', {method: 'GET'});
    },

    getOne: async (id: string): Promise<any> => {
        return fetchAPIWithAuth(`/video-player/${id}`, {method: 'GET'});
    },

    remove: async (id: string): Promise<any> => {
        return fetchAPIWithAuth(`/video-player/${id}`, {method: 'DELETE'});
    },
};