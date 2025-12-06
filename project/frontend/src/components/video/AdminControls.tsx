import {useVideoStore} from '../../store/videoStore';

export default function AdminControls() {
    const {
        currentVideo,
        playerState,
        currentTime,
        duration,
        play,
        pause,
        seek,
        nextVideo,
        prevVideo
    } = useVideoStore();

    const handlePlayPause = () => {
        if (playerState === 'playing') {
            pause();
        } else {
            play();
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = Number(e.target.value);
        console.log('Seeking to:', newTime, 'duration:', duration);
        seek(newTime);
    };

    // Format seconds to MM:SS
    const formatTime = (seconds: number) => {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Debug info
    console.log('AdminControls render:', {
        currentTime,
        duration,
        playerState,
        videoTitle: currentVideo?.title
    });

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">
                {currentVideo?.title || 'No video'}
            </h3>

            {currentVideo && (
                <div className="mb-4 text-sm text-gray-600">
                    <p>{currentVideo.description}</p>
                </div>
            )}

            {/* Play/Pause button */}
            <div className="flex items-center gap-4 mb-4">
                <button
                    onClick={handlePlayPause}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
                >
                    {playerState === 'playing' ? '⏸ Pause' : '▶ Play'}
                </button>

                <div className="text-sm text-gray-600">
                    {playerState === 'loading' && 'Loading...'}
                    {playerState === 'ended' && 'Ended'}
                </div>
            </div>

            {/* Seek bar */}
            <div className="mb-4">
                <input
                    type="range"
                    min="0"
                    max={duration > 0 ? duration : 100}
                    value={currentTime}
                    onChange={handleSeek}
                    step="0.1"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>

                {/* Debug info */}
                <div className="text-xs text-gray-400 mt-1">
                    Debug: time={currentTime.toFixed(1)}s, duration={duration.toFixed(1)}s
                </div>
            </div>

            {/* Next/Prev buttons */}
            <div className="flex gap-2">
                <button
                    onClick={prevVideo}
                    className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors flex-1"
                >
                    ⏮ Previous
                </button>
                <button
                    onClick={nextVideo}
                    className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors flex-1"
                >
                    Next ⏭
                </button>
            </div>
        </div>
    );
}