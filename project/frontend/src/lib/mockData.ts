import type {Video} from './videoTypes';

export const MOCK_VIDEOS: Video[] = [
    {
        id: '1',
        title: 'Тестове відео 1',
        description: 'Перше тестове відео для перевірки плеєра',
        url: '/shared/videos/854336-hd_1920_1080_24fps.mp4',
        duration: 5,
    },
    {
        id: '2',
        title: 'Тестове відео 2',
        description: 'Друге тестове відео',
        url: '/shared/videos/1654216-hd_1920_1080_30fps.mp4',
        duration: 6,
    },
    {
        id: '3',
        title: 'Тестове відео 3',
        description: 'Третє тестове відео',
        url: '/shared/videos/1826904-hd_1920_1080_24fps.mp4',
        duration: 44,
    },
];