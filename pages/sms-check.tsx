import SmsCodeInput from "@/components/helpers/SmsCodeInput";
import Modal from "@/components/helpers/Modal";
import { useRouter } from "next/router";

const SmsCheckPage = () => {
  const router = useRouter();

  const closeModal = () => {
    router.push("/"); // При закрытии модального окна перенаправляем на главную страницу
  };

  return (
    <Modal onClose={closeModal}>
      <SmsCodeInput />
    </Modal>
  );
};

export default SmsCheckPage;
