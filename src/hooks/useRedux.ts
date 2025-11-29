import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useRedux = () => {
    const dispatch = useAppDispatch();
    const selector = useAppSelector;
    const reduxData = selector((state: any) => state);
    const { auth, roles, common, training, subscription,user } = reduxData;
    return {
        dispatch,
        selector,
        reduxSubscription:subscription,
        reduxAuth:auth,
        reduxRoles:roles,
        reduxCommon:common,
        reduxTraining:training,
        reduxData:reduxData,
        user
    };
};

