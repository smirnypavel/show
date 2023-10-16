import React, { useState } from "react";
import Image from "next/image";

export interface CloudinaryImage {
  url: string;
  publicId: string;
}

interface CloudinaryImageUploadProps {
  onImagesUpload: (images: CloudinaryImage[]) => void;
}

const CloudinaryImageUpload: React.FC<CloudinaryImageUploadProps> = ({
  onImagesUpload,
}) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    if (files.length + previews.length > 5) {
      alert("Можно загрузить только до 5 изображений!");
      return;
    }

    setLoading(true);

    const newPreviews: string[] = [...previews];
    const promises: Promise<string>[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const promise = readFileAsync(file);
      promises.push(promise);

      promise.then((preview) => {
        newPreviews.push(preview);
        setPreviews([...newPreviews]); // Добавляем новый предварительный просмотр к текущему состоянию
      });
    }

    Promise.all(promises).then(() => setLoading(false));
  };

  const readFileAsync = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemovePreview = (index: number) => {
    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  const handleUploadConfirmed = () => {
    const images: CloudinaryImage[] = previews.map((url, index) => ({
      url,
      publicId: `public_id_${index}`,
    }));
    onImagesUpload(images);
    setPreviews([]);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        multiple
        disabled={previews.length >= 5 || loading}
      />
      {loading && <p>Завантаження...</p>}
      <div>
        {previews.map((preview, index) => (
          <div key={index}>
            <Image
              src={preview}
              alt={`Превью ${index + 1}`}
              width={100}
              height={100}
            />
            <button onClick={() => handleRemovePreview(index)}>Видалити</button>
          </div>
        ))}
      </div>
      <button
        onClick={handleUploadConfirmed}
        disabled={previews.length === 0}>
        Ок
      </button>
    </div>
  );
};

export default CloudinaryImageUpload;
