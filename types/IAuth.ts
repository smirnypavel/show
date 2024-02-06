export interface IAuthState {
  user: IUserAuth;
  isLoggedIn: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | any;
}
export interface IUserAuth {
  _id: string;
  email: string;
  password: string;
  phone: string;
  telegram: string;
  viber: string;
  whatsapp: string;
  location: string;
  master_photo: IMasterPhoto;
  isOnline: boolean;
  paid: boolean;
  trial: boolean;
  token: string;
  refresh_token: string;
  verify: boolean;
  ban: boolean;
  avatar: IAvatar;
  photo: IPhoto[];
  video: ILink[];
  category: ICategory[];
  genre: any[];
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  title: string;
  googleId: string;
  description: string;
  price: string;
  social?: Social;
}

export interface IPhoto {
  publicId: string;
  url: string;
}
export interface IAvatar {
  publicId: string;
  url: string;
}
export interface IMasterPhoto {
  publicId: string;
  url: string;
}
export interface ICategory {
  _id: string;
  name: string;
  subcategories: ISubcategory[];
}

export interface ISubcategory {
  id: string;
  name: string;
}
export interface ILink {
  publicId: string;
  url: string;
}
export interface Social {
  Instagram?: string;
  Facebook?: string;
  Youtube?: string;
  TikTok?: string;
  Vimeo?: string;
  SoundCloud?: string;
  Spotify?: string;
  AppleMusic?: string;
  Deezer?: string;
  WebSite?: string;
}
