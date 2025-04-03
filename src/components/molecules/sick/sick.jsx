import React, { useState } from 'react'
import Text from '../../atoms/text'
import ButtonGeneral from '../../atoms/button-general'
import GeneralModal from '../modal-general';
import UseGetNewVisit from '../../db/use-get-new-visit';

function Sick() {
    const [openSeeComment, setSeeComment] = useState(false);
    const { data } = UseGetNewVisit();
    // console.log(data)
    return (
        <div>
            <Text>بیماران</Text>

            <div className='flex py-4 bg-gray-100 rounded-lg px-2 mt-2'>
                <div className='w-2/3 grid grid-cols-6'>
                    <Text>ردیف</Text>
                    <Text className={`col-span-2 border-r border-gray-500 pr-2`}>نام</Text>
                    <Text className={`border-r border-gray-500 pr-2`}>تاریخ و ساعت</Text>
                </div>
                <div className='w-1/3 text-left'>
                    <Text className={`ml-10`}>وضعیت</Text>
                </div>
            </div>

            <div className='flex py-4 bg-gray-100 rounded-lg px-2 mt-2 items-center'>
                <div className='w-3/4 grid grid-cols-6 items-center'>
                    <Text>1</Text>
                    <Text className={`col-span-2`}>lorem ipsum</Text>
                    <Text>123456</Text>
                    <ButtonGeneral onClick={() => setSeeComment(true)} className={` border-transparent cursor-pointer`}>
                        نظرات
                    </ButtonGeneral>
                </div>
                <div className='w-4/12 text-left flex justify-end gap-2'>
                    <ButtonGeneral className={`!py-2 bg-red-500 border-transparent cursor-default text-white`}>
                        پایان ویزیت
                    </ButtonGeneral>
                    {/* <ButtonGeneral className={`!py-2 bg-yellow-400 border-transparent cursor-default text-gray-500`}>
                        منتظر تایید پزشک
                    </ButtonGeneral> */}
                </div>
            </div>

            <GeneralModal
                open={openSeeComment}
                handleClose={() => setSeeComment(false)}
                title="نظرات"
                actionText="ذخیره"
                actionHandler={() => { setSeeComment(false); }}
            >
                
            </GeneralModal>
        </div>
    )
}

export default Sick
