import React from 'react'

function Text({children, className, onClick}) {
    return (
        <p onClick={onClick} className={`text-sm font-sans text-grayText ${className}`}>{children}</p>
    )
}

export default Text
