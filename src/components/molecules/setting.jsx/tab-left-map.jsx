import React from 'react'
import Text from '../../atoms/text'
import Uploader from '../uploader'

function TabLeftMap() {
    return (
        <div>
            <Text>تصویر جواز فروشگاه</Text>

            <Uploader
                className={`mt-2`}
                textOne={`تصویر جواز فروشگاه`}
                textTwo={`سایز تصویر شما نباید از ۲۰۰ کیلو بایت بیشتر باشه`}
            />

            <Text className={`mt-4`}>موقعیت مکانی</Text>
            
            <div className='border border-black mt-2'>
                1
            </div>
        </div>
    )
}

export default TabLeftMap
