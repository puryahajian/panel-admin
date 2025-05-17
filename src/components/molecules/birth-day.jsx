// components/atoms/BirthDateInput.jsx
import React from "react";
import jalaali from "jalaali-js";
import Input from "../atoms/input";

function BirthDate({ value, onChange, onGregorianChange }) {

    const persianToEnglishDigits = (str) =>
        str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

    const handleChange = (e) => {
        const persianDate = persianToEnglishDigits(e.target.value);
        onChange(persianDate);

        const [jy, jm, jd] = persianDate.split("-").map(Number);
        if (jy && jm && jd) {
        const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);
        const formattedGregorian = `${gy}-${String(gm).padStart(2, "0")}-${String(gd).padStart(2, "0")}`;
        onGregorianChange(formattedGregorian);
        } else {
        onGregorianChange("");
        }
    };

    return (
        <Input
        value={value}
        onChange={handleChange}
        className={`w-full text-left`}
        placeholder={`۰۱ - ۰۱ - ۱۴۰۰`}
        />
    );
}

export default BirthDate;
