export interface WeatherData {
    name: string; // City name
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
    }>;
    wind: {
        speed: number;
        deg: number;
    };
    clouds: {
        all: number;
    };
    visibility: number;
}

export type WeatherPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface WeatherSettings {
    enabled: boolean;
    city: string;
    position: WeatherPosition;
}