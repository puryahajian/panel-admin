import React from 'react'
import Text from '../../atoms/text'

function TitleDiscount() {
    return (
        <div className='flex gap-4 max-[992px]:hidden mt-8 px-4'>
            <div>
                <Text>ردیف</Text>
            </div>
            <div className='grid grid-cols-11 w-full'>
                <div className=' col-span-2'>
                    <Text>نام کمپین یا تخفیف</Text>
                </div>
                <div className=' col-span-2'>
                    <Text>کد تخفیف</Text>
                </div>
                <div className=' col-span-2'>
                    <Text>تاریخ اعتبار</Text>
                </div>
                <div className=''>
                    {/* <Text>کد استفاده شده </Text> */}
                </div>
            </div>
        </div>
    )
}

export default TitleDiscount
