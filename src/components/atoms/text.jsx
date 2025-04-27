import React from 'react'

function Text({children, className, dangerouslySetInnerHTML}) {
    return (
        <p dangerouslySetInnerHTML={dangerouslySetInnerHTML} className={`text-sm font-sans text-grayText ${className}`}>{children}</p>
    )
}

export default Text
