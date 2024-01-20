import React from "react";
import styles from "../../styles/Stats/Stats.module.css";

import PrivateRoute from "@/redux/PrivateRoute";
import StatsPage from "@/components/Stats/Stats";

const Update: React.FC = () => {
  return (
    <PrivateRoute>
      <div className={styles.container}>
        <StatsPage />
      </div>
    </PrivateRoute>
  );
};

export default Update;
