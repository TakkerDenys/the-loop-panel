import {useState} from 'react';
import {useAuthStore} from '../../store/authStore';
import {useNavigationStore} from '../../store/navigationStore';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuthStore();
    const {setCurrentAuthPage} = useNavigationStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            alert('Заповніть всі поля');
            return;
        }

        login({email, password});
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full border border-gray-700">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-white">The Loop Panel</h1>
                </div>

                <h2 className="text-2xl font-semibold text-white mb-6">Вхід</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2
  focus:ring-blue-500 focus:border-transparent"
                            placeholder="your@email.com"
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
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2
  focus:ring-blue-500 focus:border-transparent"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium mt-6"
                    >
                        Увійти
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400 text-sm">
                    Немає акаунту?{' '}
                    <button
                        onClick={() => setCurrentAuthPage('register')}
                        className="text-blue-500 hover:underline font-medium"
                    >
                        Зареєструватись
                    </button>
                </p>
            </div>
        </div>
    );
}