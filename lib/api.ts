import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken, setToken, removeToken } from './auth';
import { toast } from 'react-toastify';

interface ApiResponse<T> {
    status: string;
    message: string;
    data?: T;
    error?: boolean;
}

const baseURL = process.env.NEXT_PUBLIC_API_URL as string;

const api: AxiosInstance = axios.create({
    baseURL,
    withCredentials: true, // Enable cookies
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Request interceptor for API calls
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Log the complete request configuration
        console.log('🌐 API Request:', {
            method: config.method?.toUpperCase(),
            url: config.url,
            baseURL: config.baseURL,
            fullURL: `${config.baseURL}${config.url}`,
            headers: {
                ...config.headers.toJSON(),
                Authorization: config.headers.Authorization ? 'Bearer [REDACTED]' : undefined,
            },
            data: config.data,
            withCredentials: config.withCredentials,
        });

        return config;
    },
    (error: AxiosError) => {
        console.error('❌ Request Error:', {
            message: error.message,
            config: error.config,
            status: error.response?.status,
            stack: error.stack,
        });
        return Promise.reject(error);
    }
);

// Response interceptor for API calls
api.interceptors.response.use(
    (response: AxiosResponse) => {
        const apiResponse = response.data as ApiResponse<any>;

        // Log the complete response
        console.log('✅ API Response:', {
            status: response.status,
            statusText: response.statusText,
            apiStatus: apiResponse.status,
            message: apiResponse.message,
            data: apiResponse.data,
            error: apiResponse.error,
            headers: response.headers,
            config: {
                ...response.config,
                headers: {
                    ...response.config.headers.toJSON(),
                    Authorization: response.config.headers.Authorization ? 'Bearer [REDACTED]' : undefined,
                },
            },
        });

        // If the API response indicates an error, reject the promise
        if (apiResponse.error || apiResponse.status === 'error') {
            const error = new Error(apiResponse.message) as AxiosError;
            error.response = {
                ...response,
                data: apiResponse,
            };
            return Promise.reject(error);
        }

        // Return only the data part of the response
        return {
            ...response,
            data: apiResponse.data,
        };
    },
    (error: AxiosError) => {
        console.error('❌ Response Error:', {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            headers: error.response?.headers,
            config: {
                ...error.config,
                headers: {
                    ...error.config?.headers.toJSON(),
                    Authorization: error.config?.headers.Authorization ? 'Bearer [REDACTED]' : undefined,
                },
            },
            stack: error.stack,
        });

        // Handle specific error cases
        if (error.response) {
            const status = error.response.status;
            const apiResponse = error.response.data as ApiResponse<any>;
            const errorMessage = apiResponse?.message || 'An error occurred. Please try again.';

            switch (status) {
                case 401:
                    toast.error('Session expired. Please log in again.');
                    removeToken();
                    // Handle unauthorized (e.g., redirect to login)
                    break;
                case 403:
                    toast.error('You do not have permission to perform this action.');
                    break;
                case 404:
                    toast.error('The requested resource was not found.');
                    break;
                case 500:
                    toast.error('Server error. Please try again later.');
                    break;
                default:
                    toast.error(errorMessage);
            }
        } else if (error.request) {
            console.error('❌ No response received:', {
                request: error.request,
                message: error.message,
                stack: error.stack,
            });
            toast.error('Network error. Please check your connection.');
        } else {
            console.error('❌ Request setup error:', {
                message: error.message,
                stack: error.stack,
            });
            toast.error('An error occurred while setting up the request.');
        }

        return Promise.reject(error);
    }
);

export default api; 