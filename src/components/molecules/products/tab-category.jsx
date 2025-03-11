import React, { useState } from 'react'
import ButtonEdit from '../../atoms/button-edit'
import Text from '../../atoms/text'
import GeneralModal from '../modal-general';

function TabCategory() {
    const [open, setOpen] = useState(false);
    
    return (
        <div className='grid grid-cols-8 pt-4 gap-3'>
            <div className='border border-grayTitle text-center grid gap-4 p-4 rounded-2xl'>
                <img src="" className='border border-grayTitle w-full h-24 rounded-xl' alt="" />

                <Text className={`!font-bold`}>ساندویچ</Text>

                <ButtonEdit>ویرایش</ButtonEdit>

                <button onClick={() => setOpen(true)}>
                    <Text className={`text-red-500`}>حذف</Text>
                </button>
            </div>
            <div className='border border-grayTitle text-center grid gap-4 p-4 rounded-2xl'>
                <img src="" className='border border-grayTitle w-full h-24 rounded-xl' alt="" />

                <Text className={`!font-bold`}>ساندویچ</Text>

                <ButtonEdit>ویرایش</ButtonEdit>

                <Text className={`text-red-500`}>حذف</Text>
            </div>            
            <div className='border border-grayTitle text-center grid gap-4 p-4 rounded-2xl'>
                <img src="" className='border border-grayTitle w-full h-24 rounded-xl' alt="" />

                <Text className={`!font-bold`}>ساندویچ</Text>

                <ButtonEdit>ویرایش</ButtonEdit>

                <Text className={`text-red-500`}>حذف</Text>
            </div>            
            <div className='border border-grayTitle text-center grid gap-4 p-4 rounded-2xl'>
                <img src="" className='border border-grayTitle w-full h-24 rounded-xl' alt="" />

                <Text className={`!font-bold`}>ساندویچ</Text>

                <ButtonEdit>ویرایش</ButtonEdit>

                <Text className={`text-red-500`}>حذف</Text>
            </div>            
            <div className='border border-grayTitle text-center grid gap-4 p-4 rounded-2xl'>
                <img src="" className='border border-grayTitle w-full h-24 rounded-xl' alt="" />

                <Text className={`!font-bold`}>ساندویچ</Text>

                <ButtonEdit>ویرایش</ButtonEdit>

                <Text className={`text-red-500`}>حذف</Text>
            </div>            
            <div className='border border-grayTitle text-center grid gap-4 p-4 rounded-2xl'>
                <img src="" className='border border-grayTitle w-full h-24 rounded-xl' alt="" />

                <Text className={`!font-bold`}>ساندویچ</Text>

                <ButtonEdit>ویرایش</ButtonEdit>

                <Text className={`text-red-500`}>حذف</Text>
            </div>            
            <div className='border border-grayTitle text-center grid gap-4 p-4 rounded-2xl'>
                <img src="" className='border border-grayTitle w-full h-24 rounded-xl' alt="" />

                <Text className={`!font-bold`}>ساندویچ</Text>

                <ButtonEdit>ویرایش</ButtonEdit>

                <Text className={`text-red-500`}>حذف</Text>
            </div>            
            <div className='border border-grayTitle text-center grid gap-4 p-4 rounded-2xl'>
                <img src="" className='border border-grayTitle w-full h-24 rounded-xl' alt="" />

                <Text className={`!font-bold`}>ساندویچ</Text>

                <ButtonEdit>ویرایش</ButtonEdit>

                <Text className={`text-red-500`}>حذف</Text>
            </div>
            <GeneralModal
                open={open}
                handleClose={() => setOpen(false)}
                title="آیا می یخواهید این دسته بندی را حذف کنید ؟"
                // content="این یک مودال عمومی است که در تمام بخش‌ها می‌توان از آن استفاده کرد."
                actionText="بله"
                actionHandler={() => { setOpen(false); }}
            />
        </div>
    )
}

export default TabCategory
