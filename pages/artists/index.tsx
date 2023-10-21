import ArtistList from "@/components/Artist/ArtistList";
import React from "react";
import styles from "@/styles/Artist/Artist.module.css";
import ArtistSearchBar from "@/components/Artist/ArtistSearchBar";

const Artists = () => {
  return (
    <div className={styles.container}>
      <ArtistSearchBar />
      <ArtistList />
    </div>
  );
};

export default Artists;
