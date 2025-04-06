import React from 'react'
import { Link } from 'react-router-dom'

function ButtonGeneral({children, className, onClick, to, classLink}) {
  return (
    <Link className={classLink} to={to}>
      <button onClick={onClick} className={`px-7 py-3 border border-black rounded-lg text-sm font-sans text-grayText ${className}`}>
        {children}
      </button>
    </Link>
  )
}

export default ButtonGeneral
