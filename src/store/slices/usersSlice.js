import {createSlice} from "@reduxjs/toolkit"

const usersSlice = createSlice({
    name: 'usersSlice',
    initialState: {
        loginOrReg: false,
        modalActive: false,
        isAuth: Boolean(localStorage.getItem('CHECKED')),
        user: JSON.parse(localStorage.getItem('USER')) ?? '',
        access: sessionStorage.getItem('ACCESS_TOKEN') ?? ''
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
        getUserId: (state, action) => {
            state.userId = action.payload
        },
        getUser: (state, action) => {
            state.user = action.payload
            localStorage.setItem('USER', JSON.stringify(action.payload))
        },
        setLogin: (state, action) => {
            state.access = action.payload.access
            state.isAuth = Boolean(action.payload.access)
            state.modalActive = false
        },
        setLogout: (state) => {
            state.user = ''
            state.access = ''
            state.isAuth = false
            localStorage.clear()
            sessionStorage.clear()
        },
    }
})

export const {setLoginOrReg, setModalActive, getUser, setLogin, setLogout} = usersSlice.actions

export default usersSlice.reducer