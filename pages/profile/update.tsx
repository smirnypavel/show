import React from "react";
import UserUpdateForm, {
  UserUpdateFormValues,
} from "@/components/User/UserUpdateForm";
import CloudinaryImageUpload from "@/components/User/UploadImage";
import style from "../../styles/Profile/ProfileUpdate.module.css";
import { useAppDispatch } from "@/redux/hooks";
import { updateUser } from "@/redux/auth/authOperations";
import { useSelector } from "react-redux";
import { getUser } from "@/redux/auth/authSelectors";

const UpdateProfile: React.FC = () => {
  const user = useSelector(getUser);
  console.log(user._id);
  const dispatch = useAppDispatch();
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
    video: [],
    category: "",
    genre: "",
  };

  const handleSubmit = (values: UserUpdateFormValues) => {
    // Обработка отправки формы
    dispatch(updateUser({ credential: { ...values } }));
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
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
