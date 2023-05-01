import {createSlice} from "@reduxjs/toolkit"

const mangaSlice = createSlice({
    name: 'mangaSlice',
    initialState: {
        manga: true,
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
        card: {},
        comments: [],
        currentComments: [],
        commentModalActive: false
    },
    reducers: {
        setGenreValue: (state, action) => {
            state.genreValue = action.payload
        },
        setFilteredGenres: (state, action) => {
            state.filteredGenres = action.payload
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
        setCurrentComments: (state, action) => {
            state.currentComments = action.payload
        },
        setCommentModalActive: (state, action) => {
            state.commentModalActive = action.payload
        }
    }
})

export const {
    setGenreValue,
    setManga,
    setMangaList,
    setCard,
    setComments,
    setCommentModalActive,
    setMangaCount,
    setCurrentComments,
    setFilteredGenres
} = mangaSlice.actions

export default mangaSlice.reducer