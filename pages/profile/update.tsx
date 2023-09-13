import React from "react";
import UserUpdateForm, {
  UserUpdateFormValues,
} from "@/components/User/UserUpdateForm";

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
      <UserUpdateForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UpdateProfile;
