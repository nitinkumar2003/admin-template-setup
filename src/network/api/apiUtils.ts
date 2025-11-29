import axiosInstance from "./axios";
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}


// @@ get data
export async function getApiData<T = any>(
  url: string,
  params?: Record<string, any>
): Promise<ApiResponse<T>> {
  try {
    const response = await axiosInstance.get<T>(url, { params });
    return { success: true, data: response.data };
  } catch (error: any) {
    return handleError(error);
  }
}


// @@ post req
export async function postApiData<T = any>(
  url: string,
  data?: Record<string, any>
): Promise<ApiResponse<T>> {
  try {
    const response = await axiosInstance.post<T>(url, data);
    return { success: true, data: response.data };
  } catch (error: any) {
    return handleError(error);
  }
}

// @@ put request
export async function putApiData<T = any>(
  url: string,
  data?: Record<string, any>
): Promise<ApiResponse<T>> {
  try {
    const response = await axiosInstance.put<T>(url, data);
    return { success: true, data: response.data };
  } catch (error: any) {
    return handleError(error);
  }
}

// @@ delete request
export async function deleteApiData<T = any>(
  url: string,
  params?: Record<string, any>
): Promise<ApiResponse<T>> {
  try {
    const response = await axiosInstance.delete<T>(url, { params });
    return { success: true, data: response.data };
  } catch (error: any) {
    return handleError(error);
  }
}



// @@ common error handler
function handleError(error: any): ApiResponse {
  const message =
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong";
  return { success: false, error: message };
}
