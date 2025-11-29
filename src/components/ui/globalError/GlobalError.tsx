import React from 'react'

type Props = { error?: string | null }

const GlobalError = ({ error }: Props) => {
  if (!error) return null

  return (
    <p id="" className="text-error-500 mt-1.5 text-xs">{error}</p>
  )
}

export default GlobalError