import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BEC_URL;

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};
export const restoreToken = () => {
  const token = localStorage.getItem("refreshToken");
  if (token) {
    setAuthHeader(token);
  }
};

axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Помечаем запрос, чтобы избежать бесконечного цикла повторов

      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        // Если отсутствует refresh-токен, делаем выход пользователя
        return Promise.reject();
      }
      setAuthHeader(refreshToken);
      try {
        const { data } = await axios.patch("/users/refresh");
        setAuthHeader(data.token);
        localStorage.setItem("token", data.token);
        originalRequest.headers["Authorization"] = `Bearer ${data.token}`;
        return axios(originalRequest); // Повторяем исходный запрос с обновленным токеном
      } catch (error) {
        toast.error("An error occurred during authentication");
        return Promise.reject();
      }
    }
    return Promise.reject();
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (credentials: {}, thunkAPI) => {
    try {
      const { data } = await axios.post("/users", credentials);
      return data;
    } catch (error: any) {
      toast.error("Такий користувач вже існує");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (credentials: {}, thunkAPI) => {
    try {
      const { data } = await axios.post("/users/login", credentials);
      setAuthHeader(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refresh_token);
      toast.success(`Ласкаво просимо ${data.firstName}!`);
      return data;
    } catch (error: any) {
      toast.error("Не вірний логін або пароль");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const googleAuth = createAsyncThunk(
  "auth/googleAuth",
  async (token: string, thunkAPI) => {
    try {
      setAuthHeader(token);
      const { data } = await axios.patch("/users/refresh");
      setAuthHeader(data.token);
      localStorage.setItem("token", data.token);

      toast.success(`Ласкаво просимо ${data.firstName}!`);
      return data;
    } catch (error: any) {
      if (error.response.status === 404) {
        toast.error("Не вірний логін або пароль");
      } else {
        toast.error("Не вірний логін або пароль");
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const verifyMail = createAsyncThunk(
  "auth/verifyMail",
  async (userId: string, thunkAPI) => {
    const initialToken = localStorage.getItem("token");
    if (initialToken) {
      setAuthHeader(initialToken);
    }
    try {
      const { data } = await axios.get(`/users/verify-email/${userId}`);

      localStorage.setItem("refreshToken", data.refresh_token);

      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logOut", async (_, thunkAPI) => {
  console.log("logout Operation");
  try {
    await axios.post("/users/logout");
    clearAuthHeader();
    localStorage.clear();
    toast.success("Успішно вийшов");
  } catch (error: any) {
    localStorage.clear();
    toast.error("Під час виходу сталася помилка");
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (credentials: {}, thunkAPI) => {
    const initialToken = localStorage.getItem("token");
    if (initialToken) {
      setAuthHeader(initialToken);
    }
    try {
      const { data } = await axios.put("/users", credentials);
      if (data) {
        toast.success("Користувач успішно оновлений");
        return data;
      } else {
        // Если data не существует или пусто, вызываем ошибку
        throw new Error("Отсутствуют данные после обновления пользователя");
      }
    } catch (error: any) {
      toast.error("Під час оновлення користувача сталася помилка");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (credentials: {}, thunkAPI) => {
    const initialToken = localStorage.getItem("token");
    if (initialToken) {
      setAuthHeader(initialToken);
    }
    try {
      const { data } = await axios.patch("/users/change-password", credentials);
      toast.success("Пароль успішно оновлено");
      return data;
    } catch (error: any) {
      toast.error("Під час оновлення пароля сталася помилка");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (userId: string, thunkAPI) => {
    const initialToken = localStorage.getItem("token");
    if (initialToken) {
      setAuthHeader(initialToken);
    }
    try {
      const { data } = await axios.get(`/users/?_id=${userId}`);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const uploadImage = createAsyncThunk(
  "auth/uploadImage",
  async (file: File, thunkAPI) => {
    // Изменяем тип file на File, а не File[]
    try {
      const formData = new FormData();
      formData.append(`file`, file); // Используем один ключ для файла
      const { data } = await axios.post("/users/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Зображення успішно завантажено!");
      return data;
    } catch (error: any) {
      toast.error("Помилка при завантаженні зображення:");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const uploadAvatar = createAsyncThunk(
  "auth/uploadAvatar",
  async (file: File, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.post("/users/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Аватар успішно завантажений!");
      return data;
    } catch (error: any) {
      // Обработка ошибок загрузки
      toast.error("Помилка при завантаженні аватара:");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deletePhoto = createAsyncThunk(
  "auth/deletePhoto",
  async (credentials: any, thunkAPI) => {
    const initialToken = localStorage.getItem("token");
    if (initialToken) {
      setAuthHeader(initialToken);
    }
    try {
      console.log(credentials);
      const { data } = await axios.put(`/users/photo/`, credentials);
      toast.success("Зображення успішно видалене!");

      return data;
    } catch (error: any) {
      toast.error("Сталася помилка при видаленні фото");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteVideo = createAsyncThunk(
  "auth/deleteVideo",
  async (credentials: any, thunkAPI) => {
    const initialToken = localStorage.getItem("token");
    if (initialToken) {
      setAuthHeader(initialToken);
    }
    try {
      const { data } = await axios.delete(`/users/video/${credentials}`);
      toast.success("Відео успішно видалене!");

      return data;
    } catch (error: any) {
      toast.error("Сталася помилка при видаленні відео");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateCategory = createAsyncThunk(
  "auth/updateCategory",
  async (credentials: {}, thunkAPI) => {
    console.log(credentials);
    const initialToken = localStorage.getItem("token");
    if (initialToken) {
      setAuthHeader(initialToken);
    }
    try {
      const { data } = await axios.put("/users/update-category", credentials);
      toast.success("Категорію успішно оновлено");
      return data;
    } catch (error: any) {
      toast.error("Помилка оновлення категорії");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteCat = createAsyncThunk(
  "auth/deleteCat",
  async (credentials: any, thunkAPI) => {
    const initialToken = localStorage.getItem("token");
    if (initialToken) {
      setAuthHeader(initialToken);
    }
    try {
      const { data } = await axios.delete(`/users/category/${credentials}`);
      toast.success("Категорія успішно видалена!");
      return data;
    } catch (error: any) {
      toast.error("Сталася помилка при видаленні категорії");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
