import axios, { AxiosError } from "axios"

// TODO: MOVE TO ENV
const BASE_URL = "http://localhost:3000"

const api = axios.create({ baseURL: BASE_URL, withCredentials: true })
api.defaults.withCredentials = true

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    console.log(error)
    // TODO: refresh logic
    // const originalRequest = error.config

    // if (error.response.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true

    //   try {
    //     await api.post("/auth/refresh-token")
    //     return api(originalRequest)
    //   } catch (refreshError) {
    //     window.location.href = "/sign-in"
    //     return Promise.reject(refreshError)
    //   }
    // }

    return Promise.reject(error)
  }
)

export default api
