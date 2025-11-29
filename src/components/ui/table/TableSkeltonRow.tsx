import React, { FC } from 'react'
import { TableCell, TableRow } from '.'

interface TableSkeltonRowProps {
  count: number
}

const TableSkeltonRow: FC<TableSkeltonRowProps> = ({ count }) => {
  return (
    <>
      {Array.from({ length: 2 }).map((_, i) => (
        <TableRow key={`table_skeleton_${i}`}>
          {Array.from({ length: count }).map((_, j) => (
            <TableCell   key={`table_skeleton_cell_${j}`}className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
              </div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}

export default TableSkeltonRow
