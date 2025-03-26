import React from 'react'
import Text from '../../atoms/text'
import ButtonGeneral from '../../atoms/button-general'

function RequestVisit() {
    return (
        <div>
            <Text>درخواست ها</Text>

            <div className='flex py-4 bg-gray-100 rounded-lg px-2 mt-2'>
                <div className='w-4/5 grid grid-cols-6'>
                    <Text>ردیف</Text>
                    <Text className={`col-span-2 border-r border-gray-500 pr-2`}>نام</Text>
                    <Text className={`border-r border-gray-500 pr-2`}>تاریخ و ساعت</Text>
                </div>
                <div className='w-1/5 text-left'>
                    <Text className={`ml-10`}>وضعیت</Text>
                </div>
            </div>

            <div className='flex py-4 bg-gray-100 rounded-lg px-2 mt-2 items-center'>
                <div className='w-4/5 grid grid-cols-6'>
                    <Text>1</Text>
                    <Text className={`col-span-2  pr-2`}>lorem ipsum</Text>
                    <Text className={` pr-2`}>123456</Text>
                </div>
                <div className='w-1/5 text-left ml-4'>
                    <ButtonGeneral className={`!py-2 bg-customBlue text-white border-none`}>
                        وضعیت
                    </ButtonGeneral>
                </div>
            </div>
        </div>
    )
}

export default RequestVisit
