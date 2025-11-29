"use client"
import { TableHeaderType } from '@/constant/constant_types';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocaleTranslation } from '@/hooks/useLocaleTranslation';
import useTraining from '@/hooks/useTraining';
import { action_types_list, initialPagination } from '@/constant/constant_data';
import { deleteHomeGym, getHomeGyms } from '@/network/services/api-serices';
import { debounceFun, IsResponseSuccess } from '@/utils/commonUtils';
import TableWithSearchCard from '@/components/tables/TableWithSearchCard';
import Button from '@/components/ui/button/Button';
import InputSearch from '@/components/form/input/InputSearch';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import EditIconSvg from '@/icons/svgcompoments/EditIconSvg';
import DeleteIconSvg from '@/icons/svgcompoments/DeleteIconSvg';
import { confirmModal } from '@/components/ui/modal/confirmmodal';
import NoDataFound from '@/components/no-data/NoDataFound';
import AddHomeGymsModal from './AddHomeGymsModal';
import { showErrorToast, showSuccessToast } from '@/utils/toastUtils';
import TableHeaderComponent from '@/components/ui/table/TableHeaderComponent';
import TableSkeltonRow from '@/components/ui/table/TableSkeltonRow';

interface HomeGymsTableProps {
  ref_type: string
}

const tableHeader: TableHeaderType[] = [
  { label: 'sr_no', key: 'sr_no' },
  { label: 'name', key: 'name' },
  { label: 'title', key: 'title' },
  { label: 'address', key: 'address' },
  { label: 'action', key: 'action' },
];

const HomeGymsTable: FC<HomeGymsTableProps> = () => {
  const { homeGymsData, tableLoading, handleSetTableLoading, loading, handleSetLoading, handleSetHomeGymsData } = useTraining();
  const { t_commmon, t_are_you_sure, returnCurrentLocale } = useLocaleTranslation()
  const isApiCallOnce = useRef(false);

  const [search, setSearch] = useState(initialPagination);
  const [gymData, setGymData] = useState('')
  useEffect(() => {
    if (isApiCallOnce.current) return;

    if (!homeGymsData) {
      isApiCallOnce.current = true;
      handleSetTableLoading(true)
      fetchData()
    }
    return () => {
      isApiCallOnce.current = true;
    }

  }, [])

  const fetchData = async (sch?: any) => {
    const searchValue = sch || search;
    const res = await getHomeGyms(searchValue);
    handleSetTableLoading(false)
    console.log("_res", res);
    const data = IsResponseSuccess(res) ? res?.data?.data : null;
    handleSetHomeGymsData(data)
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

  // @@ modal open close
  const handleModal = (val?: any) => {
    setGymData(val || '');
    // setSearch(initialPagination);
  }

  // @@ delete  
  const handleDelete = async (item: any) => {
    if (loading) return;
    const confirmed = await confirmModal({
      title: t_commmon("delete?"),
      message: t_are_you_sure("delete_home_gym"),
      confirmText: t_commmon("yesDelete"),
      cancelText: t_commmon('cancel'),
    });
    console.log("_item", item);

    if (confirmed) {
      handleSetLoading(true);
      const res = await deleteHomeGym(item?._id);
      handleSetLoading(false);
      if (IsResponseSuccess(res)) {
        const table_data = homeGymsData
        const data = {
          ...table_data,
          items: table_data?.items?.filter((i: any) => i?._id != item?._id),
          total: table_data?.total == 1 ? 0 : table_data?.total - 1
        }
        showSuccessToast(res?.data?.message)
        handleSetHomeGymsData(data);
      } else {
        showErrorToast(t_commmon("somethingWentWrong"))
      }
    }

  }


  const tableData = useMemo(() => {
    return homeGymsData;
  }, [homeGymsData])



  return (
    <>

      {gymData && <AddHomeGymsModal

        ref_type='table'
        action_type={gymData == action_types_list.ADD ? action_types_list.ADD : action_types_list.EDIT}
        onClose={handleModal}
        gymData={gymData}
      />}

      <TableWithSearchCard
        title=''
        desc=''
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
                    {returnCurrentLocale(_it?.address)}
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
          {(tableData?.items || [])?.length == 0 && tableLoading==false &&
            <NoDataFound
              title={t_commmon("no_records_found")}
            // description="Your inbox is empt  y. Check back later."
            />}
        </div>
      </TableWithSearchCard>
    </>
  )
}

export default HomeGymsTable