import axios from "axios"
import { useEffect } from "react"

const BASE_URL = "https://desk-api.vercel.app/api/"

export const adminRequests = axios.create({
    baseURL:BASE_URL,withCredentials:true
})







