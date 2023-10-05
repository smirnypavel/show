import React, { useState } from "react";
import { getUser } from "@/redux/auth/authSelectors";
import { useSelector } from "react-redux";
import Image from "next/image";

const cloudName = "show-image";
const uploadPreset = "aar6vwv6";

const CloudinaryImageUpload: React.FC = () => {
  const [images, setImages] = useState<
    Array<{ url: string; publicId: string }>
  >([]);
  const [previews, setPreviews] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector(getUser);
  const [fileObjects, setFileObjects] = useState<Array<File>>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    if (files.length + previews.length > 5) {
      alert("Можно загрузить только до 5 изображений!");
      return;
    }

    const newPreviews: Array<string> = [];
    const newFileObjects: Array<File> = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        setPreviews([...newPreviews]);
      };
      reader.readAsDataURL(files[i]);

      newFileObjects.push(files[i]);
    }

    setFileObjects(newFileObjects);
  };

  const handleRemovePreview = (index: number) => {
    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);

    const newFileObjects = [...fileObjects];
    newFileObjects.splice(index, 1);
    setFileObjects(newFileObjects);
  };

  const handleUploadConfirmed = async () => {
    const formData = new FormData();
    fileObjects.forEach((file) => {
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      formData.append("folder", `user_${user._id}`);
    });

    try {
      setLoading(true);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      const uploadedImages = fileObjects.map((file, index) => ({
        url: data.secure_url,
        publicId: data.public_id,
      }));

      setImages(uploadedImages);
      setPreviews([]);
      setFileObjects([]);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        multiple
        disabled={previews.length >= 5}
      />
      {loading && <p>Загрузка...</p>}
      <div>
        {previews.map((preview, index) => (
          <div key={index}>
            <Image
              src={preview}
              alt={`Превью ${index + 1}`}
              width={100}
              height={100}
            />
            <button onClick={() => handleRemovePreview(index)}>Удалить</button>
          </div>
        ))}
      </div>
      <button onClick={handleUploadConfirmed}>Ок</button>
      {images.map((image, index) => (
        <div key={index}>
          <Image
            src={image.url}
            alt={`Фото ${index + 1}`}
            width={100}
            height={100}
          />
        </div>
      ))}
    </div>
  );
};

export default CloudinaryImageUpload;
