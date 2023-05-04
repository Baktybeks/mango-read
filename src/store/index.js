import {configureStore} from "@reduxjs/toolkit"
import errorReducer from "./slices/errorSlice"
import preloaderReducer from "./slices/preloaderSlice"
import usersReducer from "./slices/usersSlice"
import mangaReducer from "./slices/mangaSlice"
import filterReducer from "./slices/filterSlice"
import infoReducer from "./slices/infoSlice"


export const store = configureStore({
    reducer: {
        errorReducer,
        preloaderReducer,
        usersReducer,
        mangaReducer,
        filterReducer,
        infoReducer
    }
})