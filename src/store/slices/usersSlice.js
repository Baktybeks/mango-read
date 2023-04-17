import {createSlice} from "@reduxjs/toolkit"

const ACCESS_KEY = 'm-access'
const USER_KEY = 'm-username'

const usersSlice = createSlice({
    name: 'usersSlice',
    initialState: {
        loginOrReg: false,
        modalActive: false,
        isAuth: Boolean(localStorage.getItem(ACCESS_KEY)),
        user: JSON.parse(localStorage.getItem(USER_KEY)) ?? '',
        access: localStorage.getItem(ACCESS_KEY) ?? ''
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
            localStorage.setItem(USER_KEY, JSON.stringify(action.payload))
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
            localStorage.removeItem(ACCESS_KEY)
            localStorage.removeItem(USER_KEY)
        },
    }
})

export const {setLoginOrReg, setModalActive, setIsAuth, getUser, setLogin, setLogout} = usersSlice.actions

export default usersSlice.reducer