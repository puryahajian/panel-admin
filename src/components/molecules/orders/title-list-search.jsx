import React from 'react'
import Text from '../../atoms/text'

function TitleListSearch() {
    return (
        <div className='grid grid-cols-4 gap-4 p-3 bg-gray-100 border-b'>
            <div className='border-l border-grayText'><Text>رتبه</Text></div>
            <div className='border-l border-grayText'><Text>کلمه کلیدی</Text></div>
            <div className='border-l border-grayText'><Text>کاربران</Text></div>
            <div><Text>محدوده هفتگی</Text></div>
        </div>
    )
}

export default TitleListSearch
