import React from 'react'

function ButtonExisting({children, className}) {
    return (
        <button className={`bg-buttomExiting border border-buttomExiting h-max rounded-lg font-sans text-sm text-white px-5 py-2 ${className}`}>
            {children}
        </button>
    )
}

export default ButtonExisting
