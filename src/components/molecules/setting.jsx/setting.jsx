import React, { useState } from 'react'
import Uploader from '../uploader'
import TabRightDetail from './tab-right-detail'
import TabLeftMap from './tab-left-map'
import Text from '../../atoms/text'
import Input from '../../atoms/input'
import ButtonGeneral from '../../atoms/button-general'
import useGetInfo from '../../db/use-get-info'
import usePatchProfile from '../../db/use-patch-profile'
import { toast } from 'react-toastify'
import Loading from '../../atoms/loading'

function Setting() {
    const { data: dataInfo, isLoading } = useGetInfo();
    // console.log(dataInfo)
    const details = dataInfo?.results?.map((item) => item)
    // console.log(details)

    const { mutate , isPending } = usePatchProfile();

    const [ nameShop, setNameShop ] = useState();
    const [ numberShop, setNumberShop ] = useState(details[0]?.phone);
    const [ numberSupportShop, setNumberSupportShop ] = useState(details[0]?.support_phone);
    const [ openTime, setOpenTime ] = useState(details[0]?.open_time?.slice(0, -3));
    const [ closeTime, setCloseTime ] = useState(details[0]?.close_time?.slice(0, -3));
    const [ aboutUse, setAboutUse ] = useState(details[0]?.about_us);
    const [ linkBannerOne, setLinkBannerOne ] = useState('');
    const [ linkBannerTwo, setLinkBannerTwo ] = useState('');

    const [ telegram, setTelegram ] = useState(details[0]?.telegram);
    const [ whatsApp, setWhatsApp ] = useState(details[0]?.whatsApp);
    const [ instagram, setInstagram ] = useState(details[0]?.instagram);

    const [ selectedLogo, setSelectedLogo ] = useState('');
    const [ preview, setPreview ] = useState(details[0]?.logo);

    // Banner One
    const [ previewBannerOne, setPreviewBannerOne ] = useState(details[0]?.banner_one);
    const [ selectedBannerOne, setSelectedBannerOne ] = useState('');

    // Banner Two
    const [ previewBannerTwo, setPreviewBannerTwo ] = useState(details[0]?.banner_two);
    const [ selectedBannerTwo, setSelectedBannerTwo ] = useState('');

    const lat = localStorage.getItem('lat');
    const lng = localStorage.getItem('lng');

    const handlePatchProfile = (id) => {
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
                aboutUse,
                linkBannerOne,
                linkBannerTwo,
                id
            },
            {
                onSuccess: () => {
                    toast.success('تغیرات ذخیره شد')
                    setLinkBannerOne('')
                    setLinkBannerTwo('')
                },
                // onError: (err) => {
                //     console.log(err)
                // }
                
            }
        )
    }


    return (
        <div className='mt-4 max-[1024px]:mt-20 px-4'>
                <form>
                    <div className='grid grid-cols-2 max-[640px]:grid-cols-1 gap-5 mb-6'>
                        <div>
                            <Uploader
                                textOne={'تصویر بنر اول'}
                                // textTwo={'تصویر بنر اول باید ۵۰۰ پیکسل در ۲۰۰ پیکسل باشد'}
                                preview={details[0]?.banner_one || previewBannerOne}
                                setPreview={setPreviewBannerOne}
                                onFileSelect={setSelectedBannerOne}
                                selectedFile={selectedBannerOne}
                                className={`h-[155px] min-h-9`}
                            />

                            <Text className={`mt-3 mb-2`}>لینک بنر اول</Text>
                            <Input className={`w-full`} value={linkBannerOne} onChange={(e) => setLinkBannerOne(e.target.value)} placeholder={`لینک خود را وارد کنید`}/>
                        </div>
                        <div>
                            <Uploader
                                textOne={'تصوبر بنر دوم'}
                                // textTwo={'تصویر بنر اول باید ۵۰۰ پیکسل در ۲۰۰ پیکسل باشد'}
                                preview={details[0]?.banner_two || previewBannerTwo}
                                setPreview={setPreviewBannerTwo}
                                onFileSelect={setSelectedBannerTwo}
                                selectedFile={selectedBannerTwo}
                                className={`h-[155px] min-h-9`}
                            />
                            <Text className={`mt-3 mb-2`}>لینک بنر دوم</Text>
                            <Input className={`w-full`} value={linkBannerTwo} onChange={(e) => setLinkBannerTwo(e.target.value)} placeholder={`لینک خود را وارد کنید`}/>
                        </div>
                    </div>

                    <hr className='w-[95%] m-auto'/>

                    <div className=' my-6 grid grid-cols-2 max-[640px]:grid-cols-1 gap-4'>
                        <TabRightDetail
                            preview={details[0]?.logo || preview}
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

                    <div className='grid grid-cols-2 max-[800px]:grid-cols-1 gap-4 justify-between my-6'>
                        <div className='grid gap-2'>
                            <Text className={`text-base !text-black !font-bold`}>ساعت کاری فروشگاه</Text>
                            <Text>ساعت کاری فروشگاه را وارد کنید تا کاربران از ساعت باز بودن فروشگاه اطلاع پیدا کنند</Text>
                        </div>
                        <div className='flex gap-10 max-[430px]:grid max-[430px]:grid-cols-2 max-[430px]:gap-2'>
                            <div className='flex gap-4 items-center w-full'> 
                                <Text className={`w-max text-nowrap`}>از ساعت</Text>
                                {/* <Input/> */}
                                <Input className={`w-full`} defaultValue={details[0]?.open_time?.slice(0, -3)} value={openTime} onChange={(e) => setOpenTime(e.target.value)} name="" id="" />
                            </div>
                            <div className='flex gap-4 items-center w-full'>
                                <Text className={`w-max text-nowrap`}>تا ساعت</Text>
                                {/* <Input/> */}
                                <Input className={`w-full`} defaultValue={details[0]?.close_time?.slice(0, -3)} value={closeTime} onChange={(e) => setCloseTime(e.target.value)} name="" id="" />
                            </div>
                        </div>
                    </div>

                    <hr className='w-[95%] m-auto'/>

                    <div className=' my-6 grid grid-cols-1'>
                        <div className='grid gap-2'>
                            <Text className={`text-base !text-black !font-bold`}>فضای مجازی فروشگاه</Text>
                            <Text>شما می توانید آدرس پروفایل فروشگاه خود را وارد کنید تا کاربرای شما را دنبال کنند</Text>
                        </div>
                        <div className=' mt-4 gap-10 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'>
                            <div className='flex gap-4 items-center w-full max-[670px]:grid max-[670px]:grid-cols-6 max-[380px]:grid-cols-5'>
                                <Text>اینستاگرام</Text>
                                <Input defaultValue={details[0]?.instagram} value={instagram} onChange={(e) => setInstagram(e.target.value)} className={`w-full col-span-5 max-[380px]:col-span-4`}/>
                            </div>
                            <div className='flex gap-4 items-center w-full max-[670px]:grid max-[670px]:grid-cols-6 max-[380px]:grid-cols-5'>
                                <Text className={`w-[80px]`}>واتس اپ</Text>
                                <Input defaultValue={details[0]?.whatsApp} value={whatsApp} onChange={(e) => setWhatsApp(e.target.value)} className={`w-full col-span-5 max-[380px]:col-span-4`}/>
                            </div>
                            <div className='flex gap-4 items-center w-full max-[670px]:grid max-[670px]:grid-cols-6 max-[380px]:grid-cols-5'>
                                <Text>تلگرام</Text>
                                <Input defaultValue={details[0]?.telegram} value={telegram} onChange={(e) => setTelegram(e.target.value)} className={`w-full col-span-5 max-[380px]:col-span-4`}/>
                            </div>
                        </div>
                    </div>

                    <hr className='w-[95%] m-auto'/>

                    <div className='mt-6'>
                        <Text>متن درباره ما</Text>
                        <textarea defaultValue={details[0]?.about_us} value={aboutUse} onChange={(e) => setAboutUse(e.target.value)} className='w-full mt-2 p-2 rounded-lg h-80 outline-none bg-bgInput resize-none' name="" id=""></textarea>
                    </div>

                    <div className='mt-6 flex justify-end gap-4 max-[550px]:grid max-[550px]:grid-cols-2'>
                        <ButtonGeneral className={`px-16 max-[390px]:px-0 bg-customBlue text-white border-customBlue`} onClick={(e) => {
                            e.preventDefault()
                            handlePatchProfile(details[0]?.id)
                            // setGetIdProfile(item?.id)
                            }}>
                                {isPending ? <Loading/> : 'ثبت و اعمال'}
                            </ButtonGeneral>
                        <ButtonGeneral className={`px-16 max-[390px]:px-0 border-red-500 text-red-500`}>انصراف</ButtonGeneral>
                    </div>

                    {/* size tablet & mobile */}
                    {/* <div className='hidden px-4 max-[550px]:fixed max-[550px]:bottom-0 max-[550px]:right-0 max-[550px]:w-full max-[550px]:grid max-[550px]:grid-cols-2 max-[550px]:gap-4 max-[550px]:bg-white max-[550px]:py-4 max-[550px]:z-[2000]'>
                        <ButtonGeneral className={`px-4 bg-customBlue text-white border-customBlue`} onClick={(e) => {
                            e.preventDefault()
                            handlePatchProfile()
                            }}>
                                {isPending ? <Loading/> : 'ثبت و اعمال'}
                            </ButtonGeneral>
                        <ButtonGeneral className={`!px-16 border-red-500 text-red-500`}>انصراف</ButtonGeneral>
                    </div> */}
                </form>
            <div className='flex justify-center'>
                {isLoading ? <Loading/> : ''}
            </div>
        </div>
    )
}

export default Setting
