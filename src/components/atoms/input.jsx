import React from 'react'

function Input({className, placeholder,onChange,value,defaultValue, type, min}) {
    return (
        <input min={min} placeholder={placeholder} defaultValue={defaultValue} onChange={onChange} value={value} className={`bg-bgInput py-3 px-2 text-sm rounded-md outline-none placeholder:text-gray-400 ${className}`} type={type} />
    )
}

export default Input
