import React, { useState } from 'react'
import ButtonGeneral from '../../atoms/button-general';
import '../../../App.css'
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
import useCreateCustomer from '../../db/use-create-customer';
import useCreateDriver from '../../db/use-create-driver';
import TabTickets from './tab-tickets';
import useCreateAdmin from '../../db/use-create-admin';
import Loading from '../../atoms/loading';
import jalaali from "jalaali-js";
import BirthDate from '../birth-day';
import { toast } from 'react-toastify';

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
    const [ selectedFile, setSelectedFile ] = useState('');
    const [preview, setPreview] = useState('');
    const [nameCustomer, setNameCustomer] = useState();
    const [lastNameCustomer, setLastNameCustomer] = useState();
    const [numberCustomer, setNumberCustomer] = useState();
    const [addressCustomer, setAddressCustomer] = useState();
    const [nameAdmin, setNameAdmin] = useState();
    const [firstNameAdmin, setFirstNameAdmin] = useState();
    const [phone, setPhone] = useState();
    const [unitName, setUnitName] = useState();
    const [birthDay, setBirthDay] = useState();
    const [address, setAddress] = useState();
    const [nCode, setNcode] = useState();

    const [nameDriver, setNameDriver] = useState('');
    const [phoneDriver, setPhoneDriver] = useState('');
    const [addressDriver, setAddressDriver] = useState('');

    const { mutate: mutateCreateCustomer } = useCreateCustomer();
    const { mutate: mutateCreateDriver, isPending} = useCreateDriver();
    const { mutate: mutateCreateAdmin, isLoading } = useCreateAdmin();
    const [gregorianBirthDay, setGregorianBirthDay] = useState("");

    const handleCreateNewCustomer = () => {
        mutateCreateCustomer(
            {
                nameCustomer, numberCustomer, addressCustomer, lastNameCustomer,selectedFile
            },
        )
    } 

    const handleCreateNewDriver = () => {
        mutateCreateDriver(
            {
                nameDriver, phoneDriver, addressDriver
            },
        )
    } 

    const handleCreateAdmin = () => {
        mutateCreateAdmin(
            {
                nameAdmin, phone, gregorianBirthDay, firstNameAdmin, unitName, address, nCode
            },
            {
                onSuccess: (data) => {
                    toast.success('ادمین اضافه شد')
                },
                onError: (err) => {
                    console.log(err)
                }
            }
        )
    }
    

    const Buttons = [
        {label: "ادمین ها" },
        {label: "مشتریان" },
        // {label: "پیک ها" },
        {label: "پشتیبانی" },
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

                {step === 0 && (
                    <ButtonGeneral onClick={() => setOpenAddAdmin(true)} className={`border border-blue-500 !text-blue-500`}>
                        افزودن ادمین
                    </ButtonGeneral>
                )}
                {step === 1 && (
                    <ButtonGeneral onClick={() => setOpenAddCustomer(true)} className={`border border-blue-500 !text-blue-500`}>
                        افزودن مشتری
                    </ButtonGeneral>
                )}
                {/* {step === 2 && (
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
            {/* <TabManagement step={step} index={2}>
                <hr className='w-[95%] m-auto'/>
                <TabCouriers/>
            </TabManagement> */}
            <TabManagement step={step} index={2}>
                <hr className='w-[95%] m-auto'/>
                <TabTickets/>
            </TabManagement>

            {/* add admin */}
            <GeneralModal
                open={openAddAdmin}
                handleClose={(e) => {
                    e.preventDefault()
                    setOpenAddAdmin(false)
                }}
                // title="آیا می یخواهید این دسته بندی را حذف کنید ؟"
                actionText={isLoading ? <Loading/> : 'ثبت ادمین'}
                actionHandler={(e) => { 
                    e.preventDefault()
                    setOpenAddAdmin(false); 
                    handleCreateAdmin()
                }}
            >
                <div className=' text-right'>
                    <div className='m-auto text-center'>
                        <PersonIcon className='!text-6xl'/>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className='text-right'>
                            <Text className={`mt-4 mb-2`}>نام</Text>
                            <Input value={nameAdmin} onChange={(e) => setNameAdmin(e.target.value)} className={`w-full`} placeholder={`نام ادمین `}/>
                        </div>
                        <div className='text-right'>
                            <Text className={`mt-4 mb-2`}>نام خانوادگی</Text>
                            <Input value={firstNameAdmin} onChange={(e) => setFirstNameAdmin(e.target.value)} className={`w-full`} placeholder={`نام خانوادگی `}/>
                        </div>
                    </div>

                    <div className='text-right'>
                        <Text className={`mt-4 mb-2`}>نام کاربری</Text>
                        <Input value={unitName} onChange={(e) => setUnitName(e.target.value)} className={`w-full`} placeholder={`نام خانوادگی `}/>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className='text-right'>
                            <Text className={`mt-4 mb-2`}>تاریخ تولد</Text>
                            <BirthDate value={birthDay}  onChange={setBirthDay} onGregorianChange={setGregorianBirthDay}/>  
                        </div>  
                        <div className='text-right'>
                            <Text className={`mt-4 mb-2`}>شماره تماس</Text>
                            <Input value={phone} onChange={(e) => setPhone(e.target.value)} className={`w-full text-left`} placeholder={`۰۹۱۲۳۴۵۶۷۸۹`}/>
                        </div>                    
                    </div>

                    <div className='text-right'>
                        <Text className={`mt-4 mb-2`}>کد ملی</Text>
                        <Input value={nCode} onChange={(e) => setNcode(e.target.value)} className={`w-full`} placeholder={`نام خانوادگی `}/>
                    </div>

                    <div className='text-right'>
                        <Text className={`mt-4 mb-2`}>آدرس</Text>
                        <Input value={address} onChange={(e) => setAddress(e.target.value)} className={`w-full`} placeholder={`نام خانوادگی `}/>
                    </div>
                </div>
            </GeneralModal>

            {/* add customer */}
            <GeneralModal
                open={openAddCustomer}
                handleClose={(e) => {
                    e.preventDefault()
                    setOpenAddCustomer(false)
                }}
                // title="آیا می خواهید این مشتری را حذف کنید ؟"
                actionText="ثبت مشتری"
                actionHandler={(e) => {
                    e.preventDefault() 
                    handleCreateNewCustomer(); 
                    setOpenAddCustomer(false) 
                }}
            >
               <Uploader
                    textOne={`لیست مشتریان خود را آپلود کنید`}
                    textTwo={`فرمت فایل حتما اکسل باشد`}
                    selectedFile={selectedFile}
                    onFileSelect={setSelectedFile}
                    preview={preview}
                    setPreview={setPreview}
                />

                <div className='flex w-full gap-4 mt-4'>
                    <div className='w-full text-right'>
                        <Text>نام</Text>
                        <Input value={nameCustomer} onChange={(e) => setNameCustomer(e.target.value)} className={`w-full mt-2`} placeholder={`نام مشتری را وارد کنید`}/>
                    </div>
                    <div className='w-full text-right'>
                        <Text className={`text-right`}>نام خانوادگی</Text>
                        <Input value={lastNameCustomer} onChange={(e) => setLastNameCustomer(e.target.value)} className={`w-full mt-2`} placeholder={`نام خانوادگی مشتری را وارد کنید`}/>
                    </div>
                </div>

                <Text className={`text-right mt-4`}>شماره</Text>
                <Input value={numberCustomer} onChange={(e) => setNumberCustomer(e.target.value)} className={`w-full text-left`} placeholder={`09111111111`}/>

                <Text className={`text-right mt-4`}>آدرس</Text>
                <Input value={addressCustomer} onChange={(e) => setAddressCustomer(e.target.value)} className={`w-full mt-2`} placeholder={`آدرس را وارد کنید`}/>
            </GeneralModal>

            {/* add couriers */}
            <GeneralModal
                open={openAddCouriers}
                handleClose={(e) => {
                    e.preventDefault()
                    setOpenAddCouriers(false)
                }}
                // title="آیا می یخواهید این دسته بندی را حذف کنید ؟"
                actionText={isPending ? <Loading/> : 'ثبت پیک'}
                actionHandler={(e) => { 
                    e.preventDefault()
                    handleCreateNewDriver();
                    setOpenAddCouriers(false); 
                }}
            >
                <div className=' text-right'>
                    <div className='m-auto text-center'>
                        <img src={ImgGift} className='m-auto my-8'  alt="" />
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className='text-right'>
                            <Text className={`mt-4 mb-2`}>نام</Text>
                            <Input value={nameDriver} onChange={(e) => setNameDriver(e.target.value)} className={`w-full`} placeholder={`نام محصول را وارد کنید`}/>
                        </div>
                        <div className='text-right'>
                            <Text className={`mt-4 mb-2`}>شماره تماس</Text>
                            <Input value={phoneDriver} onChange={(e) => setPhoneDriver(e.target.value)} className={`w-full text-left`} placeholder={`۰۹۱۲۳۴۵۶۷۸۹`}/>
                        </div>                    
                    </div>

                    <div className='text-right'>
                        <Text className={`mt-4 mb-2`}>آدرس</Text>
                        <Input value={addressDriver} onChange={(e) => setAddressDriver(e.target.value)} className={`w-full text-right`} placeholder={`آدرس پیک را وارد کنید`}/>
                    </div> 

                </div>
            </GeneralModal>
        </div>
    )
}

export default Management
