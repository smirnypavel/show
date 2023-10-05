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
  photo: Photo[];
  video: string[];
  category: Category[];
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

export interface Photo {
  id: string;
  url: string;
}
export interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
}
