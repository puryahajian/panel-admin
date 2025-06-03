import React from 'react'
import Text from '../../atoms/text'
import Uploader from '../uploader'
import Input from '../../atoms/input'
import useGetInfo from '../../db/use-get-info';

function TabRightDetail({
    preview,
    onFileSelect,
    selectedFile,
    setPreview,
    onChangeNameShop,
    valueNameShop,
    onChangeNumberShop,
    valueNumberShop,
    onChangeNumberSupport,
    valueNumberSupport
    }) {
    const { data } = useGetInfo();

    return (
        <div>
            <Text>لوگو </Text>

            <Uploader
                className={`mt-2`}
                textOne={'تصوبر لوگو سایت'}
                // textTwo={'تصویر بنر اول باید ۵۰۰ پیکسل در ۲۰۰ پیکسل باشد'}
                preview={preview}
                onFileSelect={onFileSelect}
                selectedFile={selectedFile}
                setPreview={setPreview}
            />

            <Text className={`mt-4`}>نام فروشگاه</Text>
            <Input defaultValue={data?.name} value={valueNameShop} onChange={onChangeNameShop} placeholder={`نام فروشگاه خود را وارد کنید`} className={`w-full mt-2`}/>

            <Text className={`mt-4`}>شماره فروشگاه</Text>
            <Input defaultValue={data?.phone} value={valueNumberShop} onChange={onChangeNumberShop} placeholder={`۰۹۱۱۱۱۱۱۱۱۱`} className={`w-full mt-2 text-left`}/>

            <Text className={`mt-4`}>شماره پشتیبانی</Text>
            <Input value={valueNumberSupport} onChange={onChangeNumberSupport} placeholder={`۰۹۱۱۱۱۱۱۱۱۱`} className={`w-full mt-2 text-left`}/>
        </div>
    )
}

export default TabRightDetail
