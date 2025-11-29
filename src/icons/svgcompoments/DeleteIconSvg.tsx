import React, { FC } from 'react'
interface DeleteSvgProps{
    onClick?:any
}
const DeleteIconSvg:FC<DeleteSvgProps> = ({onClick}) => {
  return (
    <svg
    onClick={()=>{
      if(onClick){
        onClick()
      }
    }}
      className="fill-current cursor-pointer"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.75 2.25C6.75 1.83579 7.08579 1.5 7.5 1.5H10.5C10.9142 1.5 11.25 1.83579 11.25 2.25V3H14.25C14.6642 3 15 3.33579 15 3.75C15 4.16421 14.6642 4.5 14.25 4.5H3.75C3.33579 4.5 3 4.16421 3 3.75C3 3.33579 3.33579 3 3.75 3H6.75V2.25ZM4.125 5.25H13.875L13.2578 14.0492C13.1798 15.1328 12.2637 15.975 11.1779 15.975H6.82211C5.73628 15.975 4.82024 15.1328 4.74217 14.0492L4.125 5.25ZM7.5 7.5C7.91421 7.5 8.25 7.83579 8.25 8.25V12.75C8.25 13.1642 7.91421 13.5 7.5 13.5C7.08579 13.5 6.75 13.1642 6.75 12.75V8.25C6.75 7.83579 7.08579 7.5 7.5 7.5ZM10.5 7.5C10.9142 7.5 11.25 7.83579 11.25 8.25V12.75C11.25 13.1642 10.9142 13.5 10.5 13.5C10.0858 13.5 9.75 13.1642 9.75 12.75V8.25C9.75 7.83579 10.0858 7.5 10.5 7.5Z"
        fill=""
      />
    </svg>
  )
}

export default DeleteIconSvg