import React from 'react'

function Input({className, placeholder,onChange,value,defaultValue, type, min, inputMode}) {
    return (
        <input 
            min={min} 
            placeholder={placeholder} 
            defaultValue={defaultValue} 
            onChange={onChange} 
            inputMode={inputMode}
            value={value} 
            className={`bg-bgInput font-sans py-3 px-2 text-sm rounded-lg outline-none placeholder:text-[12px] placeholder:text-gray-400 ${className}`} 
            type={type} 
        />
    )
}

export default Input
