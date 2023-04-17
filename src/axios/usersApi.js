import {$host} from "./index"
import jwtDecode from "jwt-decode"
import {getUser, setLogin} from "../store/slices/usersSlice"
import {setError} from "../store/slices/errorSlice"

const ACCESS_KEY = 'm-access'



export const signInApi = (username, password, checkbox) => {
    return async (dispatch) => {
        try {
            const {data} = await $host.post('auth/signin/', {username, password})
            if (checkbox) {
                localStorage.setItem(ACCESS_KEY, data.access)
            }
            dispatch(setLogin({access: data.access}))
            dispatch(getUserApi(jwtDecode(data.access).user_id))
        } catch (e) {
            console.log('error', e)
        }
    }
}

export const getUserApi = (id) => {
    return async (dispatch) => {
        try {
            const {data} = await $host.get(`auth/profile/${id}/`)
            dispatch(getUser(data))
        } catch (e) {
            dispatch(setError(e.message))
        }
    }
}