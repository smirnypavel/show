// import { useState } from "react";
// import { useRouter } from "next/router";
import styles from "@/styles/components/Profile/UpdateProfile/FirstRegister/FirstRegister.module.css";

import Image from "next/image";
import banner from "@/public/bannerForRegister/banner.png";

import { useAppDispatch } from "@/redux/hooks";
import { updateUser } from "@/redux/auth/authOperations";
import MultiStepForm from "./RegistrNew/MultiStepForm";

const MultiPageComponent = () => {
  // const dispatch = useAppDispatch();
  // // // const router = useRouter();

  // const finish = async () => {
  //   await dispatch(updateUser({ register: true }));
  // };

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
        <MultiStepForm />
      </div>
    </div>
  );
};

export default MultiPageComponent;
