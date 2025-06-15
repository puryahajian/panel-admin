import React from 'react';

function DateShamsi({ date, hour, minute }) {
    if (!date) return null;

    const shamsiDate = new Date(date);
    const formatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: hour,
        minute: minute,
        // hour: '2-digit',
        // minute: '2-digit',
    });

    const [year, month, day] = formatter.format(shamsiDate).split('/').map(num => num.trim());
    const formattedDate = `${year}${month}${day}`;

    return <span>{formattedDate}</span>;
}

export default DateShamsi;
