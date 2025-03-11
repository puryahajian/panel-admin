import React from 'react'

function TextStatus({className, children}) {
    return (
        <p className={`text-sm font-sans ${className}`}>{children}</p>
    )
}

export default TextStatus
