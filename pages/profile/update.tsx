import React from "react";
import UserUpdateForm, {
  UserUpdateFormValues,
} from "@/components/User/UserUpdateForm";
import CloudinaryImageUpload from "@/components/User/UploadImage";
import YouTubeEmbed from "@/components/User/YouTubeIFrame";
import style from "../../styles/Profile/ProfileUpdate.module.css";

const UpdateProfile: React.FC = () => {
  const initialValues: UserUpdateFormValues = {
    firstName: "",
    lastName: "",
    title: "",
    description: "",
    phone: "",
    telegram: "",
    viber: "",
    whatsapp: "",
    location: "",
    genre: "",
    price: "",
  };

  const handleSubmit = (values: UserUpdateFormValues) => {
    // Обработка отправки формы
    console.log(values); // Замените эту строку на свою логику
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
          <CloudinaryImageUpload />
          <YouTubeEmbed />
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
