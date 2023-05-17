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
        isFilter: false,
        inputYears: {
            inp_year_first: '',
            inp_year_second: ''
        },
    },
    reducers: {
        setFilteredManga: (state, action) => {
            state.filteredManga = action.payload
        },
        setIsFilter: (state, action) => {
            state.isFilter = action.payload
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
        setInputYears: (state, action) => {
            state.inputYears = action.payload
        },
    }
})

export const {
    setFilteredManga,
    setTypeCheckbox,
    setGenreCheckbox,
    setSelectedInputs,
    setAllMangaList,
    setIsFilter,
    setInputYears
} = filterSlice.actions

export default filterSlice.reducer