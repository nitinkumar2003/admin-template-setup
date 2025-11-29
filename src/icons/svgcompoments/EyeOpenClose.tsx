import React from 'react'

export const EyeOpenIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeWidth="1.8"
        d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  )
}

export const EyeCloseIcon = () => {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeWidth="1.8"
      d="M3 3l18 18M2.5 12s3.5-7 9.5-7c2.3 0 4.2.8 5.7 2"
    />
    <path
      stroke="currentColor"
      strokeWidth="1.8"
      d="M21.5 12s-3.5 7-9.5 7c-2.3 0-4.2-.8-5.7-2"
    />
  </svg>
}
