import {useNavigate, useLocation} from 'react-router-dom';
import {useAuthStore} from '../../store/authStore';
import type {AdminPage} from '../../lib/types';

const menuItems = [
    {id: 'control' as AdminPage, label: 'Керування', path: '/admin/control'},
    {id: 'view' as AdminPage, label: 'Перегляд', path: '/admin/view'},
    {id: 'settings' as AdminPage, label: 'Налаштування', path: '/admin/settings'},
];

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const {logout} = useAuthStore();

    return (
        <div className="w-64 h-screen bg-gray-900 text-white flex flex-col">
            <div className="p-6 border-b border-gray-700">
                <h1 className="text-2xl font-bold">The Loop Panel</h1>
            </div>

            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => navigate(item.path)}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                                    location.pathname === item.path
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-300 hover:bg-gray-800'
                                }`}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-4 border-t border-gray-700">
                <button
                    onClick={logout}
                    className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
                    Вихід
                </button>
            </div>
        </div>
    );
}