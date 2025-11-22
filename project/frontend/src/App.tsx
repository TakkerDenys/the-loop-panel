import {useAuthStore} from './store/authStore';
import {useNavigationStore} from './store/navigationStore';
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

function App() {
    const {isAuthenticated, initialize} = useAuthStore();
    const {currentPage, currentAuthPage} = useNavigationStore();

    useEffect(() => {
        initialize();
    }, [initialize]);

    // If not authenticated - show auth pages
    if (!isAuthenticated) {
        switch (currentAuthPage) {
            case 'landing':
                return <LandingPage/>;
            case 'login':
                return <LoginPage/>;
            case 'register':
                return <RegisterPage/>;
            default:
                return <LandingPage/>;
        }
    }

    // If authenticated - show admin panel
    const renderAdminPage = () => {
        switch (currentPage) {
            case 'control':
                return <ControlPage/>;
            case 'view':
                return <ViewPage/>;
            case 'settings':
                return <SettingsPage/>;
            default:
                return <ControlPage/>;
        }
    };

    return (
        <AdminLayout>
            {renderAdminPage()}
        </AdminLayout>
    );
}

export default App;