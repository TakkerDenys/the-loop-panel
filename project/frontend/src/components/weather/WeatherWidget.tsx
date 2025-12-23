import {useEffect, useState} from 'react';
import {useWeatherStore} from '../../store/weatherStore';
import {weatherApi} from '../../lib/api';
import type {WeatherData} from '../../lib/weatherTypes';
import Clock from './Clock';

export default function WeatherWidget() {
    const {enabled, city, position, clockType, refreshTrigger} = useWeatherStore();
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
    }, [enabled, city, refreshTrigger]); // Added refreshTrigger

    if (!enabled) return null;

    // Position classes based on selected position
    const positionClasses = {
        'top-left': 'top-4 left-4 md:top-8 md:left-8',
        'top-right': 'top-4 right-4 md:top-8 md:right-8',
        'bottom-left': 'bottom-4 left-4 md:bottom-8 md:left-8',
        'bottom-right': 'bottom-4 right-4 md:bottom-8 md:right-8',
    };

    const temp = weather ? Math.round(weather.main.temp) : null;
    const description = weather?.weather[0]?.description || '';
    const icon = weather?.weather[0]?.icon;

    return (
        <div className={`absolute ${positionClasses[position]} z-30`}>
            <div className="bg-black/70 backdrop-blur-lg rounded-2xl md:rounded-3xl px-4 py-3 md:px-8 md:py-6 shadow-2xl border border-white/10">
                {loading && (
                    <div className="text-white text-sm md:text-base">Завантаження...</div>
                )}

                {error && (
                    <div className="text-red-400 text-sm md:text-base">{error}</div>
                )}

                {!loading && !error && (
                    <div className="space-y-3 md:space-y-4">
                        {/* Clock */}
                        <div className="flex justify-center">
                            <Clock type={clockType} />
                        </div>

                        {/* Weather */}
                        {weather && (
                            <div className="flex items-center gap-2 md:gap-4 pt-2 md:pt-3 border-t border-white/10">
                                {/* Weather icon */}
                                {icon && (
                                    <img
                                        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                                        alt={description}
                                        className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
                                    />
                                )}

                                <div className="flex-1 min-w-0">
                                    {/* Temperature */}
                                    <div className="text-white text-2xl md:text-4xl lg:text-5xl font-light">
                                        {temp}°
                                    </div>

                                    {/* City and description */}
                                    <div className="text-gray-300 text-xs md:text-sm lg:text-base capitalize truncate">
                                        {weather.name}
                                    </div>
                                    <div className="text-gray-400 text-xs md:text-sm capitalize truncate">
                                        {description}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
