import {configureStore} from "@reduxjs/toolkit"
import errorReducer from "./slices/errorSlice"
import preloaderReducer from "./slices/preloaderSlice"
import usersReducer from "./slices/usersSlice"
import mangaReducer from "./slices/mangaSlice"


export const store = configureStore({
    reducer: {
        errorReducer,
        preloaderReducer,
        usersReducer,
        mangaReducer,
    }
})