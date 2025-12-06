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

// BroadcastChannel for syncing between tabs
const channel = new BroadcastChannel('video-sync');

export const useVideoStore = create<VideoStore>((set, get) => {
    // Listen to commands from other tabs
    channel.onmessage = (event) => {
        const {type, payload} = event.data;

        console.log('BroadcastChannel received:', type, payload);

        switch (type) {
            case 'PLAY':
                set({playerState: 'playing'});
                break;
            case 'PAUSE':
                set({playerState: 'paused'});
                break;
            case 'SEEK':
                set({currentTime: payload.time});
                break;
            case 'SET_DURATION':
                // Sync duration from player tab
                set({duration: payload.duration});
                break;
            case 'UPDATE_TIME':
                // Sync time from player tab (but don't spam)
                set({currentTime: payload.time});
                break;
            case 'SET_STATE':
                // Sync player state
                set({playerState: payload.state});
                break;
            case 'LOAD_VIDEO':
                const index = get().playlist.findIndex(v => v.id === payload.videoId);
                if (index !== -1) {
                    set({
                        currentVideo: get().playlist[index],
                        currentIndex: index,
                        currentTime: 0,
                        playerState: 'loading'
                    });
                }
                break;
            case 'NEXT':
                const nextIndex = (get().currentIndex + 1) % get().playlist.length;
                set({
                    currentVideo: get().playlist[nextIndex],
                    currentIndex: nextIndex,
                    currentTime: 0,
                    playerState: 'loading'
                });
                break;
            case 'PREV':
                const prevIndex = get().currentIndex === 0
                    ? get().playlist.length - 1
                    : get().currentIndex - 1;
                set({
                    currentVideo: get().playlist[prevIndex],
                    currentIndex: prevIndex,
                    currentTime: 0,
                    playerState: 'loading'
                });
                break;
        }
    };

    return {
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

                channel.postMessage({
                    type: 'LOAD_VIDEO',
                    payload: {videoId}
                });
            }
        },

        play: () => {
            console.log('Store: play()');
            set({playerState: 'playing'});
            channel.postMessage({type: 'PLAY'});
        },

        pause: () => {
            console.log('Store: pause()');
            set({playerState: 'paused'});
            channel.postMessage({type: 'PAUSE'});
        },

        seek: (time: number) => {
            console.log('Store: seek()', time);
            set({currentTime: time});
            channel.postMessage({
                type: 'SEEK',
                payload: {time}
            });
        },

        nextVideo: () => {
            console.log('Store: nextVideo()');
            const {currentIndex, playlist} = get();
            const nextIndex = (currentIndex + 1) % playlist.length;

            set({
                currentVideo: playlist[nextIndex],
                currentIndex: nextIndex,
                currentTime: 0,
                playerState: 'loading'
            });

            channel.postMessage({type: 'NEXT'});
        },

        prevVideo: () => {
            console.log('Store: prevVideo()');
            const {currentIndex, playlist} = get();
            const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;

            set({
                currentVideo: playlist[prevIndex],
                currentIndex: prevIndex,
                currentTime: 0,
                playerState: 'loading'
            });

            channel.postMessage({type: 'PREV'});
        },

        updateTime: (time: number) => {
            // Update local store
            set({currentTime: time});

            // Broadcast to admin tab (throttled in VideoPlayer)
            channel.postMessage({
                type: 'UPDATE_TIME',
                payload: {time}
            });
        },

        setDuration: (duration: number) => {
            console.log('Store: setDuration()', duration);
            // Update local store
            set({duration});

            // Broadcast to admin tab
            channel.postMessage({
                type: 'SET_DURATION',
                payload: {duration}
            });
        },

        setPlayerState: (state: PlayerState) => {
            console.log('Store: setPlayerState()', state);
            // Update local store
            set({playerState: state});

            // Broadcast to admin tab
            channel.postMessage({
                type: 'SET_STATE',
                payload: {state}
            });
        }
    };
});