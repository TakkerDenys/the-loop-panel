import {Link} from 'react-router-dom';
import Header from './shared/Header';
import Footer from './shared/Footer';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gray-900">
            <Header/>

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-gray-900 to-green-900/20"/>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                    <div className="text-center">
                        {/* Logo */}
                        <div className="flex justify-center mb-8">
                            <img
                                src="/logo.svg"
                                alt="The Loop Panel"
                                className="h-32 lg:h-40 w-auto"
                            />
                        </div>

                        {/* Headline */}
                        <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                            Професійна система
                            <br/>
                            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                                відео-трансляції
                            </span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
                            Повний контроль над відео-контентом з синхронізацією в реальному часі,
                            віджетами погоди та інтуїтивною адміністративною панеллю
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/player"
                                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-colors shadow-lg shadow-blue-500/50"
                            >
                                Переглянути плеєр
                            </Link>
                            <Link
                                to="/login"
                                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white text-lg font-semibold rounded-lg border-2 border-gray-700 transition-colors"
                            >
                                Адмін-панель
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-gray-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                            Потужні можливості
                        </h2>
                        <p className="text-xl text-gray-400">
                            Все що потрібно для професійної відео-трансляції
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 hover:border-blue-500 transition-all hover:shadow-xl hover:shadow-blue-500/20">
                            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Відео-плеєр</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Автоматичне послідовне відтворення відео з підтримкою множинних форматів
                                та плавних переходів між роликами
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 hover:border-green-500 transition-all hover:shadow-xl hover:shadow-green-500/20">
                            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Повний контроль</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Адміністративна панель з можливістю play/pause, перемотування,
                                переключення відео та моніторингу статусу
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 hover:border-purple-500 transition-all hover:shadow-xl hover:shadow-purple-500/20">
                            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Синхронізація</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Миттєва синхронізація між адмін-панеллю та плеєром в реальному часі
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 hover:border-cyan-500 transition-all hover:shadow-xl hover:shadow-cyan-500/20">
                            <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Віджет погоди</h3>
                            <p className="text-gray-400 leading-relaxed">
                                5 типів годинників (цифрові та аналогові), поточна погода з OpenWeatherMap,
                                гнучке позиціонування на екрані
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 hover:border-orange-500 transition-all hover:shadow-xl hover:shadow-orange-500/20">
                            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Управління відео</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Завантаження нових відео, видалення старих, зміна порядку відтворення
                                та перегляд статистики
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 hover:border-pink-500 transition-all hover:shadow-xl hover:shadow-pink-500/20">
                            <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Адаптивний дизайн</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Повністю адаптивний інтерфейс що працює на всіх пристроях -
                                від смартфонів до великих екранів
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                            Як це працює
                        </h2>
                        <p className="text-xl text-gray-400">
                            Просто та зрозуміло
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {/* Step 1 */}
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                                1
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Завантажте відео</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Увійдіть в адмін-панель та завантажте ваші відео файли.
                                Система автоматично створить плейлист
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                                2
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Налаштуйте віджети</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Виберіть тип годинника, позицію віджета погоди та місто
                                для відображення актуальної інформації
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                                3
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Керуйте трансляцією</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Використовуйте адмін-панель для повного контролю:
                                pause, play, skip, seek - все синхронізується миттєво
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Screenshots Section */}
            <section className="py-24 bg-gradient-to-b from-gray-800/50 to-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                            Інтерфейс системи
                        </h2>
                        <p className="text-xl text-gray-400">
                            Сучасний та інтуїтивний дизайн
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Screenshot 1 - Admin Panel */}
                        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-blue-500 transition-colors">
                            <img
                                src="/admin-panel.png"
                                alt="Адмін-панель"
                                className="w-full h-auto rounded-lg"
                            />
                        </div>

                        {/* Screenshot 2 - Video Player */}
                        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-green-500 transition-colors">
                            <img
                                src="/video-player.png"
                                alt="Відео-плеєр"
                                className="w-full h-auto rounded-lg"
                            />
                        </div>

                        {/* Screenshot 3 - Weather Widget */}
                        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-cyan-500 transition-colors">
                            <img
                                src="/weather-widget.png"
                                alt="Віджет погоди"
                                className="w-full h-auto rounded-lg"
                            />
                        </div>

                        {/* Screenshot 4 - Controls */}
                        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-purple-500 transition-colors">
                            <img
                                src="/control-panel.png"
                                alt="Панель управління"
                                className="w-full h-auto rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Cases Section */}
            <section className="py-24 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                            Де можна використовувати
                        </h2>
                        <p className="text-xl text-gray-400">
                            Універсальне рішення для різних сценаріїв
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-750 transition-colors">
                            <div className="text-4xl mb-3">☕</div>
                            <h3 className="text-lg font-semibold text-white mb-2">Кафе</h3>
                            <p className="text-gray-400 text-sm">Меню, акції та розважальний контент</p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-750 transition-colors">
                            <div className="text-4xl mb-3">🏥</div>
                            <h3 className="text-lg font-semibold text-white mb-2">Медичні центри</h3>
                            <p className="text-gray-400 text-sm">Інформація для пацієнтів у залі очікування</p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-750 transition-colors">
                            <div className="text-4xl mb-3">🏨</div>
                            <h3 className="text-lg font-semibold text-white mb-2">Рецепція</h3>
                            <p className="text-gray-400 text-sm">Привітання та корисна інформація для гостей</p>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-750 transition-colors">
                            <div className="text-4xl mb-3">🏪</div>
                            <h3 className="text-lg font-semibold text-white mb-2">Магазини</h3>
                            <p className="text-gray-400 text-sm">Рекламні екрани та промо-матеріали</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-24 bg-gradient-to-br from-blue-900/30 via-gray-900 to-green-900/30">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                        Готові почати?
                    </h2>
                    <p className="text-xl text-gray-300 mb-12">
                        Спробуйте The Loop Panel вже сьогодні та відчуйте повний контроль над вашим відео-контентом
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/register"
                            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-colors shadow-lg shadow-blue-500/50"
                        >
                            Створити акаунт
                        </Link>
                        <Link
                            to="/player"
                            className="px-8 py-4 bg-transparent hover:bg-gray-800 text-white text-lg font-semibold rounded-lg border-2 border-gray-600 hover:border-gray-500 transition-colors"
                        >
                            Демо плеєра
                        </Link>
                    </div>
                </div>
            </section>

            <Footer/>
        </div>
    );
}
