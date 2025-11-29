"use client"
import { TableHeaderType } from '@/constant/constant_types';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocaleTranslation } from '@/hooks/useLocaleTranslation';
import { action_types_list, initialPagination } from '@/constant/constant_data';
import { debounceFun } from '@/utils/commonUtils';
import TableWithSearchCard from '@/components/tables/TableWithSearchCard';
import Button from '@/components/ui/button/Button';
import InputSearch from '@/components/form/input/InputSearch';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import EditIconSvg from '@/icons/svgcompoments/EditIconSvg';
import DeleteIconSvg from '@/icons/svgcompoments/DeleteIconSvg';
import { confirmModal } from '@/components/ui/modal/confirmmodal';
import NoDataFound from '@/components/no-data/NoDataFound';
import useSubscription from '@/hooks/useSubscription';
import AddSubscriptionPlans from './AddSubscriptionPlans';
import ToggleSwitch from '@/components/form/toggle/ToggleSwitch';
import { IsRequiredValidate } from '@/validations/common.validations';
import { showSuccessToast } from '@/utils/toastUtils';
import TableHeaderComponent from '@/components/ui/table/TableHeaderComponent';
import TableSkeltonRow from '@/components/ui/table/TableSkeltonRow';



const tableHeader: TableHeaderType[] = [
  { label: 'sr_no', key: 'sr_no' },
  { label: 'name', key: 'name' },
  { label: 'title', key: 'title' },
  { label: 'price', key: 'price' },
  { label: 'status', key: 'status' },
  { label: 'action', key: 'action' },
];


const SubscriptionTable = () => {
  const { subscriptionData, loading, tableLoading, getSubscriptionsPlans, createUpdateSubscriptionPlan, deleteSubscriptionPlan, handleTableSetLoading } = useSubscription()
  const { t_commmon, t_are_you_sure, returnCurrentLocale } = useLocaleTranslation()
  const isApiCallOnce = useRef(false);

  const [search, setSearch] = useState(initialPagination);
  const [planData, setPlanData] = useState('')
  useEffect(() => {
    if (isApiCallOnce.current) return;

    if (!subscriptionData?.data) {
      isApiCallOnce.current = true;
      handleTableSetLoading(true)
      // handlSetSubscriptionData(subsApiData)
      getSubscriptionsPlans(initialPagination)
    }
    return () => {
      isApiCallOnce.current = true;
    }

  }, [initialPagination])


  // @@ data fetch with debounce
  const debouncedFetchData = useCallback(debounceFun(getSubscriptionsPlans, 400), []);
  //@ search data
  const handleSearch = (key: any, value?: any) => {
    const search_values = { ...search, [key]: value }
    setSearch(search_values);
    // fetchData(search_values)
    debouncedFetchData(search_values);
  }

  // @@ modal open close
  const handleModal = (val?: any) => {
    setPlanData(val || '');
  }

  // @@ delete  
  const handleDelete = async (item: any) => {
    if (loading) return;
    const confirmed = await confirmModal({
      title: t_commmon("delete?"),
      message: t_are_you_sure("delete_plans"),
      confirmText: t_commmon("yesDelete"),
      cancelText: t_commmon('cancel'),
    });
    console.log("_item", item);
    if (confirmed) {
      await deleteSubscriptionPlan(item?._id);
    }
  }
  const handleStatusChange = async (e: any, item: any) => {
    const jsonObj = { ...item }
    jsonObj.status = jsonObj?.status == 1 ? 0 : 1;
    const res = createUpdateSubscriptionPlan(jsonObj, jsonObj?._id, false)
    if (IsRequiredValidate(res)) {
      showSuccessToast(t_commmon("statusUpdatesuccessfully"))
    }

  }


  const tableData = useMemo(() => {
    return subscriptionData;
  }, [subscriptionData])


  console.log("_subscriptionData", subscriptionData)

  return (
    <>


      {planData && <AddSubscriptionPlans

        action_type={planData == action_types_list.ADD ? action_types_list.ADD : action_types_list.EDIT}
        onClose={handleModal}
        planData={planData}

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
              {tableData?.data?.map((_it: any, index: number) => (
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
                    {returnCurrentLocale(_it?.price)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {/* {returnCurrentLocale(_it?.status)} */}
                    <ToggleSwitch
                      // label="Dark Mode"
                      onChange={(e) => handleStatusChange(e, _it)}
                      checked={_it?.status == 1}
                    />

                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <div className="flex gap-2">
                      <EditIconSvg onClick={() => handleModal(_it)} />
                      <DeleteIconSvg onClick={() => handleDelete(_it)} />
                    </div>

                  </TableCell>
                </TableRow>

              ))}

              {tableLoading && (tableData?.data || []).length == 0 && <TableSkeltonRow count={tableHeader?.length} />}

            </TableBody>

          </Table>
          {(tableData?.data || [])?.length == 0 && tableLoading==false &&
            <NoDataFound
              title={t_commmon("no_records_found")}
            // description="Your inbox is empt  y. Check back later."
            />}
        </div>
      </TableWithSearchCard>
    </>
  )
}

export default SubscriptionTable