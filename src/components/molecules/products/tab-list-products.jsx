import React, { useState } from 'react'
import Text from '../../atoms/text'
import ButtonExisting from '../../atoms/button-existing'
import ButtonEdit from '../../atoms/button-edit'
import GeneralModal from '../modal-general'

function TabListProducts() {
    const [open, setOpen] = useState(false);
    
    return (
        <div>
            <div className='grid grid-cols-8 py-4'>
                <Text>ردیف</Text>
                <Text className={`col-span-2 mr-3`}>محصول</Text>
                <Text>دسته بندی</Text>
                <Text>تاریخ و ساعت</Text>
            </div>

            <div className='grid gap-2'>
                <div className='grid grid-cols-8 items-center border border-grayTitle rounded-2xl p-4'>
                    <div>1</div>
                    <div className=' col-span-2 flex items-center gap-6'>
                        <img src="" className='w-16 h-16 border border-grayTitle rounded-lg' alt="" />
                        <div className='grid gap-2'>
                            <Text>ساندویچ</Text>
                            <Text>۲۰۰,۰۰۰ تومان</Text>
                        </div>
                    </div>
                    <div>
                        <Text>برگر , ساندویچ , ...</Text>
                    </div>
                    <div>
                        <Text>۱۴۰۳ / ۱۲ / ۰۴   ۲۰ : ۰۰</Text>
                    </div>
                    <div className=' col-span-2 flex justify-end gap-4'>
                        <ButtonExisting>موجود</ButtonExisting>
                        <ButtonEdit>ویرایش</ButtonEdit>
                    </div>
                    <div className=' text-center'>
                        <button onClick={() => setOpen(true)}>
                            <Text className={`text-red-500`}>حذف</Text>
                        </button>
                    </div>

                </div>

                <div className='grid grid-cols-8 items-center border border-grayTitle rounded-2xl p-4'>
                    <div>1</div>
                    <div className=' col-span-2 flex items-center gap-6'>
                        <img src="" className='w-16 h-16 border border-grayTitle rounded-lg' alt="" />
                        <div className='grid gap-2'>
                            <Text>ساندویچ</Text>
                            <Text>۲۰۰,۰۰۰ تومان</Text>
                        </div>
                    </div>
                    <div>
                        <Text>برگر , ساندویچ , ...</Text>
                    </div>
                    <div>
                        <Text>۱۴۰۳ / ۱۲ / ۰۴   ۲۰ : ۰۰</Text>
                    </div>
                    <div className=' col-span-2 flex justify-end gap-4'>
                        <ButtonExisting>موجود</ButtonExisting>
                        <ButtonEdit>ویرایش</ButtonEdit>
                    </div>
                    <div className=' text-center'>
                        <Text className={`text-red-500`}>حذف</Text>
                    </div>

                </div>
            </div>
            <GeneralModal
                open={open}
                handleClose={() => setOpen(false)}
                title="آیا می یخواهید این محصول را حذف کنید ؟"
                // content="این یک مودال عمومی است که در تمام بخش‌ها می‌توان از آن استفاده کرد."
                actionText="بله"
                actionHandler={() => { setOpen(false); }}
            />
        </div>
    )
}

export default TabListProducts
