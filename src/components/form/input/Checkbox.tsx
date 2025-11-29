import React, { forwardRef, ForwardedRef } from "react";
import clsx from "clsx";

export interface CheckboxProps {
  /** Label text shown next to checkbox */
  label?: string;
  /** Controlled checked state (for non-RHF use) */
  checked?: boolean;
  /** HTML id for accessibility */
  id?: string;
  /** onChange handler for controlled use */
  onChange?: (checked: boolean) => void;
  /** Optional custom class */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Whether to integrate with React Hook Form (Yup) */
  isYop?: boolean;
  /** Optional error state for styling */
  error?: boolean;
  /** Optional hint below */
  hint?: string;
}

/**
 * Reusable Checkbox component
 * Supports both normal usage and React Hook Form (`isYop`)
 */
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      checked,
      id,
      onChange,
      className = "",
      disabled = false,
      isYop = false,
      error = false,
      hint,
      ...rest
    },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const inputClasses = clsx(
      "w-5 h-5 appearance-none cursor-pointer border rounded-md checked:border-transparent checked:bg-brand-500 dark:border-gray-700 border-gray-300 transition-colors",
      {
        "cursor-not-allowed opacity-60": disabled,
        "border-error-500 focus:ring-error-500/20": error,
      },
      className
    );

    const hintClasses = clsx("text-xs mt-1.5", {
      "text-error-500": error,
      "text-gray-500 dark:text-gray-400": !error,
    });

    return (
      <div>
        <label
          className={clsx(
            "flex items-center space-x-3 group",
            disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
          )}
        >
          <div className="relative w-5 h-5">
            {/* ✅ React Hook Form compatible */}
            <input
              ref={isYop ? ref : undefined}
              id={id}
              type="checkbox"
              className={inputClasses}
              checked={isYop ? undefined : checked}
              onChange={
                isYop
                  ? undefined
                  : (e) => onChange && onChange(e.target.checked)
              }
              disabled={disabled}
              {...rest}
            />

            {/* Custom checkmark icon */}
            {checked && !isYop && (
              <svg
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                  stroke="white"
                  strokeWidth="1.94437"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>

          {label && (
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {label}
            </span>
          )}
        </label>

        {hint && <p className={hintClasses}>{hint}</p>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
export default Checkbox;
