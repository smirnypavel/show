import React from "react";
import UserProfile from "@/components/Profile/UserProfile/UserProfile";
import PrivateRoute from "@/redux/PrivateRoute";
import LayoutProfile from "@/components/Layout/LayoutProfile";

const Profile = () => {
  return (
    <PrivateRoute>
      <LayoutProfile>
        <UserProfile />
      </LayoutProfile>
    </PrivateRoute>
  );
};

export default Profile;
