import {$api, $authApi} from "./index"
import {setError} from "../store/slices/errorSlice"
import {setGenreValue} from "../store/slices/mangaSlice"

export const getGenreListApi = () => {
    return async (dispatch) => {
        try {
            const {data} = await $api.get(`v1/genre/`)
            dispatch(setGenreValue(data))
        } catch (e) {
            dispatch(setError(e.message))
        }
    }
}

export const addCommentApi = (id, text) => {
    return async () => {
        try {
            const response = await $authApi.post(`v1/manga/${id}/add-comment/`, {id, text})
            console.log(response)
            alert('Вы успешно отправили комментарий')
        } catch
            (e) {
            console.log(e)
        }
    }
}