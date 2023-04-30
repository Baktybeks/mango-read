import {$api, $authApi} from "./index"
import jwtDecode from "jwt-decode"
import {getUser, setLogin, setLogout, setModalActive} from "../store/slices/usersSlice"
import {setError} from "../store/slices/errorSlice"

export const signInApi = (username, password, checkbox) => {

    return async (dispatch) => {
        try {
            const {data} = await $api.post('auth/signin/', {username, password})
            localStorage.setItem('REFRESH_TOKEN', data.refresh)
            sessionStorage.setItem('ACCESS_TOKEN', data.access)
            dispatch(setLogin({access: data.access}))
            dispatch(getUserApi(jwtDecode(data.access).user_id, checkbox))
        } catch (e) {
            console.log('error', e)
        }
    }
}

export const getUserApi = (id, checkbox) => {
    return async (dispatch) => {
        try {
            const {data} = await $api.get(`auth/profile/${id}/`)
            if (checkbox) {
                localStorage.setItem('CHECKED', true)
                dispatch(getUser(data))
            }
            dispatch(getUser(data))
        } catch (e) {
            dispatch(setError(e.message))
        }
    }
}

export const regApi = (formData) => {
    return async (dispatch) => {
        try {
            const {data} = await $api.post('auth/signup/', formData)
            console.log(data)
            if (data.status === 201) {
                alert('Вы успешно зарегистрированы')
                dispatch(setModalActive(false))
            }
        } catch (e) {
            alert(e)
        }
    }
}

export const logoutApi = () => {
    return async (dispatch) => {
        try {
            const refresh = {refresh: localStorage.getItem('REFRESH_TOKEN')}
            const response = await $authApi.post('auth/logout/', refresh)
            if (response.status === 204) {
                alert('Вы успешно вышли из системы')
                dispatch(setLogout())
            }
        } catch (e) {
            console.log(e)
            if (e.response.status === 401) {
                alert('Вы вышли из системы')
                dispatch(setLogout())
            }
        }
    }
}
export const checkAuthApi = () => {
    return async (dispatch) => {
        try {
            const refresh = {refresh: localStorage.getItem('REFRESH_TOKEN')}
            const response = await $api.post('token/refresh/', refresh)
            sessionStorage.setItem('ACCESS_TOKEN', response.data.access)
            dispatch(setLogin({access: response.data.access}))
        } catch (e) {
            console.log(e)
        }
    }
}

