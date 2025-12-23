import {useEffect, useState} from 'react';
import {useWeatherStore} from '../../store/weatherStore';
import type {WeatherPosition, ClockType} from '../../lib/weatherTypes';

export default function WeatherSettings() {
    const {enabled, city, position, clockType, setEnabled, setCity, setPosition, setClockType, loadSettings, triggerRefresh} = useWeatherStore();
    const [localCity, setLocalCity] = useState(city);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        loadSettings();
    }, [loadSettings]);

    useEffect(() => {
        setLocalCity(city);
    }, [city]);

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalCity(e.target.value);
    };

    const handleCityBlur = () => {
        if (localCity.trim()) {
            setCity(localCity.trim());
        } else {
            setLocalCity(city);
        }
    };

    const handlePositionChange = (newPosition: WeatherPosition) => {
        setPosition(newPosition);
    };

    const handleClockTypeChange = (newClockType: ClockType) => {
        setClockType(newClockType);
    };

    const handleRefreshNow = () => {
        setIsRefreshing(true);
        triggerRefresh();

        // Reset button state after 2 seconds
        setTimeout(() => {
            setIsRefreshing(false);
        }, 2000);
    };

    const positions: Array<{value: WeatherPosition; label: string}> = [
        {value: 'top-left', label: 'Зверху зліва'},
        {value: 'top-right', label: 'Зверху справа'},
        {value: 'bottom-left', label: 'Знизу зліва'},
        {value: 'bottom-right', label: 'Знизу справа'},
    ];

    const clockTypes: Array<{value: ClockType; label: string; icon: string}> = [
        {value: 'digital', label: 'Цифровий', icon: '12:34'},
        {value: 'analog', label: 'Аналоговий', icon: '🕐'},
    ];

    return (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-semibold text-white">Налаштування погоди</h3>
                    <p className="text-gray-400 text-sm mt-1">
                        Показувати поточну погоду на екрані плеєра
                    </p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={enabled}
                        onChange={(e) => setEnabled(e.target.checked)}
                        className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>

            {enabled && (
                <div className="space-y-4">
                    {/* City input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Місто
                        </label>
                        <input
                            type="text"
                            value={localCity}
                            onChange={handleCityChange}
                            onBlur={handleCityBlur}
                            placeholder="Наприклад: Київ"
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Clock type selector */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Тип годинника
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {clockTypes.map((type) => (
                                <button
                                    key={type.value}
                                    onClick={() => handleClockTypeChange(type.value)}
                                    className={`px-4 py-3 rounded-lg border transition-colors ${
                                        clockType === type.value
                                            ? 'bg-blue-600 border-blue-500 text-white'
                                            : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                                    }`}
                                >
                                    <div className="text-2xl mb-1">{type.icon}</div>
                                    <div className="text-sm">{type.label}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Position selector */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Позиція на екрані
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {positions.map((pos) => (
                                <button
                                    key={pos.value}
                                    onClick={() => handlePositionChange(pos.value)}
                                    className={`px-4 py-2 rounded-lg border transition-colors ${
                                        position === pos.value
                                            ? 'bg-blue-600 border-blue-500 text-white'
                                            : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                                    }`}
                                >
                                    {pos.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Refresh button */}
                    <div>
                        <button
                            onClick={handleRefreshNow}
                            disabled={isRefreshing}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            <svg
                                className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                            </svg>
                            <span>{isRefreshing ? 'Оновлення...' : 'Оновити зараз'}</span>
                        </button>
                    </div>

                    {/* Preview info */}
                    <div className="bg-gray-700/50 rounded-lg p-4 mt-4">
                        <div className="flex items-center gap-2 text-gray-300 text-sm">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span>Погода оновлюється кожні 10 хвилин</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
