import React from "react";
import { useFormik } from "formik";
import YouTubeEmbed from "./YouTubeIFrame";

const UploadVideo = () => {
  const formik = useFormik({
    initialValues: {
      videoUrl: "", // начальное значение для поля ввода ссылки на видео
      videoUrls: [], // начальное значение для списка ссылок на видео
    },
    onSubmit: (values) => {
      // здесь можно обработать отправку данных (например, отправить их на сервер)
      console.log("Ссылки на видео:", values.videoUrls);
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
