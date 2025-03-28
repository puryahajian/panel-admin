import React, { useState } from 'react';
import Text from '../../atoms/text';
import Uploader from '../uploader';
import Input from '../../atoms/input';

function TabRightDetail({
    selectedFile,
    onFileSelect,
    nameProduct,
    setNameProduct,
    numberPhoneShop,
    setNumberPhoneShop,
    nationalCode,
    setNationalCode,
    support,
    setSupport,
    tradeId,
    setTradeId
    }) {

    return (
        <div>
            <Text>لوگو سایت</Text>

            <Uploader
                className="mt-2"
                textOne={'تصویر لوگو سایت'}
                textTwo={'تصویر بنر اول باید ۵۰۰ پیکسل در ۲۰۰ پیکسل باشد'}
                selectedFile={selectedFile}
                onFileSelect={onFileSelect}
            />

            <Text className="mt-4">نام پزشک</Text>
            <Input value={nameProduct} onChange={(e) => setNameProduct(e.target.value)} placeholder="نام خود را وارد کنید" className="w-full mt-2" />

            <Text className="mt-4">شماره مطب</Text>
            <Input value={numberPhoneShop} onChange={(e) => setNumberPhoneShop(e.target.value)} placeholder="۰۹۱۱۱۱۱۱۱۱۱" className="w-full mt-2 text-left" />

            <Text className="mt-4">کد ملی پزشک</Text>
            <Input value={nationalCode} onChange={(e) => setNationalCode(e.target.value)} placeholder="۱۲۳۴۵۶۷۸۹" className="w-full mt-2 text-left" />

            <Text className="mt-4">تخصص پزشک</Text>
            <Input value={support} onChange={(e) => setSupport(e.target.value)} placeholder="قلب ..." className="w-full mt-2" />
            
            <Text className="mt-4">شناسه پزشک</Text>
            <Input value={tradeId} onChange={(e) => setTradeId(e.target.value)} placeholder="۱۲۳۴۵۶۷۸۹" className="w-full mt-2 text-left" />
        </div>
    );
}

export default TabRightDetail;
