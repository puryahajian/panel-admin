import React, { useState } from 'react'
import Uploader from '../uploader'
import TabRightDetail from './tab-right-detail'
import TabLeftMap from './tab-left-map'
import Text from '../../atoms/text'
import Input from '../../atoms/input'
import ButtonGeneral from '../../atoms/button-general'
import UsePatchProfileShop from '../../db/use-patch-profile-shop'
import Loading from '../../atoms/loading'

function Setting() {
    const { mutate, isLoading } = UsePatchProfileShop();
    const [ selectedBg, setSelectedBg ] = useState();
    const [ selectedBannerOne, setSelectedBannerOne ] = useState();
    const [ selectedBannerTwo, setSelectedBannerTwo ] = useState();
    const [ selectedBannerThree, setSelectedBannerThree ] = useState();

    const [ selectedLogo, setSelectedLogo] = useState('');
    const [nameProduct, setNameProduct] = useState('');
    const [numberPhoneShop, setNumberPhoneShop] = useState('');
    const [nationalCode, setNationalCode] = useState('');
    const [support, setSupport] = useState('');

    const [timeOpen, setTimeOpen] = useState('');
    const [timeClose, setTimeClose] = useState('');    
    const [instagram, setInstagram] = useState('');   
    const [telegram, setTelegram] = useState('');   
    const [whatsApp, setWhatsApp] = useState(''); 
    
    const [catalog, setCatalog] = useState('');    
    const [about, setAbout] = useState('');    
    const [certificate, setCertificate] = useState('');    
    const [markerPosition, setMarkerPosition] = useState('');    
    const [tradeId, setTradeId] = useState('');    
    

    const handleNeedCreateProduct = (e) => {
        e.preventDefault();

        mutate(
            { 
                selectedBg, 
                selectedBannerOne,
                selectedBannerTwo,
                selectedBannerThree, 
                selectedLogo, 
                nameProduct, 
                numberPhoneShop, 
                nationalCode, 
                support, 
                timeOpen, 
                timeClose,
                catalog,
                about,
                instagram,
                telegram,
                whatsApp,
                certificate,
                markerPosition,
                tradeId
            },
            {
                onSuccess: (data) => {
                    setSelectedBg('')
                    setSelectedBannerOne('')
                    setSelectedBannerTwo('')
                    selectedBannerThree('')
                    setSelectedLogo('')
                    setNameProduct('')
                    setNumberPhoneShop('')
                    setNationalCode('')
                    setSupport('')
                    setTimeOpen('')
                    setTimeClose('')
                    setInstagram('')
                    setTelegram('')
                    setWhatsApp('')
                    setCatalog('')
                    setAbout('')
                    setCertificate('')
                    setTradeId('')
                },
            }
        );
    }

    return (
        <form onSubmit={handleNeedCreateProduct}>
            {/* <div className='grid grid-cols-2 gap-5 mb-6'>
                <Uploader
                    textOne={'تصویر بنر اول'}
                    textTwo={'تصویر بنر اول باید ۵۰۰ پیکسل در ۲۰۰ پیکسل باشد'}
                />

                <Uploader
                    textOne={'تصوبر بنر دوم'}
                    textTwo={'تصویر بنر اول باید ۵۰۰ پیکسل در ۲۰۰ پیکسل باشد'}
                />
            </div> */}
            <Uploader
                textOne={`تصویر بک گراند`}
                textTwo={`سایز تصویر شما نباید از ۲۰۰ کیلو بایت بیشتر باشه`}
                selectedFile={selectedBg}
                onFileSelect={setSelectedBg}
            />

            <hr className='w-[95%] my-4 m-auto'/>

            <div className='grid grid-cols-3 gap-4'>
                <Uploader
                    textOne={`تصویر بنر اول`}
                    textTwo={`سایز تصویر شما نباید از ۲۰۰ کیلو بایت بیشتر باشه`}
                    selectedFile={selectedBannerOne}
                    onFileSelect={setSelectedBannerOne}
                />
                <Uploader
                    textOne={`تصویر بنر دوم`}
                    textTwo={`سایز تصویر شما نباید از ۲۰۰ کیلو بایت بیشتر باشه`}
                    selectedFile={selectedBannerTwo}
                    onFileSelect={setSelectedBannerTwo}
                />
                <Uploader
                    textOne={`تصویر بنر سوم`}
                    textTwo={`سایز تصویر شما نباید از ۲۰۰ کیلو بایت بیشتر باشه`}
                    selectedFile={selectedBannerThree}
                    onFileSelect={setSelectedBannerThree}
                />
            </div>

            <hr className='w-[95%] my-4 m-auto'/>

            <div className=' mb-6 grid grid-cols-2 gap-4'>
                <TabRightDetail
                    selectedFile={selectedLogo}
                    onFileSelect={setSelectedLogo}
                    setSelectedLogo={setSelectedLogo}
                    setNameProduct={setNameProduct}
                    setNumberPhoneShop={setNumberPhoneShop}
                    setNationalCode={setNationalCode}
                    setSupport={setSupport}
                    setTradeId={setTradeId}
                />
                <TabLeftMap
                    selectedFile={certificate}
                    onFileSelect={setCertificate}
                    newCoordinates={setMarkerPosition}
                />
            </div>

            <hr className='w-[95%] m-auto'/>

            <div className='flex justify-between my-6'>
                <div className='grid gap-2'>
                    <Text className={`text-base !text-black !font-bold`}>ساعت کاری فروشگاه</Text>
                    <Text>ساعت کاری فروشگاه را وارد کنید تا کاربران از ساعت باز بودن فروشگاه اطلاع پیدا کنند</Text>
                </div>
                <div className='flex gap-10'>
                    <div className='flex gap-4 items-center'>
                        <Text>از ساعت</Text>
                        <Input value={timeOpen} onChange={(e) => setTimeOpen(e.target.value)}/>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <Text>تا ساعت</Text>
                        <Input value={timeClose} onChange={(e) => setTimeClose(e.target.value)}/>
                    </div>
                </div>
            </div>

            <hr className='w-[95%] m-auto'/>

            <div className=' my-6'>
                <div className='grid gap-2'>
                    <Text className={`text-base !text-black !font-bold`}>فضای مجازی فروشگاه</Text>
                    <Text>شما می توانید آدرس پروفایل فروشگاه خود را وارد کنید تا کاربرای شما را دنبال کنند</Text>
                </div>
                <div className='grid grid-cols-3 mt-4 gap-10'>
                    <div className='grid grid-cols-5 gap-4 items-center'>
                        <Text>اینستاگرام</Text>
                        <Input value={instagram} onChange={(e) => setInstagram(e.target.value)} className={`w-full col-span-4`}/>
                    </div>
                    <div className='grid grid-cols-5 gap-4 items-center'>
                        <Text>واتس اپ</Text>
                        <Input value={whatsApp} onChange={(e) => setWhatsApp(e.target.value)} className={`w-full col-span-4`}/>
                    </div>
                    <div className='grid grid-cols-5 gap-4 items-center'>
                        <Text>تلگرام</Text>
                        <Input value={telegram} onChange={(e) => setTelegram(e.target.value)} className={`w-full col-span-4`}/>
                    </div>
                </div>
            </div>

            <hr className='w-[95%] m-auto'/>

            <div className='mt-6'>
                <Text>متن کاتالوگ</Text>
                <textarea value={catalog} onChange={(e) => setCatalog(e.target.value)} className='w-full mt-2 rounded-lg h-80 bg-bgInput outline-none p-2 text-xs resize-none' name="" id=""></textarea>
            </div>

            <hr className='w-[95%] my-4 m-auto'/>

            <div>
                <Text>متن درباره ما</Text>
                <textarea value={about} onChange={(e) => setAbout(e.target.value)} className='w-full mt-2 rounded-lg h-80 bg-bgInput outline-none p-2 text-xs resize-none' name="" id=""></textarea>
            </div>

            <div className='mt-6 flex justify-end gap-4'>
                <ButtonGeneral className={`!px-16 bg-customBlue text-white border-customBlue`}>
                    {isLoading ? <Loading/> : "ثبت و اعمال"}
                </ButtonGeneral>
                <ButtonGeneral className={`!px-16 border-red-500 text-red-500`}>انصراف</ButtonGeneral>
            </div>

        </form>
    )
}

export default Setting
