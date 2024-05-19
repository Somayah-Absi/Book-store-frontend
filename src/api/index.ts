import axios from "axios"

const isDevelopment = import.meta.env.MODE === "development"
let baseURL = "http://localhost:5125/api"

if (!isDevelopment) {
  // Update this later when you have a working backend server
  baseURL = "http://localhost:5125/api"
}

const api = axios.create({
  baseURL
})

export default api
