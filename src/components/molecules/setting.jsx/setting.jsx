import React, { useState } from 'react'
import Uploader from '../uploader'
import TabRightDetail from './tab-right-detail'
import TabLeftMap from './tab-left-map'
import Text from '../../atoms/text'
import Input from '../../atoms/input'
import ButtonGeneral from '../../atoms/button-general'
import UseGetInfo from '../../db/use-get-info'
import UsePatchProfile from '../../db/use-patch-profile'
import { toast } from 'react-toastify'
import Loading from '../../atoms/loading'

function Setting() {
    const { data: dataInfo } = UseGetInfo();
    const { mutate , isPending } = UsePatchProfile();

    const [ nameShop, setNameShop ] = useState(dataInfo?.name || '');
    const [ numberShop, setNumberShop ] = useState(dataInfo?.phone || '');
    const [ numberSupportShop, setNumberSupportShop ] = useState(dataInfo?.support_phone || '');
    const [ openTime, setOpenTime ] = useState(dataInfo?.open_time || '');
    const [ closeTime, setCloseTime ] = useState(dataInfo?.close_time || '');
    const [ aboutUse, setAboutUse ] = useState(dataInfo?.about_us || '');

    const [ telegram, setTelegram ] = useState(dataInfo?.telegram || '');
    const [ whatsApp, setWhatsApp ] = useState(dataInfo?.whatsApp || '');
    const [ instagram, setInstagram ] = useState(dataInfo?.instagram || '');

    const [ selectedLogo, setSelectedLogo ] = useState('');
    const [ preview, setPreview ] = useState(dataInfo?.logo || '');

    // Banner One
    const [ previewBannerOne, setPreviewBannerOne ] = useState('');
    const [ selectedBannerOne, setSelectedBannerOne ] = useState('');

    // Banner Two
    const [ previewBannerTwo, setPreviewBannerTwo ] = useState('');
    const [ selectedBannerTwo, setSelectedBannerTwo ] = useState('');

    const lat = localStorage.getItem('lat');
    const lng = localStorage.getItem('lng');

    const handlePatchProfile = (e) => {
        // console.log( selectedLogo, 
        //             nameShop, 
        //             numberShop, 
        //             numberSupportShop, 
        //             openTime, 
        //             closeTime, 
        //             selectedBannerOne, 
        //             selectedBannerTwo,
        //             lat,
        //             lng,
        //             telegram,
        //             whatsApp,
        //             instagram,
        //             aboutUse)
        mutate(
            {
                selectedLogo, 
                nameShop, 
                numberShop, 
                numberSupportShop, 
                openTime, 
                closeTime, 
                selectedBannerOne, 
                selectedBannerTwo,
                lat,
                lng,
                telegram,
                whatsApp,
                instagram,
                aboutUse
            },
            {
                onSuccess: () => {
                    toast.success('تغیرات ذخیره شد')
                }
            }
        )
    }

    return (
        <div>
            <form>
                <div className='grid grid-cols-2 gap-5 mb-6'>
                    <Uploader
                        textOne={'تصویر بنر اول'}
                        // textTwo={'تصویر بنر اول باید ۵۰۰ پیکسل در ۲۰۰ پیکسل باشد'}
                        preview={dataInfo?.banner_one || previewBannerOne}
                        setPreview={setPreviewBannerOne}
                        onFileSelect={setSelectedBannerOne}
                        selectedFile={selectedBannerOne}
                    />

                    <Uploader
                        textOne={'تصوبر بنر دوم'}
                        // textTwo={'تصویر بنر اول باید ۵۰۰ پیکسل در ۲۰۰ پیکسل باشد'}
                        preview={dataInfo?.banner_two || previewBannerTwo}
                        setPreview={setPreviewBannerTwo}
                        onFileSelect={setSelectedBannerTwo}
                        selectedFile={selectedBannerTwo}
                    />
                </div>

                <hr className='w-[95%] m-auto'/>

                <div className=' my-6 grid grid-cols-2 gap-4'>
                    <TabRightDetail
                        preview={dataInfo?.logo || preview}
                        setPreview={setPreview}
                        onFileSelect={setSelectedLogo}
                        selectedFile={selectedLogo}
                        onChangeNameShop={(e) => setNameShop(e.target.value)}
                        valueNameShop={nameShop}
                        onChangeNumberShop={(e) => setNumberShop(e.target.value)}
                        valueNumberShop={numberShop}
                        onChangeNumberSupport={(e) => setNumberSupportShop(e.target.value)}
                        valueNumberSupport={numberSupportShop}
                    />
                    <TabLeftMap/>
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
                            {/* <Input/> */}
                            <Input value={openTime} onChange={(e) => setOpenTime(e.target.value)} name="" id="" />
                        </div>
                        <div className='flex gap-4 items-center'>
                            <Text>تا ساعت</Text>
                            {/* <Input/> */}
                            <Input value={closeTime} onChange={(e) => setCloseTime(e.target.value)} name="" id="" />
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
                    <Text>متن درباره ما</Text>
                    <textarea value={aboutUse} onChange={(e) => setAboutUse(e.target.value)} className='w-full mt-2 p-2 rounded-lg h-80 outline-none bg-bgInput resize-none' name="" id=""></textarea>
                </div>

                <div className='mt-6 flex justify-end gap-4'>
                    <ButtonGeneral className={`!px-16 bg-customBlue text-white border-customBlue`} onClick={(e) => {
                        e.preventDefault()
                        handlePatchProfile()
                        }}>
                            {isPending ? <Loading/> : 'ثبت و اعمال'}
                        </ButtonGeneral>
                    <ButtonGeneral className={`!px-16 border-red-500 text-red-500`}>انصراف</ButtonGeneral>
                </div>
            </form>
        </div>
    )
}

export default Setting
