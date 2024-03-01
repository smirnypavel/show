import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/components/Profile/UpdateProfile/FirstRegister/FirstRegister.module.css";
import {
  UpdateSocial,
  UpdateContacts,
  UserCat,
  UpdateMedia,
  ProfileUpdateInfo,
} from "@/components/Profile/UpdateProfile";
import UserProfile from "@/components/Profile/UpdateProfile/FirstRegister/UserProfile";
import GroupInfo from "./GroupInfo";
import Image from "next/image";
import banner from "@/public/bannerForRegister/banner.png";
import UpdateContactsFirstRegister from "./UpdateContactFirstRegister";
import UserCatFirstRegister from "./UserCatFirstRegister";
import UpdateSocialFirstReg from "./UpdateSocialFirstReg";
import UpdateMediaFirstReg from "./UpdateMediaFirstReg";
import FinishReg from "./FinishReg";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { updateUser } from "@/redux/auth/authOperations";

// Компоненты для каждой страницы
const Page1 = () => (
  <div>
    <UserProfile />
  </div>
);
const Page2 = () => (
  <div>
    <UpdateContactsFirstRegister />
  </div>
);
const Page3 = () => (
  <div>
    <GroupInfo />
  </div>
);
const Page4 = () => (
  <div>
    <UserCatFirstRegister />
  </div>
);
const Page5 = () => (
  <div>
    <UpdateSocialFirstReg />
  </div>
);
const Page6 = () => (
  <div>
    <UpdateMediaFirstReg />
  </div>
);
const Page7 = () => (
  <div>
    <div>
      <FinishReg />
    </div>
  </div>
);

const MultiPageComponent = () => {
  const dispatch = useAppDispatch();
  // const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 7;

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const finish = async () => {
    await dispatch(updateUser({ register: true }));
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 1:
        return <Page1 />;
      case 2:
        return <Page2 />;
      case 3:
        return <Page3 />;
      case 4:
        return <Page4 />;
      case 5:
        return <Page5 />;
      case 6:
        return <Page6 />;
      case 7:
        return <Page7 />;
      default:
        return null;
    }
  };

  const renderButton = () => {
    if (currentPage === 1) {
      return (
        <div className={styles.buttonContainerFirstPage}>
          <button
            type="button"
            onClick={goToNextPage}
            className={styles.button}>
            Далі
          </button>
        </div>
      );
    } else if (currentPage === totalPages) {
      return (
        <div className={styles.buttonContainer}>
          <button
            type="button"
            onClick={goToPreviousPage}
            className={styles.button}>
            Назад
          </button>
          <Link
            onClick={finish}
            className={styles.button}
            href={"/profile"}>
            Завершити
          </Link>
        </div>
      );
    } else {
      return (
        <div className={styles.buttonContainer}>
          <button
            type="button"
            onClick={goToPreviousPage}
            className={styles.button}>
            Назад
          </button>
          <button
            type="button"
            onClick={goToNextPage}
            className={styles.button}>
            Далі
          </button>
        </div>
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={banner}
          alt="banner"
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </div>
      <div className={styles.contentContainer}>
        {renderPageContent()}
        {renderButton()}
      </div>
    </div>
  );
};

export default MultiPageComponent;
