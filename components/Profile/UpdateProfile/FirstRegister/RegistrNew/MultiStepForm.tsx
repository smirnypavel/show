import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
// import Step4 from './Step4';
import Step5 from "./Step5";
// import Step6 from './Step6';
// import Step7 from './Step7';
import { StepProps, FormData } from "@/types/IRegFormData";
import CategorySelectorFirstReg from "./CategorySelectFirstReg";
import UpdateMediaFirstReg from "./UpdateMediaFirstReg";
import FinishReg from "./FinishReg";
import styles from "@/styles/components/Profile/UpdateProfile/FirstRegister/FirstRegNew/ultiStepForm.module.css";
import { useAppDispatch } from "@/redux/hooks";
import { firstReg, updateUser } from "@/redux/auth/authOperations";
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

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const dispatch = useAppDispatch();
  // // const router = useRouter();

  // const finish = async () => {
  //   await dispatch(updateUser({ register: true }));
  // };
  const handleSubmit = async () => {
    console.log(formData);
    await dispatch(firstReg({ ...formData, register: true }));
    // await dispatch(updateUser({ register: true }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {currentStep === 1 && (
          <Step1
            data={formData}
            setData={setFormData}
          />
        )}
        {currentStep === 2 && (
          <Step2
            data={formData}
            setData={setFormData}
          />
        )}
        {currentStep === 3 && (
          <Step3
            data={formData}
            setData={setFormData}
          />
        )}
        {currentStep === 4 && <CategorySelectorFirstReg />}
        {currentStep === 5 && (
          <Step5
            data={formData}
            setData={setFormData}
          />
        )}
        {currentStep === 6 && <UpdateMediaFirstReg />}
        {currentStep === 7 && <FinishReg />}
      </div>
      <div className={styles.buttons}>
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
