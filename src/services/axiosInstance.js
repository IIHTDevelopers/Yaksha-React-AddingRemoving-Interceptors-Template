import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: "https://fakestoreapi.com",
});

// Add a request interceptor to include Content-Type in POST requests
axiosInstance.interceptors.request.use();

// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use();

export default axiosInstance;
