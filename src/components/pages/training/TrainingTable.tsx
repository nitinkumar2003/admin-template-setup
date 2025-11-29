"use client"
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "../../ui/table";

import TableWithSearchCard from "../../tables/TableWithSearchCard";
import { TableHeaderType } from "@/constant/constant_types";
import EditIconSvg from "@/icons/svgcompoments/EditIconSvg";
import Button from "../../ui/button/Button";
import AddTrainingGoalsStyleModal from "./AddTrainingGoalsStyleModal";
import { action_types_list, training_goals_style_types } from "@/constant/constant_data";
import useTraining from "@/hooks/useTraining";
import { deleteTrainingGoal, deleteTrainingStyles, getTrainingGoals, getTrainingStyles } from "@/network/services/api-serices";
import DeleteIconSvg from "@/icons/svgcompoments/DeleteIconSvg";
import { confirmModal } from "../../ui/modal/confirmmodal";
import InputSearch from "../../form/input/InputSearch";
import { debounceFun, IsResponseSuccess } from "@/utils/commonUtils";
import { useLocaleTranslation } from "@/hooks/useLocaleTranslation";
import { showSuccessToast } from "@/utils/toastUtils";
import NoDataFound from "../../no-data/NoDataFound";
import { initialPagination } from "@/constant/constant_data";
import TableHeaderComponent from "@/components/ui/table/TableHeaderComponent";
import TableSkeltonRow from "@/components/ui/table/TableSkeltonRow";
const tableHeader: TableHeaderType[] = [
  { label: 'sr_no', key: 'sr_no' },
  { label: 'name', key: 'name' },
  { label: 'title', key: 'description' },
  { label: 'action', key: 'action' },
];



interface TrainingTableProps {
  ref_type: string
}

const TrainintTable: FC<TrainingTableProps> = ({ ref_type }) => {
  const { styleData, goalsData, tableLoading, handleSetTableLoading, handleSetGoalsData, handleSetStyleData } = useTraining();
  const { t_commmon, returnCurrentLocale } = useLocaleTranslation()
  const [trainingData, setTrainingData] = useState<any>(null);
  const [search, setSearch] = useState(initialPagination);
  // const isApiCalledOnce = useRef(false);

  const isRefGoals = ref_type === training_goals_style_types.goals;

  useEffect(() => {
    // if (isApiCalledOnce.current) return;

    const data = isRefGoals ? goalsData : styleData;
    if (!data) {
      // isApiCalledOnce.current = true;
      handleSetTableLoading(true)
      fetchData();
    }
  }, [isRefGoals]);

  console.log('__search', search)
  const fetchData = async (sch?: any) => {
    const search_values = sch || search;
    const res = await (isRefGoals ? getTrainingGoals(search_values) : getTrainingStyles(search_values));
    handleSetTableLoading(false)
    console.log("_resres", res);
    if (IsResponseSuccess(res)) {
      const setData = isRefGoals ? handleSetGoalsData : handleSetStyleData;
      setData(res?.data?.data)
    }
  };




  // @@ modal open close
  const handleModal = (val?: any) => {
    setTrainingData(val || '');
    // setSearch(initialPagination);
  }


  // @@ data fetch with debounce
  const debouncedFetchData = useCallback(debounceFun(fetchData, 400), []);
  //@ search data
  const handleSearch = (key: any, value?: any) => {
    const search_values = { ...search, [key]: value }
    setSearch(search_values);
    // fetchData(search_values)
    debouncedFetchData(search_values);
  }


  const handleDelete = async (item: any) => {
    const confirmed = await confirmModal({
      title: t_commmon("delete?"),
      message: t_commmon("are_u_sure_want_to_delete"),
      confirmText: t_commmon("yesDelete"),
      cancelText: t_commmon('cancel'),
    });
    console.log("_item", item)

    if (confirmed) {
      const res = isRefGoals ? await deleteTrainingGoal(item?._id) : await deleteTrainingStyles(item?._id);
      console.log("-res", res)
      if (IsResponseSuccess(res)) {
        const table_data = isRefGoals ? goalsData : styleData
        const setData = isRefGoals ? handleSetGoalsData : handleSetStyleData;
        const data = {
          ...table_data,
          items: table_data?.items?.filter((i: any) => i?._id != item?._id),
          total: table_data?.total == 1 ? 0 : table_data?.total - 1
        }
        showSuccessToast(res?.data?.message)
        setData(data);
      }
    }
  }
  const tableData = useMemo(() => {
    const array = isRefGoals ? goalsData : styleData;
    // if (!search) {
    return array;
    // }
    // return searchInArray(array?.items, ['name', 'title'],search, lang) || []

  }, [isRefGoals, styleData, goalsData])

  console.log("_tableData", tableData)

  return (
    <>
      {trainingData &&
        <AddTrainingGoalsStyleModal
          ref_type={ref_type}
          action_type={trainingData == action_types_list.ADD ? action_types_list.ADD : action_types_list.EDIT}
          onClose={handleModal}
          trainingData={trainingData}
        />
      }
      <TableWithSearchCard title=""
        desc=""
        isPagination={true}
        paginationData={{
          page: tableData?.page || 0,
          total: tableData?.pages || 0,
          onPageChange: (page: number) => handleSearch('page', page)
        }}
        btnRight={() => <Button onClick={() => handleModal(action_types_list.ADD)} type="button" className="" >{t_commmon("add")} +  </Button>}
        searchBtn={() => <InputSearch onChange={(e: any) => handleSearch('search', e)} placeholder={t_commmon("search_placeholder")} />}>
        <div className="">  {/* min-w-[1102px] */}
          <Table>
            {/* Table Header */}
            <TableHeaderComponent t_commmon={t_commmon} tableHeader={tableHeader} />
            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableData?.items?.map((_it: any, index: number) => (
                <TableRow key={_it?._id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {index + 1}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {returnCurrentLocale(_it.name)}

                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {returnCurrentLocale(_it?.title)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <div className="flex gap-2">
                      <EditIconSvg onClick={() => handleModal(_it)} />
                      <DeleteIconSvg onClick={() => handleDelete(_it)} />
                    </div>

                  </TableCell>
                </TableRow>
              ))}
                  {tableLoading && (tableData?.items || []).length == 0 && <TableSkeltonRow count={tableHeader?.length} />}

            
            </TableBody>

          </Table>




          {(tableData?.items || [])?.length == 0  && tableLoading==false &&
            <NoDataFound
              title={t_commmon("no_records_found")}
            // description="Your inbox is empty. Check back later."
            />}
        </div>

      </TableWithSearchCard>
    </>
  );
}
export default TrainintTable;
