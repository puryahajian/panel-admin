// components/atoms/BirthDateInput.jsx
import React from "react";
import "../../App.css";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

function BirthDate({ value, onChange, onGregorianChange, inputClass }) {
    const handleChange = (dateObject) => {
      
        // تاریخ شمسی به فرمت YYYY-MM-DD
        const shamsiDate = dateObject.format("YYYY-MM-DD");
        onChange(shamsiDate);

        // تبدیل به تاریخ میلادی
        const gregorianDate = dateObject.toDate();
        const formattedGregorian = gregorianDate.toISOString().split("T")[0];
        onGregorianChange(formattedGregorian);
    };

    return (
        <DatePicker
            value={value}
            onChange={handleChange}
            calendar={persian}
            locale={persian_fa}
            format="YYYY-MM-DD"
            placeholder="تاریخ را انتخاب کنید"
            className=""
            inputClass={`text-center text-lg placeholder:font-sans flex justify-center h-[43px] rounded w-full !bg-bgInput p-1 ${inputClass}`}
        />
    );
}

export default BirthDate;
