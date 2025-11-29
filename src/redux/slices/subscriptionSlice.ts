import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SubscriptionState {
  loading: boolean;
  subscriptionData:any | null;
  tableLoading:boolean;
}

const initialState: SubscriptionState = {
  loading: false,
  subscriptionData: null,
  tableLoading:false
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
     setTableLoading: (state, action: PayloadAction<boolean>) => {
      state.tableLoading = action.payload;
    },
    setSubscriptionData: (state, action: PayloadAction<any>) => {
      state.subscriptionData = action.payload;
    },
  
    resetTrainingData: (state) => {
      state.subscriptionData = null;
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setSubscriptionData,
  setTableLoading
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
