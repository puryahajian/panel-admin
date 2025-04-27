import React, { useState } from 'react';
import Text from '../../atoms/text';
import Uploader from '../uploader';
import Input from '../../atoms/input';
import UseGetMaterial from '../../db/use-get-material';
import UseGetProfile from '../../db/use-get-profile';

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

    const { data } = UseGetProfile();

    return (
        <div>
            <Text>لوگو سایت</Text>

            {data && (
                <>
                    <Uploader
                        className="mt-2"
                        textOne={'تصویر لوگو سایت'}
                        textTwo={'تصویر بنر اول باید ۵۰۰ پیکسل در ۲۰۰ پیکسل باشد'}
                        selectedFile={selectedFile}
                        onFileSelect={onFileSelect}
                        preview={data?.cert_1}
                    />

                    <Text className="mt-4">نام فروشگاه</Text>
                    <Input defaultValue={data?.name} disabled={!!data?.name} value={nameProduct} onChange={(e) => setNameProduct(e.target.value)} placeholder="نام فروشگاه خود را وارد کنید" className="w-full mt-2" />

                    <Text className="mt-4">شماره فروشگاه</Text>
                    <Input defaultValue={data?.shop_phones} value={numberPhoneShop} onChange={(e) => setNumberPhoneShop(e.target.value)} placeholder="۰۹۱۱۱۱۱۱۱۱۱" className="w-full mt-2 text-left" />

                    <Text className="mt-4">کد ملی صاحب</Text>
                    <Input defaultValue={data?.national_code} value={nationalCode} onChange={(e) => setNationalCode(e.target.value)} placeholder="۱۲۳۴۵۶۷۸۹" className="w-full mt-2 text-left" />

                    <Text className="mt-4">شماره پشتیبانی</Text>
                    <Input value={support} onChange={(e) => setSupport(e.target.value)} placeholder="۰۹۱۱۱۱۱۱۱۱۱" className="w-full mt-2 text-left" />
                    
                    <Text className="mt-4">شناسه تجاری</Text>
                    <Input defaultValue={data?.trade_id} value={tradeId} onChange={(e) => setTradeId(e.target.value)} placeholder="۰۹۱۱۱۱۱۱۱۱۱" className="w-full mt-2 text-left" />
                </>
            )}
        </div>
    );
}

export default TabRightDetail;
