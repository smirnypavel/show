import React from "react";
import { useAppDispatch } from "@/redux/hooks";
import { useSelector } from "react-redux"; // Используйте useSelector из react-redux

import RegistrationForm, {
  FormValues,
} from "@/components/Auth/RegistrationForm";
import { signIn, signUp } from "@/redux/auth/authOperations";
import { isLoggedIn } from "@/redux/auth/authSelectors";

const Registry = () => {
  const dispatch = useAppDispatch();
  const IsLogin = useSelector(isLoggedIn);

  // Обработчик, который будет вызван при успешной регистрации
  const handleRegistration = async (values: FormValues) => {
    try {
      await dispatch(
        signUp({ email: values.email, password: values.password })
      );
      if (!IsLogin) {
        return console.log("Registration failed");
      }
      await dispatch(
        signIn({ email: values.email, password: values.password })
      );
      // router.push("/account/settings");
    } catch (error) {}
  };

  return (
    <div>
      <RegistrationForm onSubmit={handleRegistration} />
    </div>
  );
};

export default Registry;
