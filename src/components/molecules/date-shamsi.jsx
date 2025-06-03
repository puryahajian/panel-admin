import React from 'react';

function DateShamsi({ date, hour, minute }) {
    if (!date) return null;

    const shamsiDate = new Date(date).toLocaleString('fa-IR-u-ca-persian', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: hour,
        minute: minute,
        // hour: '2-digit',
        // minute: '2-digit',
    });

    return <span>{shamsiDate}</span>;
}
export default DateShamsi;
