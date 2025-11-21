import {create} from 'zustand';
import type {User, LoginCredentials, RegisterCredentials} from '../lib/types';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (credentials: LoginCredentials) => void;
    register: (credentials: RegisterCredentials) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,

    login: (credentials) => {
        // Fake login - просто створюємо користувача
        const fakeUser: User = {
            id: Date.now().toString(),
            name: 'User',  // Поки що захардкоджено
            email: credentials.email,
        };
        set({user: fakeUser, isAuthenticated: true});
    },

    register: (credentials) => {
        // Fake register - створюємо користувача з даних реєстрації
        const newUser: User = {
            id: Date.now().toString(),
            name: credentials.name,
            email: credentials.email,
        };
        set({user: newUser, isAuthenticated: true});
    },

    logout: () => {
        set({user: null, isAuthenticated: false});
    },
}));