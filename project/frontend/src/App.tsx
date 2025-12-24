import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {useAuthStore} from './store/authStore';
import {useEffect} from 'react';

// Auth pages
import LandingPage from './components/LandingPage';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';

// Admin panel
import AdminLayout from './components/admin/AdminLayout';
import ControlPage from './components/admin/ControlPage';
import ViewPage from './components/admin/ViewPage';
import SettingsPage from './components/admin/SettingsPage';

// Protected route
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    const {initialize} = useAuthStore();

    // Initialize auth on app start
    useEffect(() => {
        initialize();
    }, [initialize]);

    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>

                {/* Protected admin routes */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminLayout/>
                        </ProtectedRoute>
                    }
                >
                    {/* Nested admin routes */}
                    <Route index element={<Navigate to="/admin/control" replace/>}/>
                    <Route path="control" element={<ControlPage/>}/>
                    <Route path="view" element={<ViewPage/>}/>
                    <Route path="settings" element={<SettingsPage/>}/>
                </Route>

                {/* Fallback for unknown routes */}
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;