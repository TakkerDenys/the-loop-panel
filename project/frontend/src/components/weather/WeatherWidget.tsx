import {useEffect, useState} from 'react';
import {useWeatherStore} from '../../store/weatherStore';
import {weatherApi} from '../../lib/api';
import type {WeatherData} from '../../lib/weatherTypes';

export default function WeatherWidget() {
    const {enabled, city, position} = useWeatherStore();
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!enabled || !city) return;

        const fetchWeather = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await weatherApi.getWeather(city);
                setWeather(data);
            } catch (err) {
                console.error('Failed to fetch weather:', err);
                setError('Не вдалося завантажити погоду');
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();

        // Update weather every 10 minutes
        const interval = setInterval(fetchWeather, 10 * 60 * 1000);

        return () => clearInterval(interval);
    }, [enabled, city]);

    if (!enabled || !weather) return null;

    // Position classes based on selected position
    const positionClasses = {
        'top-left': 'top-8 left-8',
        'top-right': 'top-8 right-8',
        'bottom-left': 'bottom-8 left-8',
        'bottom-right': 'bottom-8 right-8',
    };

    const temp = Math.round(weather.main.temp);
    const description = weather.weather[0]?.description || '';
    const icon = weather.weather[0]?.icon;

    return (
        <div className={`absolute ${positionClasses[position]} z-30`}>
            <div className="bg-black/60 backdrop-blur-md rounded-2xl px-6 py-4 shadow-xl">
                {loading && (
                    <div className="text-white text-sm">Завантаження...</div>
                )}

                {error && (
                    <div className="text-red-400 text-sm">{error}</div>
                )}

                {!loading && !error && weather && (
                    <div className="flex items-center gap-4">
                        {/* Weather icon */}
                        {icon && (
                            <img
                                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                                alt={description}
                                className="w-16 h-16"
                            />
                        )}

                        <div>
                            {/* Temperature */}
                            <div className="text-white text-4xl font-bold">
                                {temp}°C
                            </div>

                            {/* City and description */}
                            <div className="text-gray-300 text-sm capitalize">
                                {weather.name} • {description}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}