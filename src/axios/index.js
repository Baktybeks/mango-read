import axios from 'axios'

const $api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authApi = axios.create({
    // withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL
})

$authApi.interceptors.response.use(
    async (response) => {
        return await response.data
    }
)

const authInterceptor = config => {
    const accessToken = sessionStorage.getItem('ACCESS_TOKEN')
    config.headers.authorization = `Bearer ${accessToken}`
    return config
}

$authApi.interceptors.request.use(authInterceptor)

export {$api, $authApi}