import React from "react";
import { useFormik } from "formik";
import YouTubeEmbed from "../../../User/YouTubeIFrame";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUserVideo } from "@/redux/auth/authSelectors";
import { deleteVideo, updateUser } from "@/redux/auth/authOperations";
import { v4 as uuidv4 } from "uuid";
import styles from "@/styles/components/Profile/UpdateProfile/UpdateMedia/UploadVideo.module.css";
import { IoClose } from "react-icons/io5";

const UploadVideo = () => {
  const video = useAppSelector(getUserVideo);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      url: "",
      publicId: "",
    },
    onSubmit: async (values, { resetForm }) => {
      await dispatch(
        updateUser({ video: [{ publicId: uuidv4(), url: values.url }] })
      );
      resetForm(); // Clear the form after successful submission
    },
  });
  const handleDeleteVideo = (publicId: string) => {
    dispatch(deleteVideo(publicId));
  };
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.inputContainer}>
          <input
            id="url"
            name="url"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.url}
            className={styles.videoInput}
            placeholder="Посилання на відео"
          />
          <button
            type="submit"
            className={styles.videoInputButton}>
            <p className={styles.inputButtonText}>Додати</p>
          </button>
        </div>
        <div>
          <h4>Додані посилання:</h4>
          <ul className={styles.videoList}>
            {video.map((item) => (
              <li
                key={item.publicId}
                className={styles.videListItem}>
                <YouTubeEmbed url={item.url} />
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() => handleDeleteVideo(item.publicId)}>
                  <IoClose className={styles.deleteButtonIcon} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default UploadVideo;
