import React from "react";
import { useFormik } from "formik";
import YouTubeEmbed from "./YouTubeIFrame";
interface UploadVideoProps {
  onVideoUrlsUpdate: (videoUrls: string[]) => void;
}

const UploadVideo: React.FC<UploadVideoProps> = ({ onVideoUrlsUpdate }) => {
  const formik = useFormik({
    initialValues: {
      videoUrl: "",
      videoUrls: [],
    },
    onSubmit: (values) => {
      onVideoUrlsUpdate(values.videoUrls);
    },
  });

  return (
    <div>
      <h1>Загрузка видео</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="videoUrl">Ссылка на видео:</label>
          <input
            id="videoUrl"
            name="videoUrl"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.videoUrl}
          />
          <button
            type="button"
            onClick={() => {
              formik.setFieldValue("videoUrls", [
                ...formik.values.videoUrls,
                formik.values.videoUrl,
              ]);
              formik.setFieldValue("videoUrl", ""); // очищаем поле ввода после добавления ссылки
            }}>
            Добавить
          </button>
        </div>
        <div>
          <h2>Добавленные ссылки:</h2>
          <ul>
            {formik.values.videoUrls.map((url, index) => (
              <li key={index}>
                <YouTubeEmbed url={url} />
              </li>
            ))}
          </ul>
          <p>{formik.values.videoUrls}</p>
        </div>
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};

export default UploadVideo;
