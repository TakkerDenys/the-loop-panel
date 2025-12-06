export type AdminPage = 'control' | 'view' | 'settings';

export interface MenuItem {
    id: AdminPage;
    label: string;
    // icon?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
    repassword: string;
}

export interface SignUpRequest {
    name: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    jwt: string;
}
