import {configureStore} from "@reduxjs/toolkit";
import errorReducer from "./slices/errorSlice"
import preloaderReducer from "./slices/preloaderSlice"
import usersReducer from "./slices/usersSlice"


export const store = configureStore({
    reducer: {
        errorReducer,
        preloaderReducer,
        usersReducer
    }
})