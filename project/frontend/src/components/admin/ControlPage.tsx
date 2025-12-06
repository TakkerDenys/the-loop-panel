import AdminControls from '../video/AdminControls';

export default function ControlPage() {
    const handleOpenPlayer = () => {
        window.open('/player', '_blank', 'width=1920,height=1080');
    };

    return (
        <div className="space-y-6">
            {/* Header with Open Player button */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Керування відео</h2>

                    <button
                        onClick={handleOpenPlayer}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <span>🎬</span>
                        <span>Відкрити плеєр</span>
                    </button>
                </div>

                <p className="text-gray-600 mt-2">
                    Керуйте відтворенням відео. Зміни синхронізуються з плеєром в реальному часі.
                </p>
            </div>

            {/* Video controls */}
            <AdminControls/>
        </div>
    );
}