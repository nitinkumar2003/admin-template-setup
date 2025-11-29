import React from "react";

interface NoDataFoundProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

const NoDataFound: React.FC<NoDataFoundProps> = ({
  title,
  description,
  icon,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center   px-5 py-10 text-center  ${className}`}
    >
      {/* Optional Icon */}
      {icon && (
        <div className="mb-4 text-gray-400 dark:text-gray-500">
          {icon}
        </div>
      )}

      {/* Title */}
      <h3 className="mb-2 font-semibold text-gray-800 text-lg dark:text-white/90 sm:text-xl">
        {title}
      </h3>

      {/* Description */}
      <p className="max-w-md text-sm text-gray-500 dark:text-gray-400 sm:text-base">
        {description}
      </p>
    </div>
  );
};

export default NoDataFound;
