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
        mangaCount: 0,
        genreValue: [],
        typeValue:
            [
                {id: 1, title: 'Манга'},
                {id: 2, title: 'Манхва'},
                {id: 3, title: 'Комиксы'},
                {id: 4, title: 'Маньхуа'}
            ],
        selectedTypeGenre: {
            selectedType: [],
            selectedGenre: []
        },
        mangaList: [],
        card: {},
        comments: [],
        commentModalActive: false
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
        },
        setMangaList: (state, action) => {
            state.mangaList = action.payload
        },
        setMangaCount: (state, action) => {
            state.mangaCount = action.payload
        },
        setCard: (state, action) => {
            state.card = action.payload
        },
        setComments: (state, action) => {
            state.comments = action.payload
        },
        setCommentModalActive: (state, action) => {
            state.commentModalActive = action.payload
        }
    }
})

export const {
    setTypeCheckbox,
    setGenreCheckbox,
    setGenreValue,
    setYearsManga,
    setManga,
    setSelectedTypeGenre,
    setMangaList,
    setCard,
    setComments,
    setCommentModalActive,
    setMangaCount
} = mangaSlice.actions

export default mangaSlice.reducer