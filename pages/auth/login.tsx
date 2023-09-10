import LoginForm from "@/components/Auth/LoginForm";
import React from "react";

const Login = () => {
  // Определите тип onSubmit в соответствии с ожидаемыми данными из формы
  const handleLogin: (formData: {
    username: string;
    password: string;
  }) => void = (formData) => {
    // Здесь вы можете выполнить логику аутентификации или другие действия
    console.log("Submitted data:", formData);
  };

  return <LoginForm onSubmit={handleLogin} />;
};

export default Login;
