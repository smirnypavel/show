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
  const [loading, setLoading] = useState(false);
  const user = useSelector(getUser);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    // Проверка на максимальное количество загружаемых файлов
    if (files.length > 5) {
      alert("Можно загрузить только до 5 изображений!");
      return;
    }

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
      formData.append("upload_preset", uploadPreset);
      formData.append("folder", `user_${user._id}`);
      console.log(user._id, "username");

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
        const uploadedImage = {
          url: data.secure_url,
          publicId: data.public_id,
        };

        setImages((prevImages) => [...prevImages, uploadedImage]);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        multiple
        disabled={images.length >= 5} // Заблокировать поле ввода, если загружено 5 изображений
      />
      {loading && <p>Загрузка...</p>}
      <div>
        {images.map((image, index) => (
          <div key={index}>
            <Image
              src={image.url}
              alt={`Фото ${index + 1}`}
              width={100}
              height={100}
              style={{ maxWidth: "100px", margin: "10px" }}
            />
            <p>Ссылка на фото: {image.url}</p>
            <p>publicId: {image.publicId}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CloudinaryImageUpload;
