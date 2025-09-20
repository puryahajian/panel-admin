import React from 'react'

function InputNumberic({className, placeholder,onChange,value,defaultValue, type, min}) {
    return (
        <input 
            min={min} 
            placeholder={placeholder} 
            defaultValue={defaultValue} 
            onChange={onChange} 
            inputMode='numeric'
            value={value} 
            className={`!bg-bgInput text-left font-sans py-3 px-2 text-sm rounded-lg outline-none placeholder:text-gray-400 ${className}`} 
            type={type} 
        />
    )
}

export default InputNumberic
