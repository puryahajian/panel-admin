import React, { useState } from 'react'
import Text from '../../atoms/text'
import ButtonGeneral from '../../atoms/button-general'
import GeneralModal from '../modal-general';
import Uploader from '../uploader';
import Input from '../../atoms/input';

function Visit() {
    const [openVisit, setOpenVisit] = useState(false);
    const [openFinishVisit, setFinishVisit] = useState(false);
    
    return (
        <div>
            <Text>نسخه ها</Text>

            <div className='flex py-4 bg-gray-100 rounded-lg px-2 mt-2'>
                <div className='w-4/5 grid grid-cols-7'>
                    <Text>ردیف</Text>
                    <Text className={`col-span-2 border-r border-gray-500 pr-2`}>نام</Text>
                    <Text className={`border-r border-gray-500 pr-2`}>تاریخ و ساعت</Text>
                </div>
            </div>

            <div className='flex py-4 bg-gray-100 rounded-lg px-2 mt-2 items-center'>
                <div className='w-3/4 grid grid-cols-6'>
                    <Text>1</Text>
                    <Text className={`col-span-2`}>lorem ipsum</Text>
                    <Text>123456</Text>
                </div>
                <div className='w-4/12 text-left flex justify-end gap-2'>
                    <ButtonGeneral onClick={() => setFinishVisit(true)} className={`!py-2 bg-red-500 border-transparent text-white`}>
                        پایان ویزیت
                    </ButtonGeneral>
                    <ButtonGeneral onClick={() => setOpenVisit(true)} className={`!py-2 bg-customBlue border-transparent text-white`}>
                        ارسال نسخه
                    </ButtonGeneral>
                </div>
            </div>

            {/* modal sent visit */}
            <GeneralModal
                open={openVisit}
                handleClose={() => setOpenVisit(false)}
                // title="آیا می یخواهید این دسته بندی را حذف کنید ؟"
                actionText="ارسال"
                actionHandler={() => { setOpenVisit(false); }}
            >
                <div className=' text-right'>
                    <Uploader
                        textOne={`محتوا مورد نظر را انتخاب کنید`}
                        textTwo={`سایز محتوا شما نباید از ۲۰۰ کیلو بایت بیشتر باشه`}
                    />

                    <Text className={`mt-4 mb-2`}>توضیحات</Text>
                    {/* <Input className={`w-full`} placeholder={`توضیحات خود را بنویسید`}/> */}
                    <textarea 
                        // value={description} 
                        // onChange={(e) => setDescription(e.target.value)} 
                        className='bg-bgInput placeholder:text-black text-sm resize-none w-full border !border-Custom rounded outline-none p-2' 
                    />
                </div>
            </GeneralModal>

            {/* modal finish visit */}
            <GeneralModal
                open={openFinishVisit}
                handleClose={() => setFinishVisit(false)}
                title="آیا ویزیت بیمار به پایان رسیده؟"
                actionText="بله"
                actionHandler={() => { setFinishVisit(false); }}
            />
        </div>
    )
}

export default Visit
