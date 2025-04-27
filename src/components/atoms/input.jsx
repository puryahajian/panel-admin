import React from 'react'

function Input({className, placeholder, value,onChange, disabled, defaultValue}) {
    return (
        <input placeholder={placeholder} defaultValue={defaultValue} disabled={disabled} onChange={onChange} value={value} className={`bg-bgInput py-3 px-2 text-sm rounded-md outline-none placeholder:text-black ${className}`} type="text" />
    )
}

export default Input
