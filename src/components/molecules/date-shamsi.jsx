import React from 'react';
import moment from 'jalali-moment';

function DateShamsi({ children }) {
  const shamsiDate = moment(children, 'YYYY-MM-DDTHH:mm:ss')
    .locale('fa')
    .format('jYYYY/jMM/jDD');

  return <span>{shamsiDate}</span>;
}

export default DateShamsi;
