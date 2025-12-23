import {create} from 'zustand';
import type {WeatherSettings, WeatherPosition, ClockType} from '../lib/weatherTypes';

interface WeatherStore extends WeatherSettings {
    setEnabled: (enabled: boolean) => void;
    setCity: (city: string) => void;
    setPosition: (position: WeatherPosition) => void;
    setClockType: (clockType: ClockType) => void;
    loadSettings: () => void;
    saveSettings: () => void;
    refreshTrigger: number;
    triggerRefresh: () => void;
    startSyncListener: () => void;
}

const DEFAULT_SETTINGS: WeatherSettings = {
    enabled: false,
    city: 'Київ',
    position: 'top-right',
    clockType: 'digital-thin',
};

export const useWeatherStore = create<WeatherStore>((set, get) => ({
    ...DEFAULT_SETTINGS,
    refreshTrigger: 0,

    setEnabled: (enabled) => {
        set({enabled});
        get().saveSettings();
        if (enabled) {
            get().triggerRefresh(); // Trigger reload when enabling
        }
    },

    setCity: (city) => {
        set({city});
        get().saveSettings();
        get().triggerRefresh(); // Trigger reload in same window
    },

    setPosition: (position) => {
        set({position});
        get().saveSettings();
    },

    setClockType: (clockType) => {
        set({clockType});
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
        const {enabled, city, position, clockType} = get();
        localStorage.setItem('weatherSettings', JSON.stringify({enabled, city, position, clockType}));
    },

    triggerRefresh: () => {
        set({refreshTrigger: get().refreshTrigger + 1});
    },

    startSyncListener: () => {
        // Listen for storage changes from other tabs/windows
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'weatherSettings' && e.newValue) {
                try {
                    const settings = JSON.parse(e.newValue) as WeatherSettings;
                    set({
                        ...settings,
                        refreshTrigger: get().refreshTrigger + 1, // Trigger weather reload
                    });
                } catch (error) {
                    console.error('Failed to sync weather settings:', error);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // Return cleanup function (though we won't call it in this case)
        return () => window.removeEventListener('storage', handleStorageChange);
    },
}));