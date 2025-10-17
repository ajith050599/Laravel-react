import axios from "axios";

const api = axios.create({
    baseURL: "/api", 
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        console.log("➡️ Request:", config.method?.toUpperCase(), config.url);
        // You can add auth tokens here, e.g.:
        // config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return config;
    },
    (error) => {
        console.error("Request Error:", error);
        return Promise.reject(error);
    }
);

// ✅ Response Interceptor
api.interceptors.response.use(
    (response) => {
        console.log("Response:", response);
        return response;
    },
    (error) => {
        if (error.response) {
            console.error(" API Error:", error.response.status, error.response.data);
        } else {
            console.error("Network Error:", error.message);
        }
        return Promise.reject(error);
    }
);

export default api;
