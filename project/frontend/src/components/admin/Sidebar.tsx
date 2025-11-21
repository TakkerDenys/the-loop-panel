import {useNavigationStore} from '../../store/navigationStore';
import type {AdminPage} from '../../lib/types';

const menuItems = [
    {id: 'control' as AdminPage, label: 'Керування'},
    {id: 'view' as AdminPage, label: 'Перегляд'},
    {id: 'settings' as AdminPage, label: 'Налаштування'},
];

export default function Sidebar() {
    const {currentPage, setCurrentPage} = useNavigationStore();

    return (
        <div className="w-64 h-screen bg-gray-900 text-white flex flex-col">
            {/* Logo/Name at top */}
            <div className="p-6 border-b border-gray-700">
                <h1 className="text-2xl font-bold">The Loop Panel</h1>
            </div>

            {/* Navigation menu items */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => setCurrentPage(item.id)}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                                    currentPage === item.id
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

            {/* Exit button pinned to bottom */}
            <div className="p-4 border-t border-gray-700">
                <button
                    className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
                    Вихід
                </button>
            </div>
        </div>
    );
}