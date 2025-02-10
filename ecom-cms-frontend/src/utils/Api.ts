import axios from "axios"

const baseUrl = 'http://localhost:8000/api/'

export const api = () => {
    const axiosConfig = {
        baseURL: baseUrl,
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const instance = axios.create(axiosConfig)
    instance.interceptors.response.use(
        response => response,
        error => {
            if (error.response && error.response.status >= 400 && error.response.status < 500) {
                console.log('Client side error')
                // handle unauthorized
            }
            if (error.response && error.response.status >= 500) {
                console.log('Server Error')
                // handle not found
            }
            return Promise.reject(error)
        }
    )
    return instance
}   