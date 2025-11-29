"use client";
import React, { useState } from "react";

interface ToggleSwitchProps {
  label?: string;
  checked?: boolean; // Controlled prop
  defaultChecked?: boolean; // Uncontrolled fallback
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  color?: "blue" | "gray";
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label = "",
  checked,
  defaultChecked = false,
  disabled = false,
  onChange,
  color = "blue",
}) => {
  // Internal state for uncontrolled mode
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  // Use controlled value if provided, else internal state
  const isChecked = checked !== undefined ? checked : internalChecked;

  // Handle toggle click
  const handleToggle = () => {
    if (disabled) return;
    const newChecked = !isChecked;

    // Update internal state only if uncontrolled
    if (checked === undefined) {
      setInternalChecked(newChecked);
    }

    // Fire external handler
    if (onChange) {
      onChange(newChecked);
    }
  };

  // Define colors dynamically
  const switchColors =
    color === "blue"
      ? {
          background: isChecked
            ? "bg-brand-500"
            : "bg-gray-200 dark:bg-white/10",
          knob: isChecked
            ? "translate-x-full bg-white"
            : "translate-x-0 bg-white",
        }
      : {
          background: isChecked
            ? "bg-gray-800 dark:bg-white/10"
            : "bg-gray-200 dark:bg-white/10",
          knob: isChecked
            ? "translate-x-full bg-white"
            : "translate-x-0 bg-white",
        };

  return (
    <label
      className={`flex cursor-pointer select-none items-center gap-3 text-sm font-medium ${
        disabled ? "text-gray-400" : "text-gray-700 dark:text-gray-400"
      }`}
      onClick={handleToggle}
    >
      <div className="relative">
        <div
          className={`block h-6 w-11 rounded-full transition duration-150 ease-linear ${
            disabled
              ? "bg-gray-100 pointer-events-none dark:bg-gray-800"
              : switchColors.background
          }`}
        ></div>
        <div
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full shadow-theme-sm transform duration-150 ease-linear ${switchColors.knob}`}
        ></div>
      </div>
      {label}
    </label>
  );
};

export default ToggleSwitch;
