import React from "react";
import { getUser } from "@/redux/auth/authSelectors";
import { useSelector } from "react-redux";
import Image from "next/image";
import UserNoPhoto from "@/public/user/UserNoPhoto.jpg";
import Link from "next/link";

const Profile = () => {
  const user = useSelector(getUser);

  return (
    <div>
      <div>Profile</div>
      <div>
        <p>{user.firstName}</p>
        <p>{user.email}</p>
        <Image
          src={UserNoPhoto}
          alt={"user photo"}
          width={100}></Image>
      </div>
      <Link href={"/profile/update"}>Настройки профиля</Link>
    </div>
  );
};

export default Profile;
