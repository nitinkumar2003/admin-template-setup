import { useRedux } from './useRedux'
import { setLoading, setUsersData, setTableLoading } from '@/redux/slices/userSlice';
import { getAllUsersService } from '@/network/services/api-serices';
import { IsResponseSuccess } from '@/utils/commonUtils';
const useUsers = () => {
    const { user, dispatch } = useRedux();
    const handleSetLoading = (status: boolean) => {
        dispatch(setLoading(status));
    };
    const handleSetUsers = (data: any) => {
        dispatch(setUsersData(data));
    };
    const handleSetTableLoading = (value: any) => {
        setTableLoading(value)
    }

    const getUsersData = (search: any) => {
        return new Promise(async (resolve) => {
            const res = await getAllUsersService(search);
            handleSetTableLoading(false)
            handleSetUsers(IsResponseSuccess(res) ? res?.data?.data : null)
            resolve(res)
        })
    }

    return {
        usersData: user?.usersData,
        loading: user?.loading,
        tableLoading:user?.tableLoading,
        handleSetLoading,
        handleSetTableLoading,
        handleSetUsers,
        getUsersData


    }
}

export default useUsers