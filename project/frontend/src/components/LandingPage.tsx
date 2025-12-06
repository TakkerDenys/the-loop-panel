import Header from './shared/Header';
import Footer from './shared/Footer';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">
            {/* Header */}
            <Header/>

            {/* Main content */}
            <main className="flex-1 flex items-center justify-center p-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        The Loop Panel
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Інформація буде додана пізніше
                    </p>
                </div>
            </main>

            {/* Footer */}
            <Footer/>
        </div>
    );
}