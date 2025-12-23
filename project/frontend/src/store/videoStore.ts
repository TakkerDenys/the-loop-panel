import {create} from 'zustand';
import type {Video} from '../lib/videoTypes';
import {videoPlayerApi} from '../lib/api';

type PlayerState = 'playing' | 'paused' | 'loading' | 'ended';

interface VideoStore {
    // State
    playlist: Video[];
    currentVideo: Video | null;
    currentIndex: number;
    playerState: PlayerState;
    currentTime: number;
    duration: number;
    isLoading: boolean;
    error: string | null;

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

    // API Actions
    loadPlaylistFromAPI: () => Promise<void>;
    uploadVideo: (file: File, description: string) => Promise<void>;
    deleteVideo: (videoId: string) => Promise<void>;
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
                set({duration: payload.duration});
                break;
            case 'UPDATE_TIME':
                set({currentTime: payload.time});
                break;
            case 'SET_STATE':
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
                if (get().playlist.length > 0) {
                    set({
                        currentVideo: get().playlist[nextIndex],
                        currentIndex: nextIndex,
                        currentTime: 0,
                        playerState: 'loading'
                    });
                }
                break;
            case 'PREV':
                const prevIndex = get().currentIndex === 0
                    ? get().playlist.length - 1
                    : get().currentIndex - 1;
                if (get().playlist.length > 0) {
                    set({
                        currentVideo: get().playlist[prevIndex],
                        currentIndex: prevIndex,
                        currentTime: 0,
                        playerState: 'loading'
                    });
                }
                break;
            case 'PLAYLIST_UPDATED':
                // Reload playlist when updated from another tab
                get().loadPlaylistFromAPI();
                break;
        }
    };

    return {
        // Initial state
        playlist: [],
        currentVideo: null,
        currentIndex: 0,
        playerState: 'paused',
        currentTime: 0,
        duration: 0,
        isLoading: false,
        error: null,

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

        pause: async () => {
            console.log('Store: pause()');
            const {currentIndex, currentTime, playlist} = get();

            set({playerState: 'paused'});
            channel.postMessage({type: 'PAUSE'});

            // Save state to backend
            try {
                // Only save if we have valid data
                if (playlist.length > 0 && currentIndex >= 0 && !isNaN(currentTime)) {
                    await videoPlayerApi.stop({
                        currentVideoNum: currentIndex,
                        timeline: currentTime.toString()
                    });
                    console.log('Pause state saved to backend');
                } else {
                    console.log('Skip saving pause state - invalid data');
                }
            } catch (error) {
                console.error('Failed to save pause state:', error);
                // Don't show error to user, it's not critical
            }
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

            if (playlist.length === 0) return;

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

            if (playlist.length === 0) return;

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
            set({currentTime: time});
            channel.postMessage({
                type: 'UPDATE_TIME',
                payload: {time}
            });
        },

        setDuration: (duration: number) => {
            console.log('Store: setDuration()', duration);
            set({duration});
            channel.postMessage({
                type: 'SET_DURATION',
                payload: {duration}
            });
        },

        setPlayerState: (state: PlayerState) => {
            console.log('Store: setPlayerState()', state);
            set({playerState: state});
            channel.postMessage({
                type: 'SET_STATE',
                payload: {state}
            });
        },

        // API Actions
        loadPlaylistFromAPI: async () => {
            set({isLoading: true, error: null});

            try {
                const response = await videoPlayerApi.getOwn();
                console.log('Loaded playlist from API:', response);

                // Transform backend response to Video[] format
                // TODO: Adjust this based on actual backend response structure
                let videos: Video[] = [];

                if (response && response.queue && Array.isArray(response.queue)) {
                    videos = response.queue.map((item: any, index: number) => ({
                        id: `${response._id}-${index}`,
                        title: item.name,
                        description: item.description || '',
                        url: `http://localhost:3000/uploads/videos/${item.name}`,
                        duration: 0,
                        thumbnail: undefined
                    }));
                } else if (Array.isArray(response)) {
                    // If response is already array of videos
                    videos = response;
                }

                set({
                    playlist: videos,
                    currentVideo: videos.length > 0 ? videos[0] : null,
                    currentIndex: 0,
                    isLoading: false
                });
            } catch (error) {
                console.error('Failed to load playlist:', error);
                set({
                    error: error instanceof Error ? error.message : 'Помилка завантаження плейлиста',
                    isLoading: false
                });
            }
        },

        uploadVideo: async (file: File, description: string) => {
            set({isLoading: true, error: null});

            try {
                await videoPlayerApi.upload(file, description);

                // Reload playlist after upload
                await get().loadPlaylistFromAPI();

                // Notify other tabs to reload
                channel.postMessage({type: 'PLAYLIST_UPDATED'});

                set({isLoading: false});
            } catch (error) {
                console.error('Failed to upload video:', error);
                set({
                    error: error instanceof Error ? error.message : 'Помилка завантаження відео',
                    isLoading: false
                });
                throw error; // Re-throw so UploadForm can handle it
            }
        },

        deleteVideo: async (videoId: string) => {
            set({isLoading: true, error: null});

            try {
                const {playlist} = get();
                const videoIndex = playlist.findIndex(v => v.id === videoId);

                if (videoIndex === -1) {
                    throw new Error('Відео не знайдено');
                }

                // Call API to remove video
                await videoPlayerApi.removeVideo({currentVideoNum: videoIndex});

                // Reload playlist after deletion
                await get().loadPlaylistFromAPI();

                // Notify other tabs to reload
                channel.postMessage({type: 'PLAYLIST_UPDATED'});

                set({isLoading: false});
            } catch (error) {
                console.error('Failed to delete video:', error);
                set({
                    error: error instanceof Error ? error.message : 'Помилка видалення відео',
                    isLoading: false
                });
                throw error;
            }
        }
    };
});