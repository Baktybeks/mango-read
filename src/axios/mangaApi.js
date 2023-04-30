import {$api, $authApi} from "./index"
import {setError} from "../store/slices/errorSlice"
import {setCard, setComments, setGenreValue, setMangaCount, setMangaList} from "../store/slices/mangaSlice"
import {preloaderOff, preloaderOn} from "../store/slices/preloaderSlice"


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


export const getMangaListApi = (limit = 0, offset = 0) => {
    return async (dispatch) => {
        dispatch(preloaderOn())
        try {
            const {data} = await $api.get(`v1/manga/`,
                {
                    params: {
                        limit,
                        offset,
                    }
                }
                )
            dispatch(setMangaCount(data.count))
            dispatch(setMangaList(data.results))
        } catch (e) {
            dispatch(setError(e.message))
        } finally {
            dispatch(preloaderOff())
        }
    }
}

export const getCardApi = (id) => {
    return async (dispatch) => {
        dispatch(preloaderOn())
        try {
            const {data} = await $api.get(`v1/manga/${id}`)
            dispatch(setCard(data))
        } catch (e) {
            dispatch(setError(e.message))
        } finally {
            dispatch(preloaderOff())
        }
    }
}

export const getCommentsApi = (id) => {
    return async (dispatch) => {
        dispatch(preloaderOn())
        try {
            const {data} = await $api.get(`v1/manga/${id}/comments/`)
            dispatch(setComments(data))
        } catch (e) {
            dispatch(setError(e.message))
        } finally {
            dispatch(preloaderOff())
        }
    }
}


export const addCommentApi = (id, text) => {
    return async (dispatch) => {
        try {
            const response = await $authApi.post(`v1/manga/${id}/add-comment/`, {id, text})
            console.log(response)
            alert('Вы успешно отправили комментарий')
            dispatch(getCommentsApi(id))
        } catch
            (e) {
            console.log(e)
        }
    }
}