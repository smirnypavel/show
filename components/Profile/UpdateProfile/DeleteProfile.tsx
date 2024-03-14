import { deleteProfile, logOut } from "@/redux/auth/authOperations";
import styles from "@/styles/components/Profile/UpdateProfile/Logout.module.css";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface IDelete {
  close: () => void;
}

const DeleteProfile: React.FC<IDelete> = ({ close }) => {
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleDelete = () => {
    router.push("/").then(() => {
      dispatch(deleteProfile({ password: password }));
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Ви дійсно хочете видалити профіль(?</h2>
      <h3 className={styles.title}>Введіть пароль для підтвердження</h3>
      <input
        type="password" // Changed type to password for security
        value={password}
        onChange={handleChange}
        className={styles.input} // Added className for styling
      />

      <div className={styles.buttonsContainer}>
        <button
          className={styles.button}
          type="button"
          onClick={handleDelete}>
          Так
        </button>
        <button
          className={styles.button}
          type="button"
          onClick={close}>
          Залишитись
        </button>
      </div>
    </div>
  );
};

export default DeleteProfile;
