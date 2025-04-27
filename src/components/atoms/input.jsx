import React from 'react'

function Input({className, placeholder, onChange, value, defaultValue, disabled}) {
    return (
        <input placeholder={placeholder} onChange={onChange} disabled={disabled} defaultValue={defaultValue} value={value} className={`bg-bgInput py-3 px-2 text-sm rounded-md outline-none placeholder:text-black placeholder:text-xs ${className}`} type="text" />
    )
}

export default Input
