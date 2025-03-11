import React from 'react'
import Text from '../../atoms/text'
import Uploader from '../uploader'
import Input from '../../atoms/input'

function TabRightDetail() {
    return (
        <div>
            <Text>لوگو سایت</Text>

            <Uploader
                className={`mt-2`}
                textOne={'تصوبر لوگو سایت'}
                textTwo={'تصویر بنر اول باید ۵۰۰ پیکسل در ۲۰۰ پیکسل باشد'}
            />

            <Text className={`mt-4`}>نام فروشگاه</Text>
            <Input placeholder={`نام فروشگاه خود را وارد کنید`} className={`w-full mt-2`}/>

            <Text className={`mt-4`}>شماره فروشگاه</Text>
            <Input placeholder={`۰۹۱۱۱۱۱۱۱۱۱`} className={`w-full mt-2 text-left`}/>

            <Text className={`mt-4`}>شماره پشتیبانی</Text>
            <Input placeholder={`۰۹۱۱۱۱۱۱۱۱۱`} className={`w-full mt-2 text-left`}/>
        </div>
    )
}

export default TabRightDetail
