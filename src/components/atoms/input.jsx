import React from 'react'

function Input({className, placeholder,onChange,value,defaultValue}) {
    return (
        <input placeholder={placeholder} defaultValue={defaultValue} onChange={onChange} value={value} className={`bg-bgInput py-3 px-2 text-sm rounded-md outline-none placeholder:text-gray-400 ${className}`} type="text" />
    )
}

export default Input
