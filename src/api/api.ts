import axios, { AxiosError, AxiosRequestConfig } from "axios"

// TODO: MOVE TO ENV
const BASE_URL = "http://localhost:3000"

declare module "axios" {
  interface AxiosRequestConfig {
    _retry?: boolean
  }
}

interface RetryQueueItem {
  resolve: (value?: any) => void
  reject: (error?: any) => void
}

let refreshAndRetryQueue: RetryQueueItem[] = []
let isRefreshing = false

const processQueue = (error: any = null) => {
  refreshAndRetryQueue.forEach((promise) => {
    if (error) {
      promise.reject(error)
    } else {
      promise.resolve()
    }
  })
  refreshAndRetryQueue = []
}

const api = axios.create({ baseURL: BASE_URL, withCredentials: true })

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig

    if (error.response?.status === 401 && !originalRequest?._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshAndRetryQueue.push({
            resolve,
            reject,
          })
        }).then(() => api(originalRequest))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        await api.post("/auth/refresh")
        processQueue()
        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError)
        window.location.href = "/"
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api
