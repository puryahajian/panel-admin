import React from 'react';

function DateShamsi({ date, hour, minute }) {
  if (!date) return null;

  try {
    const shamsiDate = new Date(date);
    if (isNaN(shamsiDate.getTime())) {
      return <span>تاریخ نامعتبر</span>;
    }

    // تنظیم ساعت و دقیقه اگر props ارائه شده باشند
    // if (typeof hour === 'number' && typeof minute === 'number') {
    //   shamsiDate.setHours(hour, minute);
    // }

    const formatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      // hour: '2-digit',
      // minute: '2-digit',
      // hour12: false, 
    });

    // فرمت تاریخ و ساعت به‌صورت استاندارد
    const formattedDate = formatter
      .format(shamsiDate)
      .replace(/،.*$/, '') // حذف بخش اضافی (مثل "، ساعت ۱۴:۳۰" در برخی مرورگرها)
      .replace(/\//g, '/'); // اطمینان از جداکننده استاندارد

    return <span>{formattedDate}</span>;
  } catch (error) {
    console.error('خطا در پردازش تاریخ:', error);
    return <span>خطا در نمایش تاریخ</span>;
  }
}

export default DateShamsi;