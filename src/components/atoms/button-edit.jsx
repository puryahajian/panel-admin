import React from 'react'

function ButtonEdit({children, className}) {
    return (
        <button className={`bg-white border border-black h-max rounded-lg font-sans text-sm text-black px-5 py-2 ${className}`}>
            {children}
        </button>
    )
}

export default ButtonEdit
