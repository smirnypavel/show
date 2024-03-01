import React, { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/router";
import styles from "@/styles/components/Auth/RegistrationForm.module.css";

import RegistrationForm, {
  FormValues,
} from "@/components/Auth/RegistrationForm";
import { signUp } from "@/redux/auth/authOperations";
import Modal from "@/components/helpers/Modal";

const Registry = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [mail, setMail] = useState("");

  // Обработчик, который будет вызван при успешной регистрации
  const handleRegistration = async (values: FormValues) => {
    const email = setMail(values.email);

    try {
      let phone = values.phone;
      if (phone.startsWith("+")) {
        phone = phone.substring(1);
      }
      const phoneAsNumber = +phone;

      const signUpResult = await dispatch(
        signUp({
          email: values.email,
          password: values.password,
          phone: phoneAsNumber,
          firstName: values.firstName,
        })
      );
      if (signUpResult.payload) {
        setShowModal(true);
      } else {
      }
    } catch (error) {}
  };

  return (
    <div>
      <RegistrationForm onSubmit={handleRegistration} />
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className={styles.modal}>
            <h2>
              Вітаю Вас з реєстрацією. Для підтвердження реєстрації вам на пошту{" "}
              <span className={styles.mail}>{mail}</span> було відправлено
              повідомлення!
            </h2>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Registry;
