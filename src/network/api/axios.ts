import axios, { AxiosHeaders } from "axios";
import { getCookie, getLocalStorage, removeCookies, removeLocalStorage } from "@/utils/storageUtils";
import { storage_keys } from "@/constant/constant_keys";
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = typeof window !== "undefined" ? getLocalStorage(storage_keys.ecom_token) || getCookie(storage_keys.ecom_token) : null;

    if ( config.headers) {
      // Accept-Language
      (config.headers as AxiosHeaders).set("Accept-language",localStorage.getItem(storage_keys?.language_locale) || 'en' );
      if(token){
        (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API Error:", error?.response || error);
    if (error?.response?.status === 401) {
      // TODO: handle logout or redirect if needed
      removeCookies(storage_keys.ecom_token);
      removeCookies(storage_keys.ecom_login);
      removeLocalStorage(storage_keys.ecom_token);
      removeLocalStorage(storage_keys.ecom_login);
      if (typeof window !== "undefined") {
        const isLoginPage = window.location.pathname.includes("signin");
        if (!isLoginPage) {
          window.location.href = "/signin";
        } 
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
