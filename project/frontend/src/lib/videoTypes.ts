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