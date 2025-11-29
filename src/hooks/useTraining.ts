import { useRedux } from "./useRedux";
import { setStyleData, setLoading, setGoalsData, setHomeGymsData, resetTrainingData, setTableLoading } from "@/redux/slices/traningSlice";

const useTraining = () => {
    const { selector, dispatch } = useRedux();
    const { styleData, goalsData,tableLoading, loading, homeGymsData } = selector(
        (state) => state.training
    );

    // === ACTION DISPATCHERS ===
    const handleSetLoading = (status: boolean) => {
        dispatch(setLoading(status));
    };
      const handleSetTableLoading = (status: boolean) => {
        dispatch(setTableLoading(status));
    };


    const handleSetStyleData = (data: any) => {
        dispatch(setStyleData(data));
    };

    const handleSetGoalsData = (data: any) => {
        dispatch(setGoalsData(data));
    };

    const handleResetTraining = () => {
        dispatch(resetTrainingData());
    };

    const handleSetHomeGymsData = (data: any) => {
        dispatch(setHomeGymsData(data));
    };

    return {
        loading,
        styleData,
        goalsData,
        homeGymsData,
        handleSetLoading,
        handleSetStyleData,
        handleSetGoalsData,
        handleResetTraining,
        handleSetHomeGymsData,
        tableLoading,
        handleSetTableLoading

    };
};

export default useTraining;
