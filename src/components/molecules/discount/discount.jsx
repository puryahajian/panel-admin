import React from 'react'
import ButtonGeneral from '../../atoms/button-general'
import TitleDiscount from './title-discount'
import ListDiscount from './list-discount'

function Discount() {
    return (
        <div>
            <div className='w-full justify-end flex max-[990px]:fixed max-[990px]:w-full max-[990px]:bottom-0 max-[990px]:right-0 max-[990px]:px-4 max-[990px]:py-2 max-[990px]:bg-white max-[990px]:opacity-95'>
                <ButtonGeneral className={`border border-blue-500 !text-blue-500 max-[990px]:w-full max-[990px]:bg-customBlue max-[990px]:!text-white`}>
                    افزودن کد تخفیف
                </ButtonGeneral>
            </div>
            <hr className='w-[95%] m-auto my-4 max-[990px]:hidden'/>

            <TitleDiscount/>
            
            <ListDiscount/>
        </div>
    )
}

export default Discount
