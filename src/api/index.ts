import axios from "axios"

const isDevelopment = import.meta.env.MODE === "development"
let baseURL = "https://sda-online-2-csharp-backend-teamwork-8h7n.onrender.com/api"

if (isDevelopment) {
  // Update this to your local backend URL during development
  baseURL = "http://localhost:3000/api"
}

const api = axios.create({
  baseURL
})

export default api
