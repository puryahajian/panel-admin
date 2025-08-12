import React from 'react'

function ConvertToJalali({converter}) {
        // نیاز به نصب jalali-moment: npm install jalali-moment
    const moment = require('jalali-moment');

    // تاریخ میلادی با تایم‌زون
    const gregorianDate = moment(converter, 'YYYY-MM-DDTHH:mm:ss.SSSZ');

    // تبدیل به تاریخ شمسی
    gregorianDate.locale('fa'); // تنظیم زبان به فارسی برای نام ماه‌ها
    const jalaliDate = gregorianDate.format('jD jMMMM jYYYY');

    // نمایش نتیجه
    // console.log(jalaliDate);
    // return (jalaliDate)
}

export default ConvertToJalali
