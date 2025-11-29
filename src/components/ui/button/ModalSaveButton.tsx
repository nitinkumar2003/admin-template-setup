import React, { FC } from "react";

interface ModalSaveButtonProps {
  label: string;
  onClick?: () => void;
  loading?: boolean;
  loadingLabe?:any
}

const ModalSaveButton: FC<ModalSaveButtonProps> = ({ label, onClick, loading = false,loadingLabe='' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={`flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium text-white sm:w-auto
        ${loading ? "bg-[#1A7FC7] cursor-not-allowed" : "bg-[#1A7FC7] hover:bg-[#1A7FC7]"}
      `}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg
            className="h-4 w-4 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          {loadingLabe || label}
        </span>
      ) : (
        label
      )}
    </button>
  );
};

export default ModalSaveButton;
