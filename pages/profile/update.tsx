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
    video: [],
  };

  const handleSubmit = (values: UserUpdateFormValues) => {
    // Фильтруем только заполненные поля
    const filteredValues = Object.keys(values).reduce((acc, key) => {
      if (values[key]) {
        acc[key] = values[key];
      }
      return acc;
    }, {} as UserUpdateFormValues);

    // Обработка отправки формы с отфильтрованными значениями
    dispatch(updateUser({ ...filteredValues }));
    console.log(filteredValues);
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
