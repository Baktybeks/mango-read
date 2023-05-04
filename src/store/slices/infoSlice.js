import {createSlice} from "@reduxjs/toolkit"

const infoSlice = createSlice({
    name: 'infoSlice',
    initialState: {
        card: {},
        comments: [],
        currentComments: [],
        commentModalActive: false
    },
    reducers: {
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
    setCard,
    setComments,
    setCommentModalActive,
    setCurrentComments
} = infoSlice.actions

export default infoSlice.reducer