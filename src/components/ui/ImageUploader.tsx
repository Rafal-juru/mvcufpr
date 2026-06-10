import { useState } from 'react';

interface ImageUploaderProps {
  onImageUrl: (url: string) => void;
  label?: string;
}

export default function ImageUploader({ onImageUrl, label = 'URL da Imagem' }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>('');
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`${API_URL}/api/upload-image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      const fullUrl = `${API_URL}${data.url}`;

      setPreview(fullUrl);
      onImageUrl(fullUrl);
    } catch (err) {
      setError(`✗ Erro ao fazer upload: ${err}`);
    } finally {
      setUploading(false);
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleUpload(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      handleUpload(files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-cesmvc-green bg-green-50'
            : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
          id="image-input"
          disabled={uploading}
        />

        <label htmlFor="image-input" className="cursor-pointer">
          {uploading ? (
            <div className="text-gray-600">
              <p>Enviando imagem...</p>
            </div>
          ) : (
            <div className="text-gray-600">
              <p className="font-medium">Arraste a imagem aqui</p>
              <p className="text-sm text-gray-500">ou clique para selecionar</p>
            </div>
          )}
        </label>
      </div>

      {error && (
        <div className="p-2 bg-red-100 text-red-800 rounded text-sm">
          {error}
        </div>
      )}

      {preview && (
        <div className="relative">
          <img src={preview} alt="Preview" className="max-h-40 rounded" />
          <p className="text-xs text-gray-500 mt-2 break-all">{preview}</p>
        </div>
      )}
    </div>
  );
}
