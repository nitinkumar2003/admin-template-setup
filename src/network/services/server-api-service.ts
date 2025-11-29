import { LoginFormType } from "@/validations/login.validations";
import { api_url } from "../api/api_url";
import { getServerApiData, postServerApiData, putServerApiData, deleteServerApiData, } from "../api/api-server-utils";
// ==========================
// @@ AUTH
// ==========================
export const loginUserServer = async (data: LoginFormType) => {
    return await postServerApiData(api_url.admin_login_url, data);
};

// ==========================
// @@ ROLES
// ==========================
export const getRolesServer = async () => {
    return await getServerApiData(api_url.get_roles);
};

// ==========================
// @@ TRAINING GOALS
// ==========================
export const getTrainingGoalsServer = async (search: any) => {
    return await getServerApiData(api_url.get_training_goals, search);
};

export const createTrainingGoalServer = async (data: any) => {
    return await postServerApiData(api_url.create_training_goal, data);
};

export const updateTrainingGoalServer = async (data: any, id: string) => {
    return await putServerApiData(api_url.update_training_goal + id, data);
};

export const deleteTrainingGoalServer = async (id: string) => {
    return await deleteServerApiData(api_url.delete_training_goal + id);
};

// @@ SUBSCRIPTION PLANS
// ==========================
export const getSubscriptionPlansServer = async (search: any) => {
    return await getServerApiData(api_url.get_subscription_plan, search);
};

export const createSubscriptionPlanServer = async (data: any) => {
    return await postServerApiData(api_url.create_subscription_plan, data);
};

export const updateSubscriptionPlanServer = async (data: any, id: string) => {
    return await putServerApiData(api_url.update_subscrription_plan + id, data);
};

export const deleteSubscriptionPlanServer = async (id: string) => {
    return await deleteServerApiData(api_url.delete_subscription_plan + id);
};
