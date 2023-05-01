import {$api} from "./index"
import {setError} from "../store/slices/errorSlice"
import {preloaderOff, preloaderOn} from "../store/slices/preloaderSlice"
import {setFilterManga} from "../store/slices/filterSlice"

export const getMangaListApi = () => {
    return async (dispatch) => {
        dispatch(preloaderOn())
        try {
            const {data} = await $api.get(`v1/manga/`)
            dispatch(setFilterManga(data))
        } catch (e) {
            dispatch(setError(e.message))
        } finally {
            dispatch(preloaderOff())
        }
    }
}