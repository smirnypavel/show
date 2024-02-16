import React from "react";
import styles from "../../styles/Profile/ProfileUpdate.module.css";
import UpdateProfile from "@/components/Profile/UpdateProfile/UpdateProfile";
import PrivateRoute from "@/redux/PrivateRoute";
import LayoutProfile from "@/components/Layout/LayoutProfile";

const Update: React.FC = () => {
  return (
    <PrivateRoute>
      <LayoutProfile>
        <UpdateProfile />
      </LayoutProfile>
    </PrivateRoute>
  );
};

export default Update;
