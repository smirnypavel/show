import { ILink, IPhoto, IUserAuth } from "../../types/IAuth";

export const getUser = (state: { auth: { user: IUserAuth } }) =>
  state.auth.user;

export const isLoggedIn = (state: { auth: { isLoggedIn: boolean } }) =>
  state.auth.isLoggedIn;

export const isLoading = (state: { auth: { isLoading: boolean } }) =>
  state.auth.isLoading;

export const selectToken = (state: { auth: { user: { token: string } } }) =>
  state.auth.user.token;
export const getUserPhoto = (state: { auth: { user: { photo: IPhoto[] } } }) =>
  state.auth.user.photo;
export const getUserVideo = (state: { auth: { user: { video: ILink[] } } }) =>
  state.auth.user.video;

// export const getRole = (state: { auth: { user: IUserAuth } }) =>
//   state.auth.user.role;
