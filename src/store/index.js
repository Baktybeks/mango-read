import {configureStore} from "@reduxjs/toolkit";
import errorReducer from "./slices/errorSlice"
import preloaderReducer from "./slices/preloaderSlice"


export const store = configureStore({
    reducer: {
        errorReducer,
        preloaderReducer,
    }
})