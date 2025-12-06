import type {Video} from '../../lib/videoTypes';

interface VideoListProps {
    videos: Video[];
    currentVideoId?: string | null;
    onPlayVideo: (video: Video) => void;
    onDeleteVideo: (videoId: string) => void;
    isLoading?: boolean;
}

export default function VideoList({
                                      videos,
                                      currentVideoId,
                                      onPlayVideo,
                                      onDeleteVideo,
                                      isLoading = false,
                                  }: VideoListProps) {
    const formatDuration = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (isLoading) {
        return (
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Плейлист</h3>
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }

    if (videos.length === 0) {
        return (
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Плейлист</h3>
                <div className="text-center py-12">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2
  2v8a2 2 0 002 2z"
                        />
                    </svg>
                    <p className="mt-4 text-gray-400">Плейлист порожній</p>
                    <p className="mt-2 text-sm text-gray-500">Завантажте перше відео щоб почати</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Плейлист</h3>
                <span className="text-sm text-gray-400">{videos.length} відео</span>
            </div>

            <div className="space-y-3">
                {videos.map((video, index) => {
                    const isCurrentVideo = video.id === currentVideoId;

                    return (
                        <div
                            key={video.id}
                            className={`
                                  p-4 rounded-lg border transition-all
                                  ${
                                isCurrentVideo
                                    ? 'bg-blue-900/30 border-blue-600'
                                    : 'bg-gray-700/50 border-gray-600 hover:bg-gray-700'
                            }
                              `}
                        >
                            <div className="flex items-start gap-4">
                                {/* Index Number */}
                                <div
                                    className={`
                                          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                                          ${
                                        isCurrentVideo
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-600 text-gray-300'
                                    }
                                      `}
                                >
                                    {index + 1}
                                </div>

                                {/* Video Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-white font-medium truncate">
                                                {video.title || video.description || 'Без назви'}
                                            </h4>
                                            {video.description && video.title && (
                                                <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                                                    {video.description}
                                                </p>
                                            )}
                                            <div className="flex items-center gap-4 mt-2">
                                                {video.duration > 0 && (
                                                    <span className="text-xs text-gray-400">
                                                          <svg
                                                              className="inline w-4 h-4 mr-1"
                                                              fill="none"
                                                              stroke="currentColor"
                                                              viewBox="0 0 24 24"
                                                          >
                                                              <path
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  strokeWidth={2}
                                                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                              />
                                                          </svg>
                                                        {formatDuration(video.duration)}
                                                      </span>
                                                )}
                                                {isCurrentVideo && (
                                                    <span className="text-xs text-blue-400 font-medium">
                                                          Зараз грає
                                                      </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => onPlayVideo(video)}
                                                className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                                                title="Відтворити"
                                            >
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M8 5v14l11-7z"/>
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (
                                                        window.confirm(
                                                            'Ви впевнені що хочете видалити це відео?'
                                                        )
                                                    ) {
                                                        onDeleteVideo(video.id);
                                                    }
                                                }}
                                                className="p-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white transition-colors"
                                                title="Видалити"
                                            >
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5
  4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}