import React, { useState } from 'react'
import ButtonGeneral from '../../atoms/button-general';
import TabAdmins from './tab-admins';
import TabCustomer from './tab-customer';
import TabCouriers from './tab-couriers';
import TabSetting from './tab-setting';
import GeneralModal from '../modal-general';
import Text from '../../atoms/text';
import Input from '../../atoms/input';
import PersonIcon from '@mui/icons-material/Person';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Uploader from '../uploader';
import ImgGift from '../../../assets/image/gift.png'

function TabManagement({ children, step, index }) {
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

function Management() {
    const [step, setStep] = useState(0);
    const [openAddAdmin, setOpenAddAdmin] = useState(false);
    const [openAddCustomer, setOpenAddCustomer] = useState(false);
    const [openAddCouriers, setOpenAddCouriers] = useState(false);

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    

    const Buttons = [
        // {label: "ادمین ها" },
        // {label: "مشتریان" },
        // {label: "پیک ها" },
        // {label: "تنظیمات" },
        // {label: "پشتیبانی" },
    ];
    return (
        <div>
            <div className='flex justify-between'>
                <div className='flex gap-4'>
                    {Buttons.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => setStep(index)}
                            className={`px-7 py-3 rounded-lg text-sm font-sans text-grayText ${
                                step === index
                                    ? 'bg-grayText text-white'
                                    : 'border border-gray-600 text-grayText'
                            }`}
                            aria-controls={`vertical-tabpanel-${index}`}
                        >
                            <span className='font-sans text-sm '>{tab.label}</span>
                            
                        </button>
                    ))}
                </div>

                {/* {step === 0 && (
                    <ButtonGeneral onClick={() => setOpenAddAdmin(true)} className={`border border-blue-500 !text-blue-500`}>
                        افزودن ادمین
                    </ButtonGeneral>
                )} */}
                {step === 0 && (
                    <ButtonGeneral onClick={() => setOpenAddCustomer(true)} className={`border border-blue-500 !text-blue-500`}>
                        افزودن مشتری
                    </ButtonGeneral>
                )}
                {/* {step === 1 && (
                    <ButtonGeneral onClick={() => setOpenAddCouriers(true)} className={`border border-blue-500 !text-blue-500`}>
                        افزودن پیک
                    </ButtonGeneral>
                )} */}
            </div>

            <TabManagement step={step} index={0}>
                <hr className='w-[95%] m-auto'/>
                <TabAdmins/>
            </TabManagement>
            <TabManagement step={step} index={1}>
                <hr className='w-[95%] m-auto'/>
                <TabCustomer/>
            </TabManagement>
            <TabManagement step={step} index={2}>
                <hr className='w-[95%] m-auto'/>
                <TabCouriers/>
            </TabManagement>
            <TabManagement step={step} index={3}>
                <hr className='w-[95%] m-auto'/>
                <TabSetting/>
            </TabManagement>

            {/* add admin */}
            <GeneralModal
                open={openAddAdmin}
                handleClose={() => setOpenAddAdmin(false)}
                // title="آیا می یخواهید این دسته بندی را حذف کنید ؟"
                actionText="ثبت ادمین"
                actionHandler={() => { setOpenAddAdmin(false); }}
            >
                <div className=' text-right'>
                    <div className='m-auto text-center'>
                        <PersonIcon className='!text-6xl'/>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className='text-right'>
                            <Text className={`mt-4 mb-2`}>نام</Text>
                            <Input className={`w-full`} placeholder={`نام محصول را وارد کنید`}/>
                        </div>
                        <div className='text-right'>
                            <Text className={`mt-4 mb-2`}>شماره تماس</Text>
                            <Input className={`w-full text-left`} placeholder={`۰۹۳۶۲۲۹۲۵۶۸`}/>
                        </div>                    
                    </div>

                    <Text className={`mt-4 mb-2`}>سطح دسترسی</Text>
                    <FormControl className='w-full bg-bgInput !outline-none rounded-lg'>
                        <Select
                            className='!outline-none !border-none'
                            value={age}
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="">
                                <Text>
                                    سطح دسترسی را انتخاب کنید                                
                                </Text>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </GeneralModal>

            {/* add customer */}
            <GeneralModal
                open={openAddCustomer}
                handleClose={() => setOpenAddCustomer(false)}
                // title="آیا می خواهید این مشتری را حذف کنید ؟"
                actionText="ثبت مشتری"
                actionHandler={() => { setOpenAddCustomer(false); }}
            >
                <div className=' text-right'>
                    <Uploader
                        textOne={`لیست مشتری را اپلود کنید`}
                        textTwo={`فرمت قایل حتما اکسل باشد`}
                    />
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='text-right'>
                            <Text className={`mt-4 mb-2`}>نام</Text>
                            <Input className={`w-full`} placeholder={`نام محصول را وارد کنید`}/>
                        </div>
                        <div className='text-right'>
                            <Text className={`mt-4 mb-2`}>شماره تماس</Text>
                            <Input className={`w-full text-left`} placeholder={`۰۹۳۶۲۲۹۲۵۶۸`}/>
                        </div>                    
                    </div>

                    <Text className={`mt-4 mb-2`}>آدرس</Text>
                    <Input className={`w-full`} placeholder={`آدرس را وارد کنید`}/>

                </div>
            </GeneralModal>

            {/* add admin */}
            <GeneralModal
                open={openAddCouriers}
                handleClose={() => setOpenAddCouriers(false)}
                // title="آیا می یخواهید این دسته بندی را حذف کنید ؟"
                actionText="ثبت پیک"
                actionHandler={() => { setOpenAddCouriers(false); }}
            >
                <div className=' text-right'>
                    <div className='m-auto text-center'>
                        <img src={ImgGift} className='m-auto my-8'  alt="" />
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className='text-right'>
                            <Text className={`mt-4 mb-2`}>نام</Text>
                            <Input className={`w-full`} placeholder={`نام محصول را وارد کنید`}/>
                        </div>
                        <div className='text-right'>
                            <Text className={`mt-4 mb-2`}>شماره تماس</Text>
                            <Input className={`w-full text-left`} placeholder={`۰۹۳۶۲۲۹۲۵۶۸`}/>
                        </div>                    
                    </div>

                    <div className='text-right'>
                        <Text className={`mt-4 mb-2`}>آدرس</Text>
                        <Input className={`w-full text-right`} placeholder={`آدرس پیک را وارد کنید`}/>
                    </div> 

                </div>
            </GeneralModal>
        </div>
    )
}

export default Management
