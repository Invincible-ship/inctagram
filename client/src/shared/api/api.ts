import axios from 'axios'
import { LOCAL_STORAGE_LANGUAGE_ID_KEY, LOCAL_STORAGE_TOKEN_KEY } from '../const/localStorage'
import { AuthRefreshResponse } from './types'

const baseURL = __IS_DEV__ ? process.env.NEXT_PUBLIC_LOCALHOST_API : process.env.NEXT_PUBLIC_API

export const $api = axios.create({
  withCredentials: true,
  baseURL,
})

$api.interceptors.request.use(config => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
  const languageId = localStorage.getItem(LOCAL_STORAGE_LANGUAGE_ID_KEY) || 'en'

  if (config.headers && token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  config.headers['Accept-Language'] = languageId

  return config
})

$api.interceptors.response.use(
  config => {
    return config
  },
  async error => {
    const originalRequest = error.config
    console.log(error.response)

    if (error.response?.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true

      try {
        const response = await axios.get<AuthRefreshResponse>(`${baseURL}/refresh-token`, {
          withCredentials: true,
        })

        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, response.data.accessToken)
        return $api.request(originalRequest)
      } catch (e) {
        console.log('Пользователь не авторизован!')
      }
    }
    // TODO: add loggedOut
  },
)
