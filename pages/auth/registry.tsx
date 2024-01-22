import React from "react";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/router";

import RegistrationForm, {
  FormValues,
} from "@/components/Auth/RegistrationForm";
import { signIn, signUp } from "@/redux/auth/authOperations";
// import { isLoggedIn } from "@/redux/auth/authSelectors";

const Registry = () => {
  const dispatch = useAppDispatch();
  // const IsLogin = useAppSelector(isLoggedIn);
  const router = useRouter();

  // Обработчик, который будет вызван при успешной регистрации
  const handleRegistration = async (values: FormValues) => {
    try {
      // Регистрация пользователя
      const signUpResult = await dispatch(
        signUp({
          email: values.email,
          password: values.password,
          phone: values.phone,
          firstName: values.firstName,
        })
      );
      if (signUpResult.payload) {
        // Если регистрация успешна, тогда попытка входа
        const loginResult = await dispatch(
          signIn({ email: values.email, password: values.password })
        );

        if (loginResult.payload) {
          // Если вход успешен, переход на страницу профиля
          router.push("/profile");
        } else {
        }
      } else {
      }
    } catch (error) {}
  };

  return (
    <div>
      <RegistrationForm onSubmit={handleRegistration} />
    </div>
  );
};

export default Registry;
