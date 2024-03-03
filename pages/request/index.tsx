import RequestForm from "@/components/Home/RequestForm";
import React from "react";
import styles from "@/styles/RequestPage/RequestPage.module.css";

const RequestPage = () => {
  return (
    <div className={styles.container}>
      <RequestForm />
    </div>
  );
};

export default RequestPage;
