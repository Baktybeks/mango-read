import {$host} from "./index"
import jwtDecode from "jwt-decode";

export const signIn = async (email, password) => {
    const {data} = await $host.post('auth/login/',{email, password})
    localStorage.setItem('tokens', data.tokens.access)
    localStorage.setItem('user', data.username)
    return jwtDecode(data.tokens.access)
}
