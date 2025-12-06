import {useState} from 'react';
import Textarea from '../shared/Textarea';
import {videoPlayerApi} from '../../lib/api';

interface UploadVideoFormProps {
    onUploadSuccess?: () => void;
}

export default function UploadVideoForm({onUploadSuccess}: UploadVideoFormProps) {
    const [description, setDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Перевірка що це відео файл
            if (!file.type.startsWith('video/')) {
                setError('Будь ласка, оберіть відео файл');
                setSelectedFile(null);
                return;
            }

            // Перевірка розміру (наприклад, максимум 500MB)
            const maxSize = 500 * 1024 * 1024; // 500MB
            if (file.size > maxSize) {
                setError('Розмір файлу не повинен перевищувати 500MB');
                setSelectedFile(null);
                return;
            }

            setSelectedFile(file);
            setError(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedFile) {
            setError('Будь ласка, оберіть відео файл');
            return;
        }

        if (!description.trim()) {
            setError('Будь ласка, додайте опис відео');
            return;
        }

        try {
            setIsUploading(true);
            setError(null);
            setUploadProgress(0);

            // Симуляція прогресу (можна замінити на реальний XMLHttpRequest для прогресу)
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return 90;
                    }
                    return prev + 10;
                });
            }, 200);

            await videoPlayerApi.upload(selectedFile, description);

            clearInterval(progressInterval);
            setUploadProgress(100);

            // Очистити форму після успішного завантаження
            setDescription('');
            setSelectedFile(null);
            setUploadProgress(0);

            // Скинути input file
            const fileInput = document.getElementById('video-file-input') as HTMLInputElement;
            if (fileInput) {
                fileInput.value = '';
            }

            // Викликати callback для оновлення списку відео
            if (onUploadSuccess) {
                onUploadSuccess();
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Помилка завантаження відео');
        } finally {
            setIsUploading(false);
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Завантажити відео</h3>

            {error && (
                <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* File Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Відео файл
                    </label>
                    <div className="flex items-center gap-3">
                        <label
                            htmlFor="video-file-input"
                            className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white
                                       hover:bg-gray-600 cursor-pointer transition-colors flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                            </svg>
                            Обрати файл
                        </label>
                        <input
                            id="video-file-input"
                            type="file"
                            accept="video/*"
                            onChange={handleFileChange}
                            disabled={isUploading}
                            className="hidden"
                        />
                        {selectedFile && (
                            <div className="text-gray-300 text-sm">
                                <p className="font-medium">{selectedFile.name}</p>
                                <p className="text-gray-400">{formatFileSize(selectedFile.size)}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Description */}
                <Textarea
                    label="Опис відео"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={isUploading}
                    placeholder="Введіть опис відео..."
                    rows={3}
                />

                {/* Upload Progress */}
                {isUploading && uploadProgress > 0 && (
                    <div>
                        <div className="flex justify-between text-sm text-gray-300 mb-2">
                            <span>Завантаження...</span>
                            <span>{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{width: `${uploadProgress}%`}}
                            />
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isUploading || !selectedFile}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700
                               transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isUploading ? 'Завантаження...' : 'Завантажити відео'}
                </button>
            </form>
        </div>
    );
}