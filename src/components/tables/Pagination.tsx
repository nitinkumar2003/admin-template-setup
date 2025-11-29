import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Generate visible pages near current
  const pagesAroundCurrent = Array.from(
    { length: Math.min(3, totalPages) },
    (_, i) => i + Math.max(currentPage - 1, 1)
  ).filter((page) => page <= totalPages);

  return (
    <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 w-full">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center h-9 sm:h-10 rounded-md sm:rounded-lg border border-gray-300 bg-white px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 text-gray-700 shadow-sm text-xs sm:text-sm hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
      >
        Prev
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1 sm:gap-2">
        {currentPage > 3 && (
          <span className="px-1 sm:px-2 text-xs sm:text-sm">...</span>
        )}

        {pagesAroundCurrent.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 sm:w-10 h-8 sm:h-10 text-xs sm:text-sm font-medium rounded-md sm:rounded-lg flex items-center justify-center transition-all duration-200 ${
              currentPage === page
                ? "bg-brand-500 text-white"
                : "text-gray-700 dark:text-gray-400 hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500"
            }`}
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages - 2 && (
          <span className="px-1 sm:px-2 text-xs sm:text-sm">...</span>
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center h-9 sm:h-10 rounded-md sm:rounded-lg border border-gray-300 bg-white px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 text-gray-700 shadow-sm text-xs sm:text-sm hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
