import React from 'react'

function Text({children, className}) {
    return (
        <p className={`text-sm font-sans text-grayText ${className}`}>{children}</p>
    )
}

export default Text
