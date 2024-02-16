import React from "react";
import { getUser } from "@/redux/auth/authSelectors";
import styles from "@/styles/components/Profile/Profile/UserProfile.module.css";
import { IUserAuth } from "@/types/IAuth";
import UserPromo from "./UserPromo";
import { useAppSelector } from "@/redux/hooks";

export interface ArtistPageProps {
  artist: IUserAuth;
}
const UserProfile = () => {
  const artist = useAppSelector(getUser);

  return <UserPromo artist={artist} />;
};

export default UserProfile;
