export interface Video {
    id: string;
    title: string;
    description: string;
    url: string;
    duration: number;
    thumbnail?: string;
}

export type PlayerState = 'playing' | 'paused' | 'loading' | 'ended';

export interface VideoCommand {
    type: 'PLAY' | 'PAUSE' | 'SEEK' | 'NEXT' | 'PREV' | 'LOAD';
    videoId?: string;
    currentTime?: number;
}

export interface PlaylistItem {
    video: Video;
    position: number;
}

// API Request/Response types
export interface UploadVideoRequest {
    description: string;
    video: File;
}

export interface StopPlayerRequest {
    currentVideoNum: number;
    timeline: string;
}

export interface RemoveVideoRequest {
    currentVideoNum: number;
}

export interface ChangeOrderRequest {
    videoNames: string[];
}

export interface VideoPlayerResponse {
    id: string;
    userId: string;
    videos: string[];
    currentVideoNum: number;
    timeline: string;
    createdAt: string;
    updatedAt: string;
}