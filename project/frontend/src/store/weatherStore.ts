import {create} from 'zustand';
import type {WeatherSettings, WeatherPosition} from '../lib/weatherTypes';

interface WeatherStore extends WeatherSettings {
    setEnabled: (enabled: boolean) => void;
    setCity: (city: string) => void;
    setPosition: (position: WeatherPosition) => void;
    loadSettings: () => void;
    saveSettings: () => void;
}

const DEFAULT_SETTINGS: WeatherSettings = {
    enabled: false,
    city: 'Київ',
    position: 'top-right',
};

export const useWeatherStore = create<WeatherStore>((set, get) => ({
    ...DEFAULT_SETTINGS,

    setEnabled: (enabled) => {
        set({enabled});
        get().saveSettings();
    },

    setCity: (city) => {
        set({city});
        get().saveSettings();
    },

    setPosition: (position) => {
        set({position});
        get().saveSettings();
    },

    loadSettings: () => {
        const saved = localStorage.getItem('weatherSettings');
        if (saved) {
            try {
                const settings = JSON.parse(saved) as WeatherSettings;
                set(settings);
            } catch (error) {
                console.error('Failed to load weather settings:', error);
            }
        }
    },

    saveSettings: () => {
        const {enabled, city, position} = get();
        localStorage.setItem('weatherSettings', JSON.stringify({enabled, city, position}));
    },
}));