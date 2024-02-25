// components/UserUpdateForm.tsx
import React, { useState } from "react";
import styles from "@/styles/components/Profile/UpdateProfile/FirstRegister/UserInfo.module.css";
import { getUser } from "@/redux/auth/authSelectors";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateUser } from "@/redux/auth/authOperations";
import UpdateInputNew from "@/components/Ui/UpdateInputNew";
import SearchCityRegister from "./SearchCityRegister";

const UserInfo = () => {
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const [selectedCity, setSelectedCity] = useState("");
  const handleSubmitValue = (value: string, contactType: string) => {
    // Делай что-то с полученным значением value

    const data = {
      [contactType]: value,
    };
    console.log("Submitted data:", data);
    dispatch(updateUser(data));
  };

  return (
    <div className={styles.container}>
      <p className={styles.titleInput}>Ваше Ім’я:</p>
      <UpdateInputNew
        initialValue={user.firstName}
        onSubmit={(value) => handleSubmitValue(value, "firstName")}
        placeholder={"Тут має бути Ваше Ім’я"}
      />
      <p className={styles.titleInput}>
        Місто чи область в якій Bи будете працювати:
      </p>
      <SearchCityRegister />
    </div>
  );
};

export default UserInfo;
