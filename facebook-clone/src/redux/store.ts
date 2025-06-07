import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import userReducer from "./slices/userDetails"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        userDetails: userReducer,
    },
});

export type rootState = ReturnType<typeof store.getState>
export type appDispach = typeof store.dispatch

export default store