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
    <UpdateMedia />
  </div>
);
const Page7 = () => (
  <div>
    <div>page7</div>
  </div>
);

const MultiPageComponent = () => {
  const router = useRouter();
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

  const finish = () => {
    // Обработка завершения, например, переход на другую страницу или выполнение действий
    console.log("Завершено!");
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
      default:
        return null;
    }
  };

  const renderButton = () => {
    if (currentPage === 1) {
      return (
        <div className={styles.buttonContainerFirstPage}>
          <button
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
            onClick={goToPreviousPage}
            className={styles.button}>
            Назад
          </button>
          <button
            onClick={finish}
            className={styles.button}>
            Завершити
          </button>
        </div>
      );
    } else {
      return (
        <div className={styles.buttonContainer}>
          <button
            onClick={goToPreviousPage}
            className={styles.button}>
            Назад
          </button>
          <button
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
