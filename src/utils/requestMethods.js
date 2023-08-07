import axios from "axios"
import { useEffect } from "react"

const BASE_URL = "http://localhost:8000/api/"

export const adminRequests = axios.create({
    baseURL:BASE_URL,withCredentials:true
})







