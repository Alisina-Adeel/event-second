import { configureStore } from "@reduxjs/toolkit";
import createEventReducer from "./createEventSlice";

export const store = configureStore({
  reducer: {
    createEvent: createEventReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;