import { ForgotPasswordType, LoginFormType, VerifyOtpType } from "@/validations/login.validations";
import { api_url } from "../api/api_url";
import { deleteApiData, getApiData, postApiData, putApiData } from "../api/apiUtils";


// @@ start auth
// @@ login user
export const loginUser = async (data: LoginFormType) => {
    return await postApiData(api_url.admin_login_url, data)
}

// @@ forgot password

export const forgotPasswordSerive = async (data: ForgotPasswordType) => {
    return await postApiData(api_url.forgot_password, data)
}

// @@ forgot otp verify
export const verifyOtpservice = async (data: VerifyOtpType) => {
    return await postApiData(api_url.forgot_password_verify, data)
}
// @@ reset password  
export const resetPasswordService=async(data:any)=>{
    return await postApiData(api_url.reset_password,data)
}

// @@ change password  
export const changePasswordService=async(data:any)=>{
    return await postApiData(api_url.change_password,data)
}
// @@ end auth

// @@ roles 

export const getRoles = async () => {
    return await getApiData(api_url.get_roles)
}

//training goals and styles

export const getTrainingGoals = async (search: any) => {
    return await getApiData(api_url.get_training_goals, search)
    // + `?search=${search?.search}&page=${search?.page}&limit=${search?.limit}`)
}

// @@ create training goals
export const createTrainingGoal = async (data: any) => {
    return await postApiData(api_url.create_training_goal, data)
}

//update training goals
export const updateTrainingGoal = async (data: any, id: string) => {
    return await putApiData(api_url.update_training_goal + id, data)
}

// /update training styles
export const updateTrainingStyles = async (data: any, id: string) => {
    return await putApiData(api_url.update_training_style + id, data)
}

// @@ delete training goals
export const deleteTrainingGoal = async (id: string) => {
    return await deleteApiData(api_url.delete_training_goal + id)
}


// @@ create training styles
export const createTrainingStyles = async (data: any) => {
    return await postApiData(api_url.create_training_style, data)
}

// @@ get training styles
export const getTrainingStyles = async (search: any) => {
    return await getApiData(api_url.get_training_styles, search)
    //+ `?search=${search?.search}&page=${search?.page}&limit=${search?.limit}`)
}

// @@ delete training styles
export const deleteTrainingStyles = async (id: string) => {
    return await deleteApiData(api_url.delete_training_style + id)
}


// @@ start home gyms
// @@ create home gyms

export const createHomeGym = async (data: any) => {
    return await postApiData(api_url.create_home_gym, data)
}

// @@ get home gyms
export const getHomeGyms = async (search: any) => {
    return await getApiData(api_url.get_home_gyms, search)
    //+ `?search=${search?.search}&page=${search?.page}&limit=${search?.limit}`)
}

// @@ update home gyms
export const updateHomeGym = async (data: any, id: string) => {
    return await putApiData(api_url.update_home_gym + id, data)
}

// @@ delete home gyms
export const deleteHomeGym = async (id: string) => {
    return await deleteApiData(api_url.delete_home_gym + id)
}

// @@ end home gyms

export const getSubscriptionPlansService = async (search: any) => {
    return await getApiData(api_url.get_subscription_plan, search)
    //+ `?search=${search?.search}&page=${search?.page}&limit=${search?.limit}`)
}

export const createSubscriptionPlansService = async (data: any) => {
    return await postApiData(api_url.create_subscription_plan, data)
}

// @@   
export const updateSubscriptionPlan = async (data: any, id: string) => {
    return await putApiData(api_url.update_subscrription_plan + id, data)
}

// @@ delete subscriptionplan
export const deleteeSubscriptionPlan = async (id: string) => {
    return await deleteApiData(api_url.delete_subscription_plan + id)
}

// @@ users
export const getAllUsersService = async (search: any) => {
    return await getApiData(api_url.get_all_users, search)
    //+ `?search=${search?.search}&page=${search?.page}&limit=${search?.limit}`)
}