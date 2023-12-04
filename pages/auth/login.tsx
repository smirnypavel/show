import LoginForm from "@/components/Auth/LoginForm";
import { signIn } from "@/redux/auth/authOperations";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React from "react";
import { useRouter } from "next/router";

import styles from "@/styles/components/Auth/LoginForm.module.css";
import { isLoggedIn } from "@/redux/auth/authSelectors";

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const IsLogin = useAppSelector(isLoggedIn);

  // Определите тип onSubmit в соответствии с ожидаемыми данными из формы
  const handleLogin: (formData: {
    email: string;
    password: string;
  }) => void = async (formData) => {
    // Здесь вы можете выполнить логику аутентификации или другие действия
    try {
      await dispatch(
        signIn({ email: formData.email, password: formData.password })
      );
      if (IsLogin) {
        router.push("/profile");
      }
    } catch (error) {}
  };

  return (
    <div className={styles.loginContainer}>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
