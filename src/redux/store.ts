import { configureStore } from "@reduxjs/toolkit";
import seminarSlice from "./Slices/seminarSlice";

const store = configureStore({
    reducer: {
        seminar: seminarSlice
    },
});

export type AppDispatch = typeof store.dispatch;

export default store