import axios from "axios";
import { cookies } from "next/headers";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// 🧩 Create axios instance dynamically with cookie-based Bearer token
export async function createAxiosServerInstance() {
  const cookieStore = await cookies();
  const token = cookieStore.get("ecom_token")?.value;

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });

  return instance;
}




