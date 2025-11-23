export default function ControlPage() {
    const handleOpenPlayer = () => {
        window.open('/player', '_blank', 'width=1920,height=1080');
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Керування</h2>

                <button
                    onClick={handleOpenPlayer}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                    <span>🎬</span>
                    <span>Відкрити плеєр</span>
                </button>
            </div>

            <p className="text-gray-600">
                Натисніть "Відкрити плеєр" щоб запустити повноекранний відеоплеєр
            </p>
        </div>
    );
}