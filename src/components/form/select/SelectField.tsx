import React, { forwardRef, ForwardedRef } from "react";
import clsx from "clsx";
import { ChevronDownIcon } from "@/icons";

export interface Option {
    value: string;
    label: string;
}

export interface SelectProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: Option[];
    /** Hint or helper text below the field */
    hint?: string;
    /** Error state */
    error?: boolean;
    /** Success state */
    success?: boolean;
    /** Works with React Hook Form if true */
    isYop?: boolean;
    placeholder?: any
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    (
        {
            id,
            name,
            options,
            placeholder = "Select an option",
            className,
            hint,
            error = false,
            success = false,
            disabled = false,
            isYop = false,
            value,
            defaultValue,
            onChange,
            onBlur,
            ...rest
        },
        ref: ForwardedRef<HTMLSelectElement>
    ) => {
        const selectClasses = clsx(
            "h-11 w-full rounded-lg border appearance-none px-4 py-2.5 pr-11 text-sm shadow-theme-xs transition-colors focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800",
            {
                // Normal
                "bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90":
                    !error && !success && !disabled,

                // Disabled
                "text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700":
                    disabled,

                // Error
                "text-error-800 border-error-500 focus:ring-error-500/10 dark:text-error-400 dark:border-error-500":
                    error,

                // Success
                "text-success-500 border-success-400 focus:ring-success-500/10 dark:text-success-400 dark:border-success-500":
                    success,
            },
            className
        );

        const hintClasses = clsx("mt-1.5 text-xs", {
            "text-error-500": error,
            "text-success-500": success,
            "text-gray-500": !error && !success,
        });

        const hintId = hint ? `${id || name}-hint` : undefined;

        return (
            <div className="relative">
                <select
                    ref={isYop ? ref : undefined}
                    id={id}
                    name={name}
                    className={selectClasses}
                    disabled={disabled}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={hintId}
                    value={isYop ? undefined : value}
                    defaultValue={isYop ? undefined : defaultValue}
                    onChange={isYop ? undefined : onChange}
                    onBlur={isYop ? undefined : onBlur}
                    {...rest}
                >
                    {placeholder && (
                        <option value="" disabled className="text-gray-400 dark:text-gray-400">
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            className="text-gray-800 dark:bg-gray-900 dark:text-white/90"
                        >
                            {option.label}
                        </option>
                    ))}
                </select>

                {/* Chevron Icon */}
                <span className="absolute pointer-events-none right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    <ChevronDownIcon />
                </span>

                {hint && (
                    <p id={hintId} className={hintClasses}>
                        {hint}
                    </p>
                )}
            </div>
        );
    }
);

Select.displayName = "Select";
export default Select;
