import ArtistList from "@/components/Artist/ArtistList";
import React from "react";
import styles from "@/styles/Artist/Artist.module.css";

const Artists = () => {
  return (
    <div className={styles.container}>
      <ArtistList />
    </div>
  );
};

export default Artists;
