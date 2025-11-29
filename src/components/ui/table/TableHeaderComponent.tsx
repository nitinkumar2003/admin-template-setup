import React, { FC } from 'react'
import { TableCell, TableHeader, TableRow } from '.'
import { TableHeaderType } from '@/constant/constant_types'

interface TableHeaderComponentProps {
    tableHeader?: TableHeaderType[],
    t_commmon: any
}
const TableHeaderComponent: FC<TableHeaderComponentProps> = ({ tableHeader, t_commmon }) => {
    return (
        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
                {/* @@ header */}
                {tableHeader?.map((item: any, index) => {
                    return <TableCell key={index + item.label} isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400" >
                        {t_commmon(item.label)}
                    </TableCell>
                })}

            </TableRow>
        </TableHeader>
    )
}

export default TableHeaderComponent