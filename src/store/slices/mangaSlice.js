import {createSlice} from "@reduxjs/toolkit"

const mangaSlice = createSlice({
    name: 'mangaSlice',
    initialState: {
        mangaCount: 0,
        genreValue: [],
        filteredGenres: '',
        typeValue:
            [
                {id: 1, title: 'Манга'},
                {id: 2, title: 'Манхва'},
                {id: 3, title: 'Комиксы'},
                {id: 4, title: 'Маньхуа'}
            ],
        mangaList: [],
        allMangaList: [],

    },
    reducers: {
        setGenreValue: (state, action) => {
            state.genreValue = action.payload
        },
        setFilteredGenres: (state, action) => {
            state.filteredGenres = action.payload
        },
        setMangaList: (state, action) => {
            state.mangaList = action.payload
        },
        setAllMangaList: (state, action) => {
            state.allMangaList = action.payload
        },
        setMangaCount: (state, action) => {
            state.mangaCount = action.payload
        }
    }
})

export const {
    setGenreValue,
    setMangaList,
    setMangaCount,
    setFilteredGenres,
    setAllMangaList
} = mangaSlice.actions

export default mangaSlice.reducer