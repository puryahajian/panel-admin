import React, { useState } from 'react'
import Text from '../../atoms/text'
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

function InputDate({textCalender, placeholder, className}) {
    const [date, setDate] = useState(null);

    return (
        <div className='flex items-center gap-2'>
            <Text>{textCalender}</Text>
            <DatePicker
                value={date}
                onChange={setDate}
                calendar={persian}
                locale={persian_fa}
                placeholder={placeholder}
                inputClass={`text-center flex justify-center rounded !bg-bgInput !w-max p-1 ${className}`}
                // className='text-center flex justify-center rounded !bg-bgInput'
                // placeholder="تاریخ را انتخاب کنید"
            />
            {/* <input type="date" datatype='fa-IR' className='px-1 rounded bg-bgInput' name="" id="" /> */}
        </div>
    )
}

export default InputDate
