import {useLocation} from 'react-router-dom';

const pageNames: Record<string, string> = {
    '/admin/control': 'Керування',
    '/admin/view': 'Перегляд',
    '/admin/settings': 'Налаштування',
};

export default function Header() {
    const location = useLocation();
    const pageName = pageNames[location.pathname] || 'Admin Panel';

    return (
        <header className="bg-white border-b border-gray-200 px-8 py-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-normal text-gray-800">
                    {pageName}
                </h1>
                <div className="flex items-center gap-4">
                </div>
            </div>
        </header>
    );
}