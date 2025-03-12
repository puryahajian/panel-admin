import React from 'react'
import Text from '../atoms/text'

function RequestVisit() {
    return (
        <div>
            <Text>درخواست ها</Text>

            <div className='grid grid-cols-8 py-4 bg-gray-100 rounded-lg px-2 mt-2'>
                <Text>ردیف</Text>
                <Text className={`col-span-2 mr-3`}>محصول</Text>
                <Text>دسته بندی</Text>
                <Text>تاریخ و ساعت</Text>
            </div>
        </div>
    )
}

export default RequestVisit
