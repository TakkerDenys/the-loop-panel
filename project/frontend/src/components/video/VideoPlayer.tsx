import {useEffect, useRef, useState} from 'react';
import {useVideoStore} from '../../store/videoStore';

export default function VideoPlayer() {
    const video1Ref = useRef<HTMLVideoElement>(null);
    const video2Ref = useRef<HTMLVideoElement>(null);
    const lastUpdateRef = useRef(0);
    const loadingTimeoutRef = useRef<number | null>(null);

    const [videoError, setVideoError] = useState<string | null>(null);
    const [activeVideoIndex, setActiveVideoIndex] = useState<1 | 2>(1); // Which video is currently playing
    const [showLoading, setShowLoading] = useState(false);
    const [crossfading, setCrossfading] = useState(false);

    const {
        currentVideo,
        playerState,
        currentTime,
        updateTime,
        setDuration,
        setPlayerState,
        nextVideo,
        playlist,
        loadPlaylistFromAPI,
        currentIndex
    } = useVideoStore();

    const activeVideoRef = activeVideoIndex === 1 ? video1Ref : video2Ref;
    const nextVideoRef = activeVideoIndex === 1 ? video2Ref : video1Ref;

    // Load playlist on mount
    useEffect(() => {
        loadPlaylistFromAPI();
    }, [loadPlaylistFromAPI]);

    // Reset error when video changes
    useEffect(() => {
        setVideoError(null);
    }, [currentVideo?.id]);

    // Update active video source when currentVideo changes
    useEffect(() => {
        if (activeVideoRef.current && currentVideo) {
            console.log('Loading video on active player:', currentVideo.url);
            activeVideoRef.current.src = currentVideo.url;
            activeVideoRef.current.load();

            // Set timeout to show loading spinner after 2 seconds
            loadingTimeoutRef.current = setTimeout(() => {
                setShowLoading(true);
            }, 2000);
        }
    }, [currentVideo?.id, activeVideoIndex]);

    // Preload next video
    useEffect(() => {
        const nextVideoInPlaylist = playlist[(currentIndex + 1) % playlist.length];
        if (nextVideoRef.current && nextVideoInPlaylist && playlist.length > 1) {
            console.log('Preloading next video:', nextVideoInPlaylist.url);
            nextVideoRef.current.src = nextVideoInPlaylist.url;
            nextVideoRef.current.load();
        }
    }, [currentIndex, playlist]);

    // Sync player state (play/pause) with video element
    useEffect(() => {
        if (!activeVideoRef.current) return;

        if (playerState === 'playing') {
            activeVideoRef.current.play().catch((error) => {
                console.error('Play failed:', error);
                setPlayerState('paused');
                setVideoError('Не вдалося відтворити відео');
            });
        } else if (playerState === 'paused') {
            activeVideoRef.current.pause();
        }
    }, [playerState, setPlayerState, activeVideoIndex]);

    // Sync currentTime when seek happens
    useEffect(() => {
        if (!activeVideoRef.current) return;

        const diff = Math.abs(activeVideoRef.current.currentTime - currentTime);
        if (diff > 1) {
            activeVideoRef.current.currentTime = currentTime;
        }
    }, [currentTime, activeVideoIndex]);

    // When video metadata loads - set duration
    const handleLoadedMetadata = (videoIndex: 1 | 2) => () => {
        const videoRef = videoIndex === 1 ? video1Ref : video2Ref;

        if (videoRef.current && videoIndex === activeVideoIndex) {
            const videoDuration = videoRef.current.duration;
            console.log('Video loaded, duration:', videoDuration);
            setDuration(videoDuration);
            setVideoError(null);

            // Clear loading timeout and hide spinner
            if (loadingTimeoutRef.current) {
                clearTimeout(loadingTimeoutRef.current);
            }
            setShowLoading(false);
        }
    };

    // When video is ready to play - auto-start
    const handleCanPlay = (videoIndex: 1 | 2) => () => {
        console.log(`Video ${videoIndex} can play, current state:`, playerState);

        if (videoIndex === activeVideoIndex) {
            // Clear loading timeout and hide spinner
            if (loadingTimeoutRef.current) {
                clearTimeout(loadingTimeoutRef.current);
            }
            setShowLoading(false);

            if (playerState === 'loading' || playerState === 'paused') {
                setPlayerState('playing');
            }
        }
    };

    // Update current time - throttled to 500ms
    const handleTimeUpdate = () => {
        if (!activeVideoRef.current) return;

        const now = Date.now();
        if (now - lastUpdateRef.current >= 500) {
            const time = activeVideoRef.current.currentTime;
            const duration = activeVideoRef.current.duration;

            updateTime(time);
            lastUpdateRef.current = now;

            // Start crossfade 1 second before video ends
            if (playlist.length > 1 && duration - time <= 1 && duration - time > 0 && !crossfading) {
                console.log('Starting crossfade to next video');
                setCrossfading(true);

                // Start playing next video
                if (nextVideoRef.current) {
                    nextVideoRef.current.currentTime = 0;
                    nextVideoRef.current.play().catch(err => {
                        console.error('Failed to play next video:', err);
                    });
                }
            }
        }
    };

    // Auto advance to next video when ended
    const handleEnded = () => {
        console.log('Video ended');
        setPlayerState('ended');

        // Only advance if there are more videos
        if (playlist.length > 1) {
            // Switch to the other video player (already playing)
            setActiveVideoIndex(prev => prev === 1 ? 2 : 1);
            setCrossfading(false);

            // Update store to next video
            nextVideo();
        }
    };

    const handleWaiting = () => {
        console.log('Video waiting/buffering');
        setPlayerState('loading');
    };

    const handleError = (videoIndex: 1 | 2) => (e: React.SyntheticEvent<HTMLVideoElement>) => {
        if (videoIndex !== activeVideoIndex) return; // Only handle errors for active video

        console.error('Video error:', e);
        const video = e.currentTarget;
        let errorMessage = 'Помилка завантаження відео';

        if (video.error) {
            switch (video.error.code) {
                case MediaError.MEDIA_ERR_ABORTED:
                    errorMessage = 'Завантаження відео було перервано';
                    break;
                case MediaError.MEDIA_ERR_NETWORK:
                    errorMessage = 'Помилка мережі при завантаженні відео';
                    break;
                case MediaError.MEDIA_ERR_DECODE:
                    errorMessage = 'Помилка декодування відео';
                    break;
                case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                    errorMessage = 'Формат відео не підтримується або файл не знайдено';
                    break;
            }
        }

        setVideoError(errorMessage);
        setPlayerState('paused');
    };

    // Show message when no playlist
    if (!playlist || playlist.length === 0) {
        return (
            <div className="w-full h-screen bg-black flex flex-col items-center justify-center">
                <svg
                    className="w-24 h-24 text-gray-600 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                </svg>
                <div className="text-gray-400 text-xl text-center px-4">
                    Плейлист порожній
                </div>
                <div className="text-gray-500 text-sm mt-2 text-center px-4">
                    Завантажте відео через панель адміністратора
                </div>
            </div>
        );
    }

    // Show message when no video selected
    if (!currentVideo) {
        return (
            <div className="w-full h-screen bg-black flex flex-col items-center justify-center">
                <div className="text-gray-400 text-xl">Оберіть відео для відтворення</div>
            </div>
        );
    }

    return (
        <div className="w-full h-screen bg-black flex items-center justify-center relative">
            {/* Video Player 1 */}
            <video
                ref={video1Ref}
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ${
                    activeVideoIndex === 1 && !crossfading ? 'opacity-100 z-10' :
                        activeVideoIndex === 2 && crossfading ? 'opacity-0 z-10' : 'opacity-0 z-0'
                }`}
                muted
                preload="auto"
                onLoadedMetadata={handleLoadedMetadata(1)}
                onTimeUpdate={activeVideoIndex === 1 ? handleTimeUpdate : undefined}
                onEnded={activeVideoIndex === 1 ? handleEnded : undefined}
                onWaiting={handleWaiting}
                onCanPlay={handleCanPlay(1)}
                onError={handleError(1)}
                playsInline
            />

            {/* Video Player 2 */}
            <video
                ref={video2Ref}
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ${
                    activeVideoIndex === 2 && !crossfading ? 'opacity-100 z-10' :
                        activeVideoIndex === 1 && crossfading ? 'opacity-0 z-10' : 'opacity-0 z-0'
                }`}
                muted
                preload="auto"
                onLoadedMetadata={handleLoadedMetadata(2)}
                onTimeUpdate={activeVideoIndex === 2 ? handleTimeUpdate : undefined}
                onEnded={activeVideoIndex === 2 ? handleEnded : undefined}
                onWaiting={handleWaiting}
                onCanPlay={handleCanPlay(2)}
                onError={handleError(2)}
                playsInline
            />

            {/* Loading Spinner - only shows after 2 seconds */}
            {showLoading && !videoError && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white"></div>
                        <div className="text-white text-lg mt-4">Завантаження...</div>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {videoError && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md z-20">
                    <div className="bg-red-900/90 border border-red-700 rounded-lg p-6 text-center">
                        <svg
                            className="w-12 h-12 text-red-400 mx-auto mb-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <div className="text-white font-semibold text-lg mb-2">
                            {videoError}
                        </div>
                        <div className="text-gray-300 text-sm">
                            URL: {currentVideo.url}
                        </div>
                    </div>
                </div>
            )}

            {/* Video Info Overlay */}
            {currentVideo && !videoError && (
                <div className="absolute bottom-8 left-8 bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2 z-20">
                    <div className="text-white text-sm font-medium">
                        {currentVideo.title || currentVideo.description}
                    </div>
                </div>
            )}
        </div>
    );
}