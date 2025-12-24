import {create} from 'zustand';
import type {User, LoginCredentials, RegisterCredentials} from '../lib/types';
import {authApi} from '../lib/api';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    initialize: () => void;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    initialize: () => {
        const token = localStorage.getItem('jwt');
        if (token) {
            set({
                user: {
                    id: 'user-id',
                    name: 'User',
                    email: 'user@example.com',
                },
                isAuthenticated: true,
            });
        }
    },

    login: async (credentials) => {
        set({isLoading: true, error: null});
        try {
            const response = await authApi.login({
                email: credentials.email,
                password: credentials.password,
            });

            localStorage.setItem('jwt', response.jwt);

            const user: User = {
                id: 'temp-id',
                name: 'User',
                email: credentials.email,
            };

            set({user, isAuthenticated: true, isLoading: false});
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Login failed',
                isLoading: false,
            });
        }
    },

    register: async (credentials) => {
        set({isLoading: true, error: null});
        try {
            const response = await authApi.signup({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
            });

            localStorage.setItem('jwt', response.jwt);

            const user: User = {
                id: 'temp-id',
                name: credentials.name,
                email: credentials.email,
            };

            set({user, isAuthenticated: true, isLoading: false});
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Registration failed',
                isLoading: false,
            });
        }
    },

    logout: async () => {
        try {
            await authApi.logout();
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            localStorage.removeItem('jwt');
            set({user: null, isAuthenticated: false, error: null});
        }
    },
}));