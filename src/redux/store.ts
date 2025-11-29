import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './slices/counterSlice';
import commonSlice from './slices/commonSlice';
import rolesSlice from './slices/rolesSlice'
import training from './slices/traningSlice'
import subscription from './slices/subscriptionSlice'
import user from './slices/userSlice'
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        common: commonSlice,
        roles: rolesSlice,
        training: training,
        subscription: subscription,
        user: user
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
