import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TrainingState {
  loading: boolean;
  styleData: any | null;
  goalsData: any | null;
  homeGymsData: any | null;
  tableLoading:boolean;
}

const initialState: TrainingState = {
  loading: false,
  styleData: null,
  goalsData: null,
  homeGymsData: null,
  tableLoading:false
};

const trainingSlice = createSlice({
  name: "training",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setStyleData: (state, action: PayloadAction<any>) => {
      state.styleData = action.payload;
    },
     setTableLoading: (state, action: PayloadAction<boolean>) => {
      state.tableLoading = action.payload;
    },
    setGoalsData: (state, action: PayloadAction<any>) => {
      state.goalsData = action.payload;
    },
    setHomeGymsData: (state, action: PayloadAction<any>) => {
      state.homeGymsData = action.payload;
    },
    resetTrainingData: (state) => {
      state.styleData = null;
      state.goalsData = null;
      state.homeGymsData = null;
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setStyleData,
  setGoalsData,
  setHomeGymsData,
  resetTrainingData,
  setTableLoading
} = trainingSlice.actions;

export default trainingSlice.reducer;
