import {create} from 'zustand';
import type {Video} from '../lib/videoTypes';
import {MOCK_VIDEOS} from '../lib/mockData';

type PlayerState = 'playing' | 'paused' | 'loading' | 'ended';

interface VideoStore {
    // State
    playlist: Video[];
    currentVideo: Video | null;
    currentIndex: number;
    playerState: PlayerState;
    currentTime: number;
    duration: number;

    // Actions
    loadVideo: (videoId: string) => void;
    play: () => void;
    pause: () => void;
    seek: (time: number) => void;
    nextVideo: () => void;
    prevVideo: () => void;
    updateTime: (time: number) => void;
    setDuration: (duration: number) => void;
    setPlayerState: (state: PlayerState) => void;
}

export const useVideoStore = create<VideoStore>((set, get) => ({
    // Initial state
    playlist: MOCK_VIDEOS,
    currentVideo: MOCK_VIDEOS[0],
    currentIndex: 0,
    playerState: 'paused',
    currentTime: 0,
    duration: 0,

    // Actions
    loadVideo: (videoId: string) => {
        const {playlist} = get();
        const index = playlist.findIndex(v => v.id === videoId);

        if (index !== -1) {
            set({
                currentVideo: playlist[index],
                currentIndex: index,
                currentTime: 0,
                playerState: 'loading'
            });
        }
    },

    play: () => {
        set({playerState: 'playing'});
    },

    pause: () => {
        set({playerState: 'paused'});
    },

    seek: (time: number) => {
        set({currentTime: time});
    },

    nextVideo: () => {
        const {currentIndex, playlist} = get();
        const nextIndex = (currentIndex + 1) % playlist.length;

        set({
            currentVideo: playlist[nextIndex],
            currentIndex: nextIndex,
            currentTime: 0,
            playerState: 'loading'
        });
    },

    prevVideo: () => {
        const {currentIndex, playlist} = get();
        const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;

        set({
            currentVideo: playlist[prevIndex],
            currentIndex: prevIndex,
            currentTime: 0,
            playerState: 'loading'
        });
    },

    updateTime: (time: number) => {
        set({currentTime: time});
    },

    setDuration: (duration: number) => {
        set({duration});
    },

    setPlayerState: (state: PlayerState) => {
        set({playerState: state});
    }
}));