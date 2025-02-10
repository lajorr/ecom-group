import axios from "axios"


const baseURL = 'http://localhost:8000/api'

export const api = () => {
    const instance = axios.create({
        baseURL: baseURL,
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return instance
}