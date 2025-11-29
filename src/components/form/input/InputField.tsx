import React, {
  forwardRef,
  InputHTMLAttributes,
  ForwardedRef,
  useState,
} from "react";
import clsx from "clsx";
import { EyeCloseIcon, EyeOpenIcon } from "@/icons/svgcompoments/EyeOpenClose";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
  hint?: string;
  error?: boolean;
  success?: boolean;
  isYop?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      id,
      name,
      placeholder,
      value,
      defaultValue,
      onChange,
      onBlur,
      className,
      min,
      max,
      step,
      disabled = false,
      success = false,
      error = false,
      hint,
      isYop = false,
      ...rest
    },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    const inputClasses = clsx(
      "h-11 w-full rounded-lg border appearance-none px-4 py-2.5 pr-12 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 transition-colors",
      {
        "bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90":
          !error && !success && !disabled,
        "text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700":
          disabled,
        "text-error-800 border-error-500 focus:ring-error-500/10 dark:text-error-400 dark:border-error-500":
          error,
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
        <input
          ref={isYop ? ref : undefined}
          id={id}
          name={name}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          value={isYop ? undefined : value}
          defaultValue={isYop ? undefined : defaultValue}
          onChange={isYop ? undefined : onChange}
          onBlur={isYop ? undefined : onBlur}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          aria-invalid={error || undefined}
          aria-describedby={hintId}
          className={inputClasses}
          {...rest}
        />

        {/* Password eye toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className={`absolute inset-y-0 right-3  flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white/90 ${hint ? 'mb-4':''}`}
            tabIndex={-1}
          >
            {showPassword ? (
              // Eye Open
              <EyeOpenIcon />
            ) : (
              // Eye Closed
              <EyeCloseIcon />
            )}
          </button>
        )}

        {hint && (
          <p id={hintId} className={hintClasses}>
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
