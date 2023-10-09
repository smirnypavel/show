import React, { useState } from "react";
import { toast } from "react-hot-toast";

import UserUpdateForm, {
  UserUpdateFormValues,
} from "@/components/User/UserUpdateForm";
import CloudinaryImageUpload, {
  CloudinaryImage,
} from "@/components/User/UploadImage";
import style from "../../styles/Profile/ProfileUpdate.module.css";
import { useAppDispatch } from "@/redux/hooks";
import { updateUser } from "@/redux/auth/authOperations";
import { useSelector } from "react-redux";
import { getUser } from "@/redux/auth/authSelectors";
import UploadVideo from "@/components/User/UploadVideo";

const UpdateProfile: React.FC = () => {
  const [videoUrls, setVideoUrls] = useState<string[]>([]);

  const [selectedImages, setSelectedImages] = useState<CloudinaryImage[]>([]);

  const [uploadedImages, setUploadedImages] = useState<CloudinaryImage[]>([]);

  const handleImagesSelect = (images: CloudinaryImage[]) => {
    setSelectedImages(images);
  };
  const user = useSelector(getUser);
  const dispatch = useAppDispatch();

  const handleImagesUpload = async (
    selectedImages: CloudinaryImage[]
  ): Promise<CloudinaryImage[]> => {
    const cloudName = "show-image";
    const uploadPreset = "aar6vwv6";

    const uploadedImages: CloudinaryImage[] = [];

    for (let i = 0; i < selectedImages.length; i++) {
      const formData = new FormData(); // Создаем новый объект formData для каждого изображения
      const image = selectedImages[i];

      formData.append("file", image.url);
      formData.append("upload_preset", uploadPreset);
      formData.append("folder", `user_${user._id}`);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        // Создаем объект CloudinaryImage с уникальным идентификатором и ссылкой на фото
        const cloudinaryImage: CloudinaryImage = {
          url: data.secure_url,
          publicId: data.public_id,
        };
        // Добавляем объект CloudinaryImage в массив uploadedImages

        uploadedImages.push(cloudinaryImage);
      } catch (error) {
        // Обработка ошибок, если загрузка изображения не удалась
        toast.error("Error uploading images:");
      }
    }
    // Возвращаем массив объектов CloudinaryImage после успешной загрузки
    return uploadedImages;
  };
  // Используйте значения из хранилища как начальные значения формы
  const initialValues: UserUpdateFormValues = {
    firstName: "",
    lastName: "",
    title: "",
    description: "",
    phone: "",
    telegram: "",
    viber: "",
    whatsapp: "",
    price: "",
    photo: [],
  };

  const handleSubmit = async (values: UserUpdateFormValues) => {
    // Фильтруем только заполненные поля
    const filteredValues = Object.keys(values).reduce((acc, key) => {
      if (values[key]) {
        acc[key] = values[key];
      }
      return acc;
    }, {} as UserUpdateFormValues);
    // Проверяем, если массив videoUrls не пустой, то добавляем его в объект filteredValues
    if (videoUrls.length > 0) {
      filteredValues.video = videoUrls;
    }
    // Загружаем фотографии на Cloudinary
    const uploadedImages = await handleImagesUpload(selectedImages);
    // Проверяем, если массив загруженных изображений не пустой, добавляем его к объекту filteredValues
    if (uploadedImages.length > 0) {
      filteredValues.photo = uploadedImages;
    }
    // Проверяем, если объект filteredValues пустой
    if (Object.keys(filteredValues).length === 0) {
      // Объект пустой, не отправляем запрос
      toast.error("Перед відправкою, заповніть форму");
      return;
    }
    // Обработка отправки формы с отфильтрованными значениями
    dispatch(updateUser({ ...filteredValues }));
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <div>
        <UserUpdateForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
        <div className={style.container}>
          <CloudinaryImageUpload onImagesUpload={handleImagesSelect} />
          <UploadVideo onVideoUrlsUpdate={(urls) => setVideoUrls(urls)} />
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
