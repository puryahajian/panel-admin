import React from 'react'
import Uploader from '../uploader'
import Text from '../../atoms/text'
import Input from '../../atoms/input'
import MenuAutoComplete from '../menu-auto-complete'
import List from '../../../lib/list'
import { FormControl, MenuItem, Select } from '@mui/material'

function FeatureAddProduct() {
    const [age, setAge] = React.useState('');
    
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div className='flex gap-4'>
            <div className='w-[35%]'>
                <Uploader
                    className={`h-full grid items-center`}
                    textOne={`عکس محصول را انتخاب کنید`}
                    textTwo={`سایز تصویر شما نباید از ۲۰۰ کیلو بابت بیشتر باشه`}
                />
            </div>
            <div className='w-4/5'>
                <div className='grid grid-cols-3 gap-4'>
                    <div className='text-right'>
                        <Text className={`mb-2`}>نام</Text>
                        <Input className={`w-full`} placeholder={`نام محصول را وارد کنید`}/>
                    </div>
                    <div className='text-right'>
                        <Text className={`mb-2`}>قیمت</Text>
                        <Input className={`w-full text-left`} placeholder={`۳۰۰۰`}/>
                    </div> 
                    <div>
                        <Text className={``}>نوع کالا</Text>
                        <MenuAutoComplete options={List}/>  
                    </div>                 
                </div>

                <div className='grid grid-cols-3 gap-4'>
                    <div>
                        <Text className={`mt-4 mb-2`}>وضعیت</Text>
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
                    </div>
                    <div className='text-right'>
                        <Text className={`mt-4 mb-2`}>ظرفیت محصول</Text>
                        <Input className={`w-full text-left`} placeholder={`۳۰۰۰`}/>
                    </div>
                    <div>
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
                    </div>
                </div>

                <div>
                    <Text className={`mt-4`}>توضیحات</Text>
                    <textarea 
                        // value={description} 
                        // onChange={(e) => setDescription(e.target.value)} 
                        className='bg-bgInput placeholder:text-black text-sm resize-none w-full border !border-Custom mt-2 rounded outline-none p-2' 
                    />
                </div>

            </div>

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

export default FeatureAddProduct
