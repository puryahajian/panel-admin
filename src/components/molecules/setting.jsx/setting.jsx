import React, { useEffect, useState } from 'react'
import Uploader from '../uploader'
import TabRightDetail from './tab-right-detail'
import TabLeftMap from './tab-left-map'
import Text from '../../atoms/text'
import Input from '../../atoms/input'
import ButtonGeneral from '../../atoms/button-general'
import UsePatchProfileShop from '../../db/use-patch-profile-shop'
import Loading from '../../atoms/loading'
import UseGetProfile from '../../db/use-get-profile'

function Setting() {
    const { mutate, isLoading } = UsePatchProfileShop();
    const { data } = UseGetProfile();
    const [ selectedBg, setSelectedBg ] = useState();
    const [ selectedBannerOne, setSelectedBannerOne ] = useState();
    const [ selectedBannerTwo, setSelectedBannerTwo ] = useState();
    const [ selectedBannerThree, setSelectedBannerThree ] = useState();

    const [ selectedLogo, setSelectedLogo] = useState('');
    const [nameProduct, setNameProduct] = useState('');
    const [numberPhoneShop, setNumberPhoneShop] = useState('');
    const [nationalCode, setNationalCode] = useState('');
    const [support, setSupport] = useState('');

    const [timeOpen, setTimeOpen] = useState(data?.start_time || '');
    const [timeClose, setTimeClose] = useState(data?.end_time || '');    
    const [instagram, setInstagram] = useState(data?.instagram || '');   
    const [telegram, setTelegram] = useState(data?.telegram || '');   
    const [whatsApp, setWhatsApp] = useState(data?.whats_app || ''); 
    const [preview, setPreview] = useState(null);
    
    const [catalog, setCatalog] = useState(data?.catalog || '');    
    const [about, setAbout] = useState(data?.description || '');    
    const [certificate, setCertificate] = useState('');    
    const [markerPosition, setMarkerPosition] = useState('');    
    const [tradeId, setTradeId] = useState('');   
    
    useEffect(() => {
        if (data?.start_time && data?.end_time && data?.instagram && data?.telegram && data?.whats_app) {
            setTimeOpen(data?.start_time);
            setTimeClose(data?.end_time);
            setInstagram(data?.instagram);
            setTelegram(data?.telegram);
            setWhatsApp(data?.whats_app);
        }
    }, [data]);
    

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
        );
    }

    return (
        <form>
            {data && (
                <>
                    <Uploader
                        textOne={`تصویر بک گراند`}
                        textTwo={`سایز تصویر شما نباید از ۲۰۰ کیلو بایت بیشتر باشه`}
                        selectedFile={selectedBg}
                        onFileSelect={setSelectedBg}
                        preview={data?.image}
                        etPreview={setPreview}
                    />

                    <hr className='w-[95%] my-4 m-auto'/>

                    <div className='grid grid-cols-3 gap-4'>
                        
                        <Uploader
                            textOne={`تصویر بنر اول`}
                            textTwo={`سایز تصویر شما نباید از ۲۰۰ کیلو بایت بیشتر باشه`}
                            selectedFile={selectedBannerOne}
                            onFileSelect={setSelectedBannerOne}
                            preview={data?.banner_1}
                            setPreview={setPreview}
                        />
                        <Uploader
                            textOne={`تصویر بنر دوم`}
                            textTwo={`سایز تصویر شما نباید از ۲۰۰ کیلو بایت بیشتر باشه`}
                            selectedFile={selectedBannerTwo}
                            onFileSelect={setSelectedBannerTwo}
                            preview={data?.banner_2}
                            setPreview={setPreview}
                        />
                        <Uploader
                            textOne={`تصویر بنر سوم`}
                            textTwo={`سایز تصویر شما نباید از ۲۰۰ کیلو بایت بیشتر باشه`}
                            selectedFile={selectedBannerThree}
                            onFileSelect={setSelectedBannerThree}
                            preview={data?.banner_3}
                            setPreview={setPreview}
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
                                <Input defaultValue={data?.start_time} value={timeOpen} onChange={(e) => setTimeOpen(e.target.value)}/>
                            </div>
                            <div className='flex gap-4 items-center'>
                                <Text>تا ساعت</Text>
                                <Input defaultValue={data?.end_time} value={timeClose} onChange={(e) => setTimeClose(e.target.value)}/>
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
                                <Input value={instagram} defaultValue={data?.instagram} onChange={(e) => setInstagram(e.target.value)} className={`w-full col-span-4`}/>
                            </div>
                            <div className='grid grid-cols-5 gap-4 items-center'>
                                <Text>واتس اپ</Text>
                                <Input value={whatsApp} defaultValue={data?.whats_app} onChange={(e) => setWhatsApp(e.target.value)} className={`w-full col-span-4`}/>
                            </div>
                            <div className='grid grid-cols-5 gap-4 items-center'>
                                <Text>تلگرام</Text>
                                <Input value={telegram} defaultValue={data?.whats_app} onChange={(e) => setTelegram(e.target.value)} className={`w-full col-span-4`}/>
                            </div>
                        </div>
                    </div>

                    <hr className='w-[95%] m-auto'/>

                    <div className='mt-6'>
                        <Text>متن کاتالوگ</Text>
                        <textarea defaultValue={data?.catalog} value={catalog} onChange={(e) => setCatalog(e.target.value)} className='w-full mt-2 rounded-lg h-80 bg-bgInput outline-none p-2 text-xs resize-none' name="" id=""></textarea>
                    </div>

                    <hr className='w-[95%] my-4 m-auto'/>

                    <div>
                        <Text>متن درباره ما</Text>
                        <textarea defaultValue={data?.description} value={about} onChange={(e) => setAbout(e.target.value)} className='w-full mt-2 rounded-lg h-80 bg-bgInput outline-none p-2 text-xs resize-none' name="" id=""></textarea>
                    </div>
                </>
            )}

            <div className='mt-6 flex justify-end gap-4'>
                <ButtonGeneral onClick={handleNeedCreateProduct} className={`!px-16 bg-customBlue text-white border-customBlue`}>
                    {isLoading ? <Loading/> : "ثبت و اعمال"}
                </ButtonGeneral>
                <ButtonGeneral className={`!px-16 border-red-500 text-red-500`}>انصراف</ButtonGeneral>
            </div>

        </form>
    )
}

export default Setting
