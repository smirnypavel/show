import { logOut } from "@/redux/auth/authOperations";
import styles from "@/styles/components/Profile/UpdateProfile/Logout.module.css";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/router";
import React from "react";

interface ILogout {
  close: () => void; // corrected the interface definition
}

const Logout: React.FC<ILogout> = ({ close }) => {
  // corrected the function declaration
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    router.push("/").then(() => {
      dispatch(logOut());
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Ви дійсно хочете покинути додаток?</h2>

      <div className={styles.buttonsContainer}>
        <button
          className={styles.button}
          type="button"
          onClick={handleLogout}>
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

export default Logout;
