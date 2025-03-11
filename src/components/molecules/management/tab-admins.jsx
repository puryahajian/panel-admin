import React, { useState } from 'react'
import Text from '../../atoms/text'
import ButtonExisting from '../../atoms/button-existing'
import ButtonEdit from '../../atoms/button-edit'
import GeneralModal from '../modal-general'

function TabAdmins() {
    const [openModal, setOpenModal] = useState(false);
    
    return (
        <div className=''>
            <div className='grid grid-cols-9 py-4'>
                <Text>ردیف</Text>
                <Text className={`col-span-2`}>نام</Text>
                <Text>شماره تماس</Text>
                <Text>سطح دسترسی</Text>
                <Text>آخرین ورود</Text>
            </div>

            <div className='grid gap-2'>
                <div className='border border-grayTitle grid grid-cols-9 items-center p-4 rounded-2xl'>
                    <div>
                        <Text>1</Text>
                    </div>
                    <div className=" col-span-2">
                        <Text>لورم ایپسوم</Text>
                    </div>
                    <div>
                        <Text>09111111111</Text>
                    </div>
                    <div>
                        <Text>صندوق دار</Text>
                    </div>
                    <div>
                        <Text>۱۴۰۳ / ۱۲ / ۰۴   ۲۰ : ۰۰</Text>
                    </div>
                    <div className=" flex justify-end gap-4 col-span-2">
                        <ButtonExisting className={`!px-7`}>فعال</ButtonExisting>
                        <ButtonEdit>ویرایش</ButtonEdit>
                    </div>
                    <div className=" text-center">
                        <button onClick={() => setOpenModal(true)}>
                            <Text className={`text-red-500`}>حذف</Text>
                        </button>
                    </div>
                </div>
            </div>
            <GeneralModal
                open={openModal}
                handleClose={() => setOpenModal(false)}
                title="آیا می خواهید این ادمین را حذف کنید ؟"
                actionText="بله"
                actionHandler={() => { setOpenModal(false); }}
            />
               
        </div>
    )
}

export default TabAdmins
