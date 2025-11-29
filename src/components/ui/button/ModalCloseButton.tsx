import React, { FC } from "react";

interface ModalCloseButtonProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const ModalCloseButton: FC<ModalCloseButtonProps> = ({
  label,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled}
      className={`flex w-full justify-center rounded-lg border px-4 py-2.5 text-sm font-medium sm:w-auto
        ${
          disabled
            ? "cursor-not-allowed opacity-60 border-gray-300 bg-gray-200 text-gray-500 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-500"
            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
        }
      `}
    >
      {label || "Close"}
    </button>
  );
};

export default ModalCloseButton;
