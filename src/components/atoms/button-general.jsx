import React from 'react'

function ButtonGeneral({children, className, onClick, onSubmit}) {
  return (
    <button onClick={onClick} onSubmit={onSubmit} type='submit' className={`px-7 py-3 border border-black rounded-lg text-sm font-sans text-grayText ${className}`}>
      {children}
    </button>
  )
}

export default ButtonGeneral
