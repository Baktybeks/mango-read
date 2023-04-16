import {createSlice} from "@reduxjs/toolkit";

const mangaSlice = createSlice({
    name: 'mangaSlice',
    initialState: {
        typeManga: [],
        genreManga: [],
        manga: true
    },
    reducers: {
        setTypeManga: (state, action) => {
            state.typeManga = action.payload
        },
        setGenreManga: (state, action) => {
            state.genreManga = action.payload
        },
        setManga: (state,action) => {
            state.manga = action.payload
        }
    }
})

export const {setTypeManga, setManga, setGenreManga} = mangaSlice.actions

export default mangaSlice.reducer