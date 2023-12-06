import { configureStore, Reducer, Action } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authReducer";
import { IAuthState } from "../types/IAuth";
import { default as storage } from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { PersistPartial } from "redux-persist/es/persistReducer";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "isLoggedIn", "refreshToken"],
};

// Define explicit types for state and action
type AuthReducerType = Reducer<IAuthState & PersistPartial, Action<any>>;

export const store = configureStore({
  reducer: {
    auth: persistReducer<IAuthState & PersistPartial, any>(
      authPersistConfig,
      authSlice.reducer as AuthReducerType
    ),
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
