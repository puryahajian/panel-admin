import React, { useState } from 'react'
import ButtonGeneral from '../../atoms/button-general';
import TabListProducts from './tab-list-products';
import TabCategory from './tab-category';
import GeneralModal from '../modal-general';
import Uploader from '../uploader';
import Text from '../../atoms/text';
import Input from '../../atoms/input';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuAutoComplete from '../menu-auto-complete';
import List from '../../../lib/list';


function TabProduct({ children, step, index }) {
    return (
        <div
            role="tabpanel"
            className='mt-4'
            hidden={step !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            style={{ backgroundColor: 'white', color: 'black', borderRadius: '8px' }}
        >
            {step === index && <div>{children}</div>}
        </div>
    );
}

function Products() {
    const [step, setStep] = useState(0);
    const [open, setOpen] = useState(false);
    const [openAddProduct, setOpenAddProduct] = useState(false);

    
    const Buttons = [
        {label: "افزودن محصول" },
        // {label: "دسته بندی ها" },
    ];

    return (
        <div>
            <div className='flex justify-between items-center'>
                <div className='flex gap-4'>
                    {Buttons.map((tab, index) => (
                        // <button
                        //     key={index}
                        //     onClick={() => setStep(index)}
                        //     className={`px-7 py-3 rounded-lg text-sm font-sans text-grayText ${
                        //         step === index
                        //             ? 'bg-grayText text-white'
                        //             : 'border border-gray-600 text-grayText'
                        //     }`}
                        //     aria-controls={`vertical-tabpanel-${index}`}
                        // >
                            <Text className='font-sans text-sm '>{tab.label}</Text>
                            
                        // </button>
                    ))}
                </div>

                {/* {step === 0 && ( */}
                    <ButtonGeneral onClick={() => setOpenAddProduct(true)} className={`border border-blue-500 !text-blue-500`}>
                        درخواست کالای جدید
                    </ButtonGeneral>
                {/* )} */}
            </div>
            <TabProduct step={step} index={0}>
                <hr className='w-[95%] m-auto'/>
                <TabListProducts/>
            </TabProduct>
            {/* <TabProduct step={step} index={1}>
                <hr className='w-[95%] m-auto'/>
                <TabCategory/>
            </TabProduct> */}

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

            <GeneralModal
                open={openAddProduct}
                handleClose={() => setOpenAddProduct(false)}
                // title="آیا می یخواهید این دسته بندی را حذف کنید ؟"
                actionText="ذخیره"
                actionHandler={() => { setOpenAddProduct(false); }}
            >
                <div className=' text-right'>
                    <Uploader
                        textOne={`تصویر محصول را انتخاب کنید`}
                        textTwo={`سایز تصویر شما نباید از ۲۰۰ کیلو بایت بیشتر باشه`}
                    />

                    <Text className={`mt-4 mb-2`}>جزئیات محصول</Text>
                    <Input className={`w-full`} placeholder={`جزئیات را بنویسید`}/>
                </div>
            </GeneralModal>
        </div>
    )
}

export default Products
