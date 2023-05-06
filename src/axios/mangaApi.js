import {$api, $authApi} from "./index"
import {setError} from "../store/slices/errorSlice"
import {
    setFilteredGenres,
    setGenreValue,
    setMangaCount,
    setMangaList
} from "../store/slices/mangaSlice"

import {
    setAllMangaList
} from "../store/slices/filterSlice"
import {setCard, setComments} from "../store/slices/infoSlice"
import {preloader} from "../store/slices/preloaderSlice"


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
        dispatch(preloader({preloader: true}))
        try {
            const {data} = await $api.get(`v1/manga/`, {params: {limit, offset,}})
            dispatch(setMangaCount(data.count))
            dispatch(setMangaList(data.results))
        } catch (e) {
            dispatch(setError(e.message))
        } finally {
            dispatch(preloader({preloader: false}))
        }
    }
}

export const getAllMangaListApi = () => {
    return async (dispatch) => {
        try {
            const {data} = await $api.get(`v1/manga/`)
            dispatch(setAllMangaList(data))
        } catch (e) {
            dispatch(setError(e.message))
        }
    }
}

const filteredGenres = (genreValue, card) => {
    return genreValue.filter(genres => card.genre.includes(genres.id)).map(genre => genre.title).join(', ')
}


export const getInfoApi = (id) => {
    return async (dispatch) => {
        dispatch(preloader({preloaderCard: true}))
        try {
            const response = await Promise.all([
                $api.get(`v1/manga/${id}/`),
                $api.get(`v1/manga/${id}/comments/`),
                $api.get(`v1/genre/`)
            ])
            dispatch(setCard(response[0].data))
            dispatch(setComments(response[1].data))
            dispatch(setFilteredGenres(filteredGenres(response[2].data,response[0].data )))
        } catch (e) {
            dispatch(setError(e.message))
        } finally {
            dispatch(preloader({preloaderCard: false}))
        }
    }
}

export const addCommentApi = (id, text) => {
    return async (dispatch) => {
        try {
            const response = await $authApi.post(`v1/manga/${id}/add-comment/`, {id, text})
            console.log(response)
            if (response.status === 201) {
                alert('Вы успешно отправили комментарий')
                dispatch(getInfoApi(id))
            }
        } catch (e) {
            console.log(e)
        }
    }
}