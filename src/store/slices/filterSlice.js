import {createSlice} from "@reduxjs/toolkit"

const filterSlice = createSlice({
    name: 'mangaSlice',
    initialState: {
        filteredManga: [],
        typeCheckbox: [],
        genreCheckbox: [],
        selectedInputs: {
            selectedType: [],
            selectedGenre: [],
            selectedYears: {
                inp_year_first: 0,
                inp_year_second: 0
            },
        },
        allMangaList: [],
    },
    reducers: {
        setFilteredManga: (state, action) => {
            state.filteredManga = action.payload
        },
        setTypeCheckbox: (state, action) => {
            state.typeCheckbox = action.payload
        },
        setGenreCheckbox: (state, action) => {
            state.genreCheckbox = action.payload
        },
        setSelectedInputs: (state, action) => {
            state.selectedInputs = action.payload
        },
        setAllMangaList: (state, action) => {
            state.allMangaList = action.payload
        },
    }
})

export const {
    setFilteredManga,
    setTypeCheckbox,
    setGenreCheckbox,
    setSelectedInputs,
    setAllMangaList
} = filterSlice.actions

export default filterSlice.reducer