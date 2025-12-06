import {useEffect, useRef} from 'react';
import {useVideoStore} from '../../store/videoStore';

export default function VideoPlayer() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const lastUpdateRef = useRef(0);

    const {
        currentVideo,
        playerState,
        currentTime,
        updateTime,
        setDuration,
        setPlayerState,
        nextVideo
    } = useVideoStore();

    // Sync player state (play/pause) with video element
    useEffect(() => {
        if (!videoRef.current) return;

        if (playerState === 'playing') {
            videoRef.current.play().catch((error) => {
                console.error('Play failed:', error);
                setPlayerState('paused');
            });
        } else if (playerState === 'paused') {
            videoRef.current.pause();
        }
    }, [playerState, setPlayerState]);

    // Sync currentTime when seek happens
    useEffect(() => {
        if (!videoRef.current) return;

        const diff = Math.abs(videoRef.current.currentTime - currentTime);
        if (diff > 1) {
            videoRef.current.currentTime = currentTime;
        }
    }, [currentTime]);

    // When video metadata loads - set duration and auto-play
    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            const videoDuration = videoRef.current.duration;
            console.log('Video loaded, duration:', videoDuration);
            setDuration(videoDuration);
        }
    };

    // When video is ready to play - auto-start
    const handleCanPlay = () => {
        console.log('Can play, current state:', playerState);
        // Auto-play on first load or after loading new video
        if (playerState === 'loading' || playerState === 'paused') {
            setPlayerState('playing');
        }
    };

    // Update current time - throttled to 500ms
    const handleTimeUpdate = () => {
        if (!videoRef.current) return;

        const now = Date.now();
        if (now - lastUpdateRef.current >= 500) {
            const time = videoRef.current.currentTime;
            console.log('Time update:', time);
            updateTime(time);
            lastUpdateRef.current = now;
        }
    };

    // Auto advance to next video when ended
    const handleEnded = () => {
        console.log('Video ended');
        setPlayerState('ended');
        setTimeout(() => {
            nextVideo();
        }, 1000);
    };

    const handleWaiting = () => {
        console.log('Video waiting/buffering');
        setPlayerState('loading');
    };

    return (
        <div className="w-full h-screen bg-black flex items-center justify-center">
            {currentVideo ? (
                <video
                    ref={videoRef}
                    src={currentVideo.url}
                    className="w-full h-full object-contain"
                    onLoadedMetadata={handleLoadedMetadata}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleEnded}
                    onWaiting={handleWaiting}
                    onCanPlay={handleCanPlay}
                />
            ) : (
                <div className="text-white text-2xl">
                    No video selected
                </div>
            )}

            {playerState === 'loading' && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="text-white text-xl">Loading...</div>
                </div>
            )}
        </div>
    );
}