import React, { useState } from 'react'
import Text from '../../atoms/text'
import ButtonExisting from '../../atoms/button-existing'
import ButtonEdit from '../../atoms/button-edit'
import GeneralModal from '../modal-general'
import FeatureAddProduct from './feature-add-product'

function TabListProducts() {
    const [open, setOpen] = useState(false);
    
    return (
        <div className='mt-4'>
            <FeatureAddProduct/>

            <Text className={`mt-6`}>لیست محصولات</Text>
            <hr className='w-[95%] m-auto mt-4'/>
            <div className='grid grid-cols-8 py-4'>
                <Text>ردیف</Text>
                <Text className={`col-span-2 mr-3`}>محصول</Text>
                <Text>دسته بندی</Text>
                <Text>تاریخ و ساعت</Text>
            </div>

            <div className='grid gap-2'>
                <div className='grid grid-cols-8 items-center border border-grayTitle rounded-2xl p-4'>
                    <div>1</div>
                    <div className=' col-span-2 flex items-center gap-6'>
                        <img src="" className='w-16 h-16 border border-grayTitle rounded-lg' alt="" />
                        <div className='grid gap-2'>
                            <Text>ساندویچ</Text>
                            <Text>۲۰۰,۰۰۰ تومان</Text>
                        </div>
                    </div>
                    <div>
                        <Text>برگر , ساندویچ , ...</Text>
                    </div>
                    <div>
                        <Text>۱۴۰۳ / ۱۲ / ۰۴   ۲۰ : ۰۰</Text>
                    </div>
                    <div className=' col-span-2 flex justify-end gap-4'>
                        <ButtonExisting>موجود</ButtonExisting>
                        <ButtonEdit>ویرایش</ButtonEdit>
                    </div>
                    <div className=' text-center'>
                        <button onClick={() => setOpen(true)}>
                            <Text className={`text-red-500`}>حذف</Text>
                        </button>
                    </div>

                </div>


            </div>
            <GeneralModal
                open={open}
                handleClose={() => setOpen(false)}
                title="آیا می یخواهید این محصول را حذف کنید ؟"
                // content="این یک مودال عمومی است که در تمام بخش‌ها می‌توان از آن استفاده کرد."
                actionText="بله"
                actionHandler={() => { setOpen(false); }}
            />

            {/* <GeneralModal
                open={open}
                handleClose={() => setOpen(false)}
                // title="آیا می یخواهید این محصول را حذف کنید ؟"
                actionText="ذخیره"
                actionHandler={() => { setOpen(false); }}
            >
                <div className='text-right'>
                    <Uploader
                        textOne={`عکس محصول را انتخاب کنید`}
                        textTwo={`سایز تصویر شما نباید از ۲۰۰ کیلو بابت بیشتر باشه`}
                    />
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='text-right'>
                            <Text className={`mt-4 mb-2`}>نام</Text>
                            <Input className={`w-full`} placeholder={`نام محصول را وارد کنید`}/>
                        </div>
                        <div className='text-right'>
                            <Text className={`mt-4 mb-2`}>قیمت</Text>
                            <Input className={`w-full text-left`} placeholder={`۳۰۰۰`}/>
                        </div>                    
                    </div>

                    <Text className={`mt-4`}>نوع کالا</Text>
                    <MenuAutoComplete options={List}/>

                    <Text className={`mt-4 mb-2`}>دسته بندی</Text>
                    <FormControl sx={{ minWidth: 120 }} className='w-full bg-bgInput !outline-none !py-0'>
                        <Select
                            className='!outline-none !py-0'
                            value={age}
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="">
                                <Text>
                                    دسته بندی را انتخاب کنید
                                </Text>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>

                    <div className='text-right'>
                        <Text className={`mt-4 mb-2`}>ظرفیت محصول</Text>
                        <Input className={`w-full text-left`} placeholder={`۳۰۰۰`}/>
                    </div>  

                    <Text className={`mt-4 mb-2`}>نوع بسته بندی</Text>
                    <FormControl sx={{ minWidth: 120 }} className='w-full bg-bgInput !outline-none !py-0'>
                        <Select
                            className='!outline-none !py-0'
                            value={age}
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="">
                                <Text>
                                    نوع بسته بندی را انتخاب کنید
                                </Text>
                            </MenuItem>
                            <MenuItem value={10}>کیلویی</MenuItem>
                            <MenuItem value={20}>شیشه ای</MenuItem>
                            <MenuItem value={30}>دانه ای</MenuItem>
                        </Select>
                    </FormControl>

                    <Text className={`mt-4`}>توضیحات</Text>
                    <textarea 
                        // value={description} 
                        // onChange={(e) => setDescription(e.target.value)} 
                        className='bg-bgInput placeholder:text-black text-sm resize-none w-full border !border-Custom mt-2 rounded outline-none p-2' 
                    />
                </div>
            </GeneralModal> */}

        </div>
    )
}

export default TabListProducts
