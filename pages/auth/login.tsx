import LoginForm from "@/components/Auth/LoginForm";
import { signIn } from "@/redux/auth/authOperations";
import { useAppDispatch } from "@/redux/hooks";
import React from "react";
import styles from "@/styles/components/Auth/LoginForm.module.css";

const Login = () => {
  const dispatch = useAppDispatch();

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
      // router.push("/account/settings");
    } catch (error) {}
  };

  return (
    <div className={styles.loginContainer}>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
