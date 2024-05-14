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
// Make a GET request to fetch categories

api
  .get("/categories")
  .then((response) => {
    // Handle successful response
    console.log(response.data)
  })
  .catch((error) => {
    // Handle error
    console.error("Error fetching category:", error)
  })
export default api;