// components/UserUpdateForm.tsx
import React, { useState } from "react";
import styles from "@/styles/components/Profile/UpdateProfile/FirstRegister/GroupForm.module.css";
import { getUser } from "@/redux/auth/authSelectors";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateUser } from "@/redux/auth/authOperations";
import GroupDescription from "./GroupDescription";
import UpdateInputNew from "@/components/Ui/UpdateInputNew";

const GroupInfo = () => {
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const handleSubmitValue = (value: string, contactType: string) => {
    const data = {
      [contactType]: value,
    };
    dispatch(updateUser(data));
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>
        Тепер запишемо інформацію щодо Вашого виду діяльності
      </p>
      <p className={styles.titleInput}>Назва гурту чи Вашої діяльності:</p>
      <UpdateInputNew
        initialValue={user.title}
        onSubmit={(value) => handleSubmitValue(value, "title")}
        placeholder={
          "Тут має бути назва Вашого гурту або назва Вашого колективу "
        }
      />
      <p className={styles.titleInput}>Ціна:</p>
      <UpdateInputNew
        initialValue={user.price}
        onSubmit={(value) => handleSubmitValue(value, "price")}
        placeholder={`₴ ${"Тут має бути ціна за годину або за виступ"}`}
      />
      <GroupDescription />
    </div>
  );
};

export default GroupInfo;
