import {createSlice} from "@reduxjs/toolkit"

const filterSlice = createSlice({
    name: 'mangaSlice',
    initialState: {
        filterManga: [],
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
    },
    reducers: {
        setFilterManga: (state, action) => {
            state.filterManga = action.payload
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
    }
})

export const {
    setFilterManga,
    setTypeCheckbox,
    setGenreCheckbox,
    setYearsManga,
    setSelectedInputs
} = filterSlice.actions

export default filterSlice.reducer