import axios from 'axios';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();

    const axiosInstance = axios.create({
        baseURL: 'https://fakestoreapi.com'
    });

    return {
        provide: {
            Axios: axiosInstance,
        },
    };
});