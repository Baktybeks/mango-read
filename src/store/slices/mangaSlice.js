import {createSlice} from "@reduxjs/toolkit"

const mangaSlice = createSlice({
    name: 'mangaSlice',
    initialState: {
        typeCheckbox: [],
        genreCheckbox: [],
        inputYears: {
            inp_year_first: 0,
            inp_year_second: 0
        },
        manga: true,
        genreValue:[],
        typeValue:
            [
            {id: 1, title: 'Манга'},
            {id: 2, title: 'Манхва'},
            {id: 3, title: 'Комиксы'},
            {id: 4, title: 'Маньхуа'}
        ],
        selectedTypeGenre: {
            selectedType:[],
            selectedGenre:[]
        }
    },
    reducers: {
        setTypeCheckbox: (state, action) => {
            state.typeCheckbox = action.payload
        },
        setGenreCheckbox: (state, action) => {
            state.genreCheckbox = action.payload
        },
        setGenreValue: (state, action) => {
            state.genreValue = action.payload
        },
        setYearsManga: (state, action) => {
            state.inputYears = action.payload
        },
        setSelectedTypeGenre: (state, action) => {
            state.selectedTypeGenre = action.payload
        },
        setManga: (state, action) => {
            state.manga = action.payload
        }
    }
})

export const {setTypeCheckbox, setGenreCheckbox, setGenreValue, setYearsManga, setManga, setSelectedTypeGenre} = mangaSlice.actions

export default mangaSlice.reducer