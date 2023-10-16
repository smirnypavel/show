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
  master_photo: string;
  isOnline: boolean;
  paid: boolean;
  trial: boolean;
  token: string;
  verify: boolean;
  ban: boolean;
  photo: IPhoto[];
  video: string[];
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
}

export interface IPhoto {
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
