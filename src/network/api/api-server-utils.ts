import { createAxiosServerInstance } from "./serverAxios";
import { ApiResponse } from "./serverAxios";



// 🧩 GET
export async function getServerApiData<T = any>(
    url: string,
    params?: Record<string, any>
): Promise<ApiResponse<T>> {
    try {
        const axiosInstance = await createAxiosServerInstance();
        const response = await axiosInstance.get<T>(url, { params });
        return { success: true, data: response.data };
    } catch (error: any) {
        return handleError(error);
    }
}


export async function postServerApiData<T = any>(
    url: string,
    data?: Record<string, any>
): Promise<ApiResponse<T>> {
    try {
        const axiosInstance = await createAxiosServerInstance();
        const response = await axiosInstance.post<T>(url, data);
        return { success: true, data: response.data };
    } catch (error: any) {
        return handleError(error);
    }
}

// 🧩 PUT
export async function putServerApiData<T = any>(
    url: string,
    data?: Record<string, any>
): Promise<ApiResponse<T>> {
    try {
        const axiosInstance = await createAxiosServerInstance();
        const response = await axiosInstance.put<T>(url, data);
        return { success: true, data: response.data };
    } catch (error: any) {
        return handleError(error);
    }
}

// 🧩 DELETE
export async function deleteServerApiData<T = any>(
    url: string,
    params?: Record<string, any>
): Promise<ApiResponse<T>> {
    try {
        const axiosInstance = await createAxiosServerInstance();
        const response = await axiosInstance.delete<T>(url, { params });
        return { success: true, data: response.data };
    } catch (error: any) {
        return handleError(error);
    }
}

function handleError(error: any): ApiResponse {
    const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong on the server";
    return { success: false, error: message };
}