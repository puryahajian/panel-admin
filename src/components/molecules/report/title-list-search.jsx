import React from 'react'
import Text from '../../atoms/text'

function TitleListSearch() {
    return (
        <div className='grid grid-cols-5 gap-4 p-3 bg-gray-100 border-b'>
            <div className='border-l border-grayText'><Text>ردیف</Text></div>
            <div className='border-l border-grayText'><Text>نام پزشک</Text></div>
            <div className='border-l border-grayText'><Text>مبلغ درخواستی</Text></div>
            <div className='border-l border-grayText'><Text>تاریخ</Text></div>
            <div><Text>وضعیت</Text></div>
        </div>
    )
}

export default TitleListSearch
