import React from "react";
import Pagination from "./Pagination";

interface TableWithSearchCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
  btnRight?: any;
  searchBtn?: any;
  isPagination: boolean;
  paginationData?: any
}

const TableWithSearchCard: React.FC<TableWithSearchCardProps> = ({

  children,
  className = "",
  desc = "",
  btnRight,
  searchBtn,
  paginationData,
  isPagination,
}) => {
  // console.log('_paginationData', paginationData)
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      <div className="flex items-center px-6 py-5">
        <div className="flex-1">
          {searchBtn && searchBtn()}
          {desc && (
            <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
          )}
        </div>
        <div className="ml-4">
          {btnRight && btnRight()}
        </div>
      </div>


      {/* Card Body */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">


              {children}
            </div>
          </div>
        </div>

        {isPagination && paginationData?.total > 1 &&
          <div className="pt-4 flex justify-end">
            <Pagination
              {...paginationData}
              currentPage={paginationData?.page}
              totalPages={paginationData?.total}
              onPageChange={paginationData?.onPageChange}
            />
          </div>

        }
      </div>
    </div>
  );
};

export default TableWithSearchCard;
