import React from "react";
import { getUser } from "@/redux/auth/authSelectors";
import { useSelector } from "react-redux";

import styles from "@/styles/components/Profile/Profile/UserProfile.module.css";

import { IUserAuth } from "@/types/IAuth";
import UserPromo from "./UserPromo";
import UserInfoPage from "./UserInfoPage";
import ProfileTabBar from "./Mobile/ProfileTabBar";

export interface ArtistPageProps {
  artist: IUserAuth;
}
const UserProfile = () => {
  const artist = useSelector(getUser);

  return <UserPromo artist={artist} />;
};

export default UserProfile;
