import { setLoading, setTableLoading, setSubscriptionData } from "@/redux/slices/subscriptionSlice";
import { useRedux } from "./useRedux";
import { createSubscriptionPlansService, deleteeSubscriptionPlan, getSubscriptionPlansService, updateSubscriptionPlan } from "@/network/services/api-serices";
import { IsResponseSuccess } from "@/utils/commonUtils";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { useLocaleTranslation } from "./useLocaleTranslation";

const useSubscription = () => {
    const { selector, dispatch } = useRedux();
    const { t_commmon } = useLocaleTranslation()
    const { subscriptionData,tableLoading, loading } = selector(
        (state) => state.subscription
    );
    const handleSetLoading = (status: boolean) => {
        dispatch(setLoading(status));
    };
    const handleTableSetLoading = (status: boolean) => {
        dispatch(setTableLoading(status));
    };


    const handlSetSubscriptionData = (data: any) => {
        dispatch(setSubscriptionData(data));
    };

    // @@ get list of subscription
    const getSubscriptionsPlans = (search: any) => {
        return new Promise(async (resolve: any) => {
            const res = await getSubscriptionPlansService(search)
            handleTableSetLoading(false)
            handlSetSubscriptionData(IsResponseSuccess(res) ? res.data?.data : null)
            resolve(res)
        })
    }

    // @@ create and update subscription
    const createUpdateSubscriptionPlan = (data: any, id?: any, message?: any) => {
        return new Promise(async (resolve) => {
            const res = id ? await updateSubscriptionPlan(data, id) : await createSubscriptionPlansService(data)

            console.log("_res", res)
            if (IsResponseSuccess(res)) {
                const responseData = res?.data?.data;
                const isAdd = id ? false : true
                const data = isAdd ? [...(subscriptionData?.data || []), responseData] : subscriptionData?.data?.map((i: any) => (i?._id === id ? responseData : i));
                handlSetSubscriptionData({
                    ...subscriptionData,
                    data,
                    total: (subscriptionData?.total || 0) + (isAdd ? 1 : 0),
                })
                if (message != false) {
                    showSuccessToast(res?.data?.message);
                }

            }
            resolve(res)
        })
    }

    // @@ delete subscreiption
    const deleteSubscriptionPlan = (id: string) => {
        return new Promise(async (resolve) => {
            handleSetLoading(true)
            const res = await deleteeSubscriptionPlan(id);
            handleSetLoading(false)
            if (IsResponseSuccess(res)) {
                const table_data = subscriptionData
                const data = {
                    ...table_data,
                    data: table_data?.data?.filter((i: any) => i?._id != id),
                    total: table_data?.data == 1 ? 0 : table_data?.total - 1
                }
                showSuccessToast(res?.data?.message)
                handlSetSubscriptionData(data);

            } else {
                showErrorToast(res?.error || t_commmon("somethingWentWrong"))
            }
            resolve(res)
        })
    }


    return {
        subscriptionData, loading,
        handleSetLoading, handlSetSubscriptionData,
        getSubscriptionsPlans,
        createUpdateSubscriptionPlan,
        deleteSubscriptionPlan,
        handleTableSetLoading,
        tableLoading
    }

}

export default useSubscription;