import {createSlice} from "@reduxjs/toolkit";

const mangaSlice = createSlice({
    name: 'mangaSlice',
    initialState: {
        typeManga: [],
        genreManga: []
    },
    reducers: {
        setTypeManga: (state, action) => {
            state.typeManga = action.payload
        },
        setClearTypeManga: (state) => {
            state.typeManga = []
        },
        setGenreManga: (state, action) => {
            state.genreManga = action.payload
        },
        setClearGenreManga: (state) => {
            state.genreManga = []
        }
    }
})

export const {setTypeManga, setClearTypeManga, setGenreManga, setClearGenreManga} = mangaSlice.actions

export default mangaSlice.reducer