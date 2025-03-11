import React, { useState } from 'react'
import Text from '../../atoms/text'
import ButtonEdit from '../../atoms/button-edit'
import GeneralModal from '../modal-general';

function TabCouriers() {
    const [openModal, setOpenModal] = useState(false);
    
    return (
        <div>
            <div className='grid grid-cols-12 py-4'>
                <Text>ردیف</Text>
                <Text className={`col-span-2 mr-2`}>نام</Text>
                <Text className={`col-span-2 mr-2`}> شماره تماس</Text>
                <Text>آدرس</Text>
            </div>

            <div className='grid gap-2'>
                <div className='grid grid-cols-12 items-center border border-grayTitle rounded-2xl p-4'>
                    <div>1</div>
                    <div className=' col-span-2 flex items-center gap-6'>
                        <Text>علی حاجیان نجات</Text>
                    </div>
                    <div className='col-span-2'>
                        <Text>۰۹۳۶۲۲۹۲۵۶۸</Text>
                    </div>
                    <div className='col-span-4'>
                        <Text>ساری , میدان امام , خیابان آزادی , آزادی نهم</Text>
                    </div>
                    <div className=' col-span-2 flex justify-end gap-4'>
                        <ButtonEdit>ویرایش</ButtonEdit>
                    </div>
                    <div className=' text-center'>
                        <button onClick={() => setOpenModal(true)}>
                            <Text className={`text-red-500`}>حذف</Text>
                        </button>
                    </div>
                </div>

                <div className='grid grid-cols-12 items-center border border-grayTitle rounded-2xl p-4'>
                    <div>1</div>
                    <div className=' col-span-2 flex items-center gap-6'>
                        <Text>علی حاجیان نجات</Text>
                    </div>
                    <div className='col-span-2'>
                        <Text>۰۹۳۶۲۲۹۲۵۶۸</Text>
                    </div>
                    <div className='col-span-4'>
                        <Text>ساری , میدان امام , خیابان آزادی , آزادی نهم</Text>
                    </div>
                    <div className=' col-span-2 flex justify-end gap-4'>
                        <ButtonEdit>ویرایش</ButtonEdit>
                    </div>
                    <div className=' text-center'>
                        <Text className={`text-red-500`}>حذف</Text>
                    </div>
                </div>
            </div>
            <GeneralModal
                open={openModal}
                handleClose={() => setOpenModal(false)}
                title="آیا می خواهید این پیک را حذف کنید؟"
                actionText="بله"
                actionHandler={() => { setOpenModal(false); }}
            />
        </div>
    )
}

export default TabCouriers
