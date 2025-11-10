import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
              <span className="text-white font-bold text-xl">Loop Panel</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Функції</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">Як це працює</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Тарифи</a>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105">
                Почати зараз
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm text-gray-300">Запущено нову версію 2.0</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              The Loop Panel
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Революційна платформа для управління циклічними процесами.
            Автоматизуйте, оптимізуйте та контролюйте всі ваші робочі потоки в одному місці.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-xl">
              Безкоштовна пробна версія
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all border border-white/20">
              Дивитись демо
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-gray-400">Активних користувачів</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-gray-400">Час роботи</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">500M+</div>
              <div className="text-gray-400">Оброблених циклів</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Потужні можливості
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Миттєва синхронізація</h3>
            <p className="text-gray-400">Всі зміни відображаються в реальному часі для всіх учасників команди</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Автоматизація циклів</h3>
            <p className="text-gray-400">Налаштуйте правила та дозвольте системі працювати за вас</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Аналітика в деталях</h3>
            <p className="text-gray-400">Отримуйте детальні звіти про кожен цикл та процес</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Як це працює
        </h2>

        <div className="space-y-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="text-purple-400 font-bold mb-2">Крок 1</div>
              <h3 className="text-2xl font-semibold text-white mb-4">Створіть свій цикл</h3>
              <p className="text-gray-400">Використовуйте візуальний конструктор для створення робочого процесу. Додавайте етапи, умови та тригери.</p>
            </div>
            <div className="flex-1 h-64 bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl border border-white/10"></div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="flex-1">
              <div className="text-purple-400 font-bold mb-2">Крок 2</div>
              <h3 className="text-2xl font-semibold text-white mb-4">Налаштуйте автоматизацію</h3>
              <p className="text-gray-400">Встановіть правила, які визначають, коли і як запускаються ваші цикли. Інтегруйте з іншими сервісами.</p>
            </div>
            <div className="flex-1 h-64 bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl border border-white/10"></div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="text-purple-400 font-bold mb-2">Крок 3</div>
              <h3 className="text-2xl font-semibold text-white mb-4">Моніторинг та оптимізація</h3>
              <p className="text-gray-400">Відстежуйте продуктивність в реальному часі. Отримуйте рекомендації щодо покращення ефективності.</p>
            </div>
            <div className="flex-1 h-64 bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl border border-white/10"></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Готові почати?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Приєднуйтесь до тисяч команд, які вже оптимізували свої процеси
        </p>
        <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-xl text-lg font-semibold">
          Спробувати безкоштовно
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded"></div>
            <span className="text-white font-semibold">Loop Panel</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 The Loop Panel. Всі права захищені.
          </p>
        </div>
      </footer>
    </div>
  );
}