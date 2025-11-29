import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface Role {
  id?: string;
  name: string;
  title?:string;
  status?:string
}

interface RolesState {
  roles: Role[];
  loading:boolean;
}

const initialState: RolesState = {
    roles: [],
    loading: false
};

const rolesSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {
        setRolesList: (state, action: PayloadAction<Role[]>) => {
            state.roles = action.payload;
        },

    },
});

export const { setRolesList } = rolesSlice.actions;
export default rolesSlice.reducer;
