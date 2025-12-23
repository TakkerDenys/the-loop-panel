import {useEffect} from 'react';
import AdminControls from '../video/AdminControls';
import UploadVideoForm from './UploadVideoForm';
import VideoList from './VideoList';
import {useVideoStore} from '../../store/videoStore';
import type {Video} from '../../lib/videoTypes';

export default function ControlPage() {
    const {
        playlist,
        currentVideo,
        loadPlaylistFromAPI,
        loadVideo,
        deleteVideo,
        isLoading,
        error
    } = useVideoStore();

    // Load playlist on mount
    useEffect(() => {
        loadPlaylistFromAPI();
    }, [loadPlaylistFromAPI]);

    const handleOpenPlayer = () => {
        window.open('/player', '_blank', 'width=1920,height=1080');
    };

    const handleUploadSuccess = async () => {
        // Playlist will be reloaded automatically by uploadVideo in store
        await loadPlaylistFromAPI();
        console.log('Upload successful, playlist reloaded');
    };

    const handlePlayVideo = (video: Video) => {
        loadVideo(video.id);
    };

    const handleDeleteVideo = async (videoId: string) => {
        try {
            await deleteVideo(videoId);
        } catch (error) {
            console.error('Failed to delete video:', error);
            // Error is already set in store
        }
    };

    return (
        <div className="space-y-6">
            {/* Header with Open Player button */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-white">Керування відео</h2>

                    <button
                        onClick={handleOpenPlayer}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0
  00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                        </svg>
                        <span>Відкрити плеєр</span>
                    </button>
                </div>

                <p className="text-gray-400 mt-2">
                    Керуйте відтворенням відео. Зміни синхронізуються з плеєром в реальному часі.
                </p>
            </div>

            {/* Global error */}
            {error && (
                <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 text-red-200">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414
  1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span>{error}</span>
                    </div>
                </div>
            )}

            {/* Upload Video Form */}
            <UploadVideoForm onUploadSuccess={handleUploadSuccess}/>

            {/* Video List */}
            <VideoList
                videos={playlist}
                currentVideoId={currentVideo?.id}
                onPlayVideo={handlePlayVideo}
                onDeleteVideo={handleDeleteVideo}
                isLoading={isLoading}
            />

            {/* Video controls */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Контролер плеєра</h3>
                <AdminControls/>
            </div>
        </div>
    );
}