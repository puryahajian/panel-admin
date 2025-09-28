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
            className={`bg-bgInput font-sans py-3 px-2 text-sm max-[680px]:text-[16px] rounded-lg outline-none placeholder:text-[12px] max-[680px]:placeholder:text-[16px] placeholder:text-gray-400 ${className}`} 
            type={type} 
        />
    )
}

export default Input
