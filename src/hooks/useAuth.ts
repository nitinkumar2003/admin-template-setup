"use client";

import Cookies from "js-cookie";
import { storage_keys } from "@/constant/constant_keys";
import useNavigation from "./useNavigation";
import { removeLocalStorage, setCookie, setLocalStorage } from "@/utils/storageUtils";
import { routes_info } from "@/constant/constant_routes";
import { useMemo } from "react";
import { ForgotPasswordType, VerifyOtpType } from "@/validations/login.validations";
import { changePasswordService, forgotPasswordSerive, resetPasswordService, verifyOtpservice } from "@/network/services/api-serices";
export function useAuth() {
  const { goTo } = useNavigation();

  const login = (data: any, day?: any) => {
    const _tokenValue = data?.token;
    setCookie(storage_keys.ecom_token, _tokenValue, day); // 1 day expiry
    setCookie(storage_keys.ecom_login, data, day);
    setLocalStorage(storage_keys.ecom_token, _tokenValue);
    setLocalStorage(storage_keys.ecom_login, data);
    goTo(routes_info.dashboard);
  };

  const loggedInDetails = useMemo(() => {
    const loggedDtails = Cookies.get(storage_keys.ecom_login);
    if (!loggedDtails) return;
    return JSON.parse(loggedDtails) || null;
  }, [])

  const logout = () => {
    Cookies.remove(storage_keys.ecom_token);
    Cookies.remove(storage_keys.ecom_login);
    removeLocalStorage(storage_keys.ecom_token);
    removeLocalStorage(storage_keys.ecom_login);

    goTo(routes_info.sign_in);
  };

  const redirectIfAuthenticated = () => {
    const token = Cookies.get(storage_keys.ecom_token);
    if (token) {
      goTo(routes_info.dashboard);
    };
  };

  const redirectIfNotAuthenticated = () => {
    const token = Cookies.get(storage_keys.ecom_token);
    if (!token) {
      goTo(routes_info.sign_in)
    };
  };


  const handleForgotPasswordApi = (data: ForgotPasswordType) => {
    return new Promise(async (resolve) => {
      const res = await forgotPasswordSerive(data);
      resolve(res)
    })
  }

  const handleVerifyOtpApi = (data: VerifyOtpType) => {
    return new Promise(async (resolve) => {
      const res = await verifyOtpservice(data);
      resolve(res)
    })
  }


  const handleSetPasswordApi = (data: any) => {
    return new Promise(async (resolve) => {
      const res = await resetPasswordService(data)
      resolve(res)
    })
  }

  const handleChangePasswordApi=(data:any)=>{
    return new Promise(async(resovle)=>{
      const res=await changePasswordService(data)
      resovle(res)
    })
  }


  return {
    login,
    logout,
    redirectIfAuthenticated,
    redirectIfNotAuthenticated, loggedInDetails,
    handleForgotPasswordApi,
    handleVerifyOtpApi,
    handleSetPasswordApi,
    handleChangePasswordApi
  };
}
