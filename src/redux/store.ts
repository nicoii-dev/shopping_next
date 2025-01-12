import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slice/productsSlice";

const store = configureStore({
  reducer: {
    products: productsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
