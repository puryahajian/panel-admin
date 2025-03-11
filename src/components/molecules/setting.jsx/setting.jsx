import React from 'react'
import Uploader from '../uploader'
import TabRightDetail from './tab-right-detail'
import TabLeftMap from './tab-left-map'
import Text from '../../atoms/text'
import Input from '../../atoms/input'
import ButtonGeneral from '../../atoms/button-general'

function Setting() {

    return (
        <div>
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

            {/* <hr className='w-[95%] m-auto'/> */}

            <div className=' mb-6 grid grid-cols-2 gap-4'>
                <TabRightDetail/>
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
                        <Input/>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <Text>تا ساعت</Text>
                        <Input/>
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
                        <Input className={`w-full col-span-4`}/>
                    </div>
                    <div className='grid grid-cols-5 gap-4 items-center'>
                        <Text>واتس اپ</Text>
                        <Input className={`w-full col-span-4`}/>
                    </div>
                    <div className='grid grid-cols-5 gap-4 items-center'>
                        <Text>تلگرام</Text>
                        <Input className={`w-full col-span-4`}/>
                    </div>
                </div>
            </div>

            <hr className='w-[95%] m-auto'/>

            <div className='mt-6'>
                <Text>متن درباره ما</Text>
                <textarea className='w-full mt-2 rounded-lg h-80 bg-bgInput resize-none' name="" id=""></textarea>
            </div>

            <div className='mt-6 flex justify-end gap-4'>
                <ButtonGeneral className={`!px-16 bg-customBlue text-white border-customBlue`}>ثبت و اعمال</ButtonGeneral>
                <ButtonGeneral className={`!px-16 border-red-500 text-red-500`}>انصراف</ButtonGeneral>
            </div>

        </div>
    )
}

export default Setting
