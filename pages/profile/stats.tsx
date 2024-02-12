import React from "react";
import styles from "../../styles/Stats/Stats.module.css";

import PrivateRoute from "@/redux/PrivateRoute";
import StatsPage from "@/components/Stats/Stats";
import LayoutProfile from "@/components/Layout/LayoutProfile";

const Update: React.FC = () => {
  return (
    <PrivateRoute>
      <LayoutProfile>
        <StatsPage />
      </LayoutProfile>
    </PrivateRoute>
  );
};

export default Update;
