// components/UserUpdateForm.tsx
import React, { useState } from "react";

// import CitySearch from "../../helpers/searchCity";
import styles from "@/styles/components/Profile/UpdateProfile/UserUpdateForm.module.css";
import { getUser } from "@/redux/auth/authSelectors";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateUser } from "@/redux/auth/authOperations";
import UpdateInputUi from "@/components/Ui/UpdateInput";
import UpdateLocation from "./UpdateLocation";
import { FaCheck } from "react-icons/fa6";
import { LuPencil } from "react-icons/lu";
import SearchCity from "@/components/helpers/SitySearchNew";

const UserUpdateForm = () => {
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const handleSubmitValue = (value: string, contactType: string) => {
    // Делай что-то с полученным значением value
    console.log("Submitted value:", value);
    const data = {
      [contactType]: value,
    };
    console.log("Submitted data:", data);
    dispatch(updateUser(data));
  };
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = async () => {
    setIsEditing(false);
    if (selectedCity !== "") {
      await dispatch(updateUser({ location: selectedCity }));
      setSelectedCity("");
    }
    return;
  };
  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };

  return (
    <div className={styles.container}>
      <p className={styles.titleInput}>Ваше Ім’я:</p>
      <UpdateInputUi
        initialValue={user.firstName}
        onSubmit={(value) => handleSubmitValue(value, "firstName")}
        placeholder={"Тут має бути Ваше Ім’я"}
      />
      <p className={styles.titleInput}>Назва гурту:</p>
      <UpdateInputUi
        initialValue={user.title}
        onSubmit={(value) => handleSubmitValue(value, "title")}
        placeholder={
          "Тут має бути назва Вашого гурту або назва Вашого колективу "
        }
      />
      <p className={styles.titleInput}>Ціна:</p>
      <UpdateInputUi
        initialValue={user.price}
        onSubmit={(value) => handleSubmitValue(value, "price")}
        placeholder={`₴ ${"Тут має бути ціна за годину або за виступ"}`}
      />

      <p className={styles.titleInput}>Місто:</p>
      <div className={styles.locationContainer}>
        <button
          onClick={isEditing ? handleSubmit : handleEdit}
          className={styles.buttonEdit}>
          {isEditing ? (
            <FaCheck className={styles.iconOk} />
          ) : (
            <LuPencil className={styles.iconEdit} />
          )}
        </button>
        {isEditing ? (
          // <UpdateLocation onCitySelect={handleCitySelect} />
          <SearchCity onCitySelect={handleCitySelect} />
        ) : (
          <div className={styles.location}>
            {`${
              user?.location
                ? user.location.split(",")[0]
                : "Тут має бути місто чи область де Ви працюєте"
            }`}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserUpdateForm;
