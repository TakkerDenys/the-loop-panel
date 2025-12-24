import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuthStore} from '../../store/authStore';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const {register, isLoading, error, isAuthenticated} = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin/control', {replace: true});
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !password || !repassword) {
            alert('Заповніть всі поля');
            return;
        }

        if (password !== repassword) {
            alert('Паролі не співпадають');
            return;
        }

        await register({name, email, password, repassword});
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full border border-gray-700">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-white">The Loop Panel</h1>
                </div>

                <h2 className="text-2xl font-semibold text-white mb-6">Реєстрація</h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Ім'я
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={isLoading}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400
    focus:ring-2
      focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="Ваше ім'я"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400
    focus:ring-2
      focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="your@email.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Пароль
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400
    focus:ring-2
      focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Підтвердіть пароль
                        </label>
                        <input
                            type="password"
                            value={repassword}
                            onChange={(e) => setRepassword(e.target.value)}
                            disabled={isLoading}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400
    focus:ring-2
      focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium mt-6
    disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Реєстрація...' : 'Зареєструватись'}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400 text-sm">
                    Вже є акаунт?{' '}
                    <button
                        onClick={() => navigate('/login')}
                        className="text-blue-500 hover:underline font-medium"
                    >
                        Увійти
                    </button>
                </p>
            </div>
        </div>
    );
}