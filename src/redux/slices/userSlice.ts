import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    loading: boolean;
    tableLoading: boolean;
    usersData: any | null;
}

const initialState: UserState = {
    loading: false,
    tableLoading: false,
    usersData: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setTableLoading: (state, action: PayloadAction<boolean>) => {
            state.tableLoading = action.payload
        },
        setUsersData: (state, action: PayloadAction<boolean>) => {
            state.usersData = action.payload
        },
        resetUserData: (state) => {
            state.usersData = null;
            state.loading = false;
        },
    }
})

export const { setUsersData, resetUserData, setLoading,setTableLoading } = userSlice.actions;
export default userSlice.reducer