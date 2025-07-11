import React from 'react'
import TextBold from '../../atoms/text-bold'
import Text from '../../atoms/text'
import Input from '../../atoms/input'
import ButtonGeneral from '../../atoms/button-general'

function TabSetting() {
    return (
        <div>
            <div className='flex justify-between my-6'>
                <div className='grid gap-2'>
                    <Text className={`text-base !text-black !font-bold`}>ساعت کاری فروشگاه</Text>
                    <Text>ساعت کاری فروشگاه را وارد کنید تا کاربران از ساعت باز بودن فروشگاه اطلاع پیدا کنند</Text>
                </div>
                <div className='flex gap-10'>
                    <div className='flex gap-4 items-center'>
                        <Text>از ساعت</Text>
                        <Input type={`number`}/>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <Text>تا ساعت</Text>
                        <Input type={`number`}/>
                    </div>
                </div>
            </div>

            <hr className='w-[95%] m-auto'/>

            <div className='mt-6 flex justify-end gap-4'>
                <ButtonGeneral className={`!px-16 bg-customBlue text-white border-customBlue`}>ثبت و اعمال</ButtonGeneral>
                <ButtonGeneral className={`!px-16 border-red-500 text-red-500`}>انصراف</ButtonGeneral>
            </div>
        </div>
    )
}

export default TabSetting
