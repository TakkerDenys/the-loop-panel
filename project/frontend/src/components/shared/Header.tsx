import {useNavigate} from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();

    return (
        <header className="bg-gray-900 border-b border-gray-700">
            <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <img
                        src="/logo-mono.svg"
                        alt="The Loop Panel"
                        className="h-10 w-auto"
                    />
                    <h1 className="text-2xl font-bold text-white">The Loop Panel</h1>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/login')}
                        className="px-6 py-2 text-gray-300 hover:text-white transition-colors"
                    >
                        Увійти
                    </button>
                    <button
                        onClick={() => navigate('/register')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Зареєструватись
                    </button>
                </div>
            </div>
        </header>
    );
}