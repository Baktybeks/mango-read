import {createSlice} from "@reduxjs/toolkit"

const preloaderSlice = createSlice({
    name: 'preloaderSlice',
    initialState: {
        preloader: false,
        preloaderCard: false,
        preloaderComments: false,
    },
    reducers: {
        preloader: (state,action) => {
            state.preloader = action.payload.preloader
            state.preloaderComments = action.payload.preloaderComments
            state.preloaderCard = action.payload.preloaderCard
        }
    }
})

export const {preloader} = preloaderSlice.actions

export default preloaderSlice.reducer