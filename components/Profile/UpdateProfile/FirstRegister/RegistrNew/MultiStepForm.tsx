import React, { useState } from "react";
import { useRouter } from "next/router"; // Импортируйте useRouter
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step5 from "./Step5";
import UserCatFirstRegister from "../UserCatFirstRegister";
import UpdateMediaFirstReg from "./UpdateMediaFirstReg";
import FinishReg from "./FinishReg";
import styles from "@/styles/components/Profile/UpdateProfile/FirstRegister/FirstRegNew/ultiStepForm.module.css";
import { useAppDispatch } from "@/redux/hooks";
import { firstReg } from "@/redux/auth/authOperations";
import { FormData, StepProps } from "@/types/IRegFormData";

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    phone: "",
    telegram: "",
    email: "",
    viber: "",
    whatsapp: "",
    title: "",
    price: "",
    description: "",
    social: {
      Facebook: "",
      Instagram: "",
      Youtube: "",
      TikTok: "",
      WebSite: "",
    },
  });

  const router = useRouter(); // Инициализируйте useRouter
  const dispatch = useAppDispatch();

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const filterEmptyFields = (data: any): any => {
    const filteredData: any = {};
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (typeof value === "string" && value.trim() !== "") {
        filteredData[key] = value;
      } else if (typeof value === "object" && value !== null) {
        const nestedFilteredData = filterEmptyFields(value);
        if (Object.keys(nestedFilteredData).length > 0) {
          filteredData[key] = nestedFilteredData;
        }
      }
    });
    return filteredData;
  };

  const handleSubmit = async () => {
    const filteredData = filterEmptyFields(formData);
    console.log(filteredData);
    await dispatch(firstReg({ ...filteredData, register: true }));

    // После успешной регистрации перенаправьте пользователя на /profile
    router.push("/profile");
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {currentStep === 1 && (
          <Step1
            data={formData}
            setData={
              setFormData as React.Dispatch<React.SetStateAction<FormData>>
            }
          />
        )}
        {currentStep === 2 && (
          <Step2
            data={formData}
            setData={
              setFormData as React.Dispatch<React.SetStateAction<FormData>>
            }
          />
        )}
        {currentStep === 3 && (
          <Step3
            data={formData}
            setData={
              setFormData as React.Dispatch<React.SetStateAction<FormData>>
            }
          />
        )}
        {currentStep === 4 && <UserCatFirstRegister />}
        {currentStep === 5 && (
          <Step5
            data={formData}
            setData={
              setFormData as React.Dispatch<React.SetStateAction<FormData>>
            }
          />
        )}
        {currentStep === 6 && <UpdateMediaFirstReg />}
        {currentStep === 7 && <FinishReg />}
      </div>
      <div
        className={
          currentStep === 1 ? styles.firstStepButtons : styles.buttons
        }>
        {currentStep > 1 && (
          <button
            className={styles.button}
            onClick={handleBack}>
            Назад
          </button>
        )}
        {currentStep < 7 && (
          <button
            className={styles.button}
            onClick={handleNext}>
            Далі
          </button>
        )}
        {currentStep === 7 && (
          <button
            className={styles.button}
            onClick={handleSubmit}>
            Завершити
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
