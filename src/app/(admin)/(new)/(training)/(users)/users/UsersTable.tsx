"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'
import useUsers from '@/hooks/useUsers'
import { initialPagination } from '@/constant/constant_data';
import { TableHeaderType } from '@/constant/constant_types';
import TableWithSearchCard from '@/components/tables/TableWithSearchCard';
import InputSearch from '@/components/form/input/InputSearch';
import { useLocaleTranslation } from '@/hooks/useLocaleTranslation';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import TableHeaderComponent from '@/components/ui/table/TableHeaderComponent';
import NoDataFound from '@/components/no-data/NoDataFound';
import { debounceFun } from '@/utils/commonUtils';
import ToggleSwitch from '@/components/form/toggle/ToggleSwitch';
import TableSkeltonRow from '@/components/ui/table/TableSkeltonRow';

const tableHeader: TableHeaderType[] = [
    { label: 'sr_no', key: 'sr_no' },
    { label: 'name', key: 'name' },
    { label: "email", key: 'email' },
    { label: 'status', key: 'status' },
    { label: "block", key: "is_blocked" }
];

const UsersTable = () => {
    const { usersData, tableLoading, getUsersData, handleSetTableLoading } = useUsers();
    const { t_commmon } = useLocaleTranslation()
    const isApiCallOnce = useRef(false);
    const [search, setSearch] = useState(initialPagination);


    useEffect(() => {
        if (isApiCallOnce.current) return;
        if (!usersData) {
            handleSetTableLoading(true)
            getUsersData(initialPagination)
        }
    }, [getUsersData])

    const debouncedFetchData = useCallback(debounceFun(getUsersData, 400), []);

    //@ search data
    const handleSearch = (key: any, value?: any) => {
        const search_values = { ...search, [key]: value }
        setSearch(search_values);
        // fetchData(search_values)
        debouncedFetchData(search_values);
    }

    return (
        <>
            <TableWithSearchCard
                title=''
                desc=''
                isPagination={true}
                paginationData={{
                    page: usersData?.page || 0,
                    total: usersData?.pages || 0,
                    onPageChange: (page: number) => handleSearch('page', page)
                }}
                // btnRight={() => <Button onClick={() => handleModal(action_types_list.ADD)} type="button" className="" >{t_commmon("add")} +  </Button>}
                searchBtn={() => <InputSearch onChange={(e: any) => handleSearch('search', e)} placeholder={t_commmon("search_placeholder")} />}>

                <div className="">
                    <Table>
                        {/* @@ table header */}
                        <TableHeaderComponent t_commmon={t_commmon} tableHeader={tableHeader} />
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {usersData?.items?.map((_it: any, index: number) => {
                                const full_name = _it?.first_name ? `${_it.first_name} ${_it.last_name || ''}`.trim() : '-';

                                return <TableRow key={_it?._id}>
                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        {full_name}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        {_it?.email ? _it?.email : '-'}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        {_it?.status == 1 ? <span className='theme-active-color'>{t_commmon('active')}</span> : t_commmon("inactive")}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        {/* {returnCurrentLocale(_it?.status)} */}
                                        <ToggleSwitch
                                            // label="Dark Mode"
                                            onChange={(e) => console.log(e, _it)}
                                            checked={_it?.is_blocked}
                                        />

                                    </TableCell>

                                </TableRow>
                            })}
                            {tableLoading && (usersData?.items || []).length == 0 && <TableSkeltonRow count={tableHeader?.length} />}
                        </TableBody>
                    </Table>

                    {(usersData?.items || [])?.length == 0  && tableLoading==false &&
                        <NoDataFound
                            title={t_commmon("no_records_found")}
                        />}

                </div>


            </TableWithSearchCard>

        </>
    )
}

export default UsersTable