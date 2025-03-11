import React from 'react'

function Title({children, className}) {
    return (
        <p className={`text-sm font-sans text-grayTitle ${className}`}>{children}</p>
    )
}

export default Title
