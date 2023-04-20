import {createSlice} from "@reduxjs/toolkit"

const mangaSlice = createSlice({
    name: 'mangaSlice',
    initialState: {
        typeManga: [],
        inputYears: {
            inp_year_first: 0,
            inp_year_second: 0
        },
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
        setYearsManga: (state, action) => {
            state.inputYears = action.payload
        },
        setManga: (state,action) => {
            state.manga = action.payload
        }
    }
})

export const {setTypeManga, setManga, setGenreManga, setYearsManga} = mangaSlice.actions

export default mangaSlice.reducer