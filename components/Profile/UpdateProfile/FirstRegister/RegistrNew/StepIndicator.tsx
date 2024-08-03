import React from "react";
import styles from "@/styles/components/Profile/UpdateProfile/FirstRegister/FirstRegNew/StepIndicator.module.css";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className={styles.stepIndicator}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`${styles.step} ${
            index + 1 === currentStep
              ? styles.active
              : index + 1 < currentStep
              ? styles.completed
              : ""
          }`}></div>
      ))}
    </div>
  );
};

export default StepIndicator;
