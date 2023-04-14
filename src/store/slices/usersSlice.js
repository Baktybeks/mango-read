import {createSlice} from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: 'usersSlice',
    initialState: {
        loginOrReg: false,
        modalActive: false,
        isAuth: false,
        user: {},
        email: '',
        access: ''
    },
    reducers: {
        setLoginOrReg: (state, action) => {
            state.loginOrReg = action.payload
        },
        setModalActive: (state, action) => {
            state.modalActive = action.payload
        },
        setIsAuth: (state, action) => {
            state.isAuth = action.payload
        },
        getUser: (state, action) => {
            state.user = action.payload
        },
        login: (state, action) => {
            state.email = action.payload
        },
    }
})

export const {setLoginOrReg, setModalActive} = usersSlice.actions

export default usersSlice.reducer