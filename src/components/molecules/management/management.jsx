import React, { useState } from 'react'
import ButtonGeneral from '../../atoms/button-general';
import '../../../App.css'
import TabAdmins from './tab-admins';
import TabCustomer from './tab-customer';
import TabCouriers from './tab-couriers';
import GeneralModal from '../modal-general';
import Text from '../../atoms/text';
import Input from '../../atoms/input';
import PersonIcon from '@mui/icons-material/Person';
import Uploader from '../uploader';
import ImgGift from '../../../assets/image/gift.png'
import useCreateCustomer from '../../db/use-create-customer';
import useCreateDriver from '../../db/use-create-driver';
import TabTickets from './tab-tickets';
import useCreateAdmin from '../../db/use-create-admin';
import Loading from '../../atoms/loading';
import BirthDate from '../birth-day';
import { toast } from 'react-toastify';
import useGetAllAdmin from '../../db/use-get-all-admin';
import useGetAllCustomer from '../../db/use-get-all-customer';
import useGetDriver from '../../db/use-get-driver';

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
    const { data } = useGetAllAdmin();
    const { data: dataCustomer } = useGetAllCustomer();
    const { data: dataDriver } = useGetDriver();
    const [openAddAdmin, setOpenAddAdmin] = useState(false);
    const [err, setErr] = useState('');
    const [errNcode, setErrNcode] = useState('');
    const [errNcodeLength, setErrNcodeLength] = useState('');

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
    const [error, setError] = useState('');

    const [nameDriver, setNameDriver] = useState('');
    const [phoneDriver, setPhoneDriver] = useState('');
    const [addressDriver, setAddressDriver] = useState('');

    const { mutate: mutateCreateCustomer } = useCreateCustomer();
    const { mutate: mutateCreateDriver, isPending} = useCreateDriver();
    const { mutate: mutateCreateAdmin, isLoading } = useCreateAdmin();
    const [gregorianBirthDay, setGregorianBirthDay] = useState("");

    const validatePhone = (phone) => {
        const phoneRegex = /^09[0-9]{9}$/;
        return phoneRegex.test(phone);
    };

    const handleCreateNewCustomer = () => {
        mutateCreateCustomer(
            {
                nameCustomer, numberCustomer, addressCustomer, lastNameCustomer,selectedFile
            },
            {
                onSuccess: () => {
                    setErr('')
                }
            }
        )
    } 

    const handleCreateNewDriver = () => {
        mutateCreateDriver(
            {
                nameDriver, phoneDriver, addressDriver
            },
            {
                onSuccess: () => {
                    setErr('')
                }
            }
        )
    } 

    const handleCreateAdmin = (e) => {
        mutateCreateAdmin(
            {
                nameAdmin, phone, gregorianBirthDay, firstNameAdmin, unitName, address, nCode
            },
            {
                onSuccess: (data) => {
                    toast.success('ادمین اضافه شد')
                    setErr('')
                    setErrNcode('')
                    setErrNcodeLength('')
                    setError('')
                },
                onError: (error) => {
                    console.log(error)
                }
            }
        )
    }

    

    const Buttons = [
        {label: "ادمین ها" },
        {label: "مشتریان" },
        {label: "پیک ها" },
        {label: "پشتیبانی" },
    ];


    return (
        <div>
            <div className='flex justify-between fixed top-0 shadow-lg right-0 w-full bg-white py-4'>
                <div className='flex gap-4 max-[560px]:fixed max-[1024px]:mt-[58px] max-[594px]:w-[93%] max-[560px]:mt-[55px] max-[560px]:bg-white max-[560px]:opacity-95 mr-[235px] max-[1024px]:mr-4'>
                    <div className='flex overflow-auto w-max gap-4 max-[560px]:pb-4 max-[560px]:pt-1'>
                        {Buttons.map((tab, index) => (
                            <button
                                key={index}
                                onClick={() => setStep(index)}
                                className={`px-10 py-3 w-max  rounded-lg text-grayText ${
                                    step === index
                                        ? 'bg-grayText text-white'
                                        : 'border bg-white border-gray-600 text-grayText'
                                }`}
                                aria-controls={`vertical-tabpanel-${index}`}
                            >
                                <Text className={`w-max ${
                                    step === index
                                        ? 'text-white'
                                        : 'text-grayText'
                                }`}>{tab.label}</Text>
                                
                            </button>
                        ))}
                    </div>
                </div>

                <div className='max-[990px]:fixed max-[990px]:w-full max-[990px]:bottom-0 max-[990px]:right-0 max-[990px]:px-4 max-[990px]:py-2 max-[990px]:bg-white max-[990px]:opacity-95 ml-[17px] max-[990px]:ml-0'>
                    {step === 0 && (
                        <ButtonGeneral onClick={() => setOpenAddAdmin(true)} className={`border bg-white border-blue-500 !text-blue-500 max-[990px]:w-full max-[990px]:bg-customBlue max-[990px]:!text-white`}>
                            افزودن ادمین
                        </ButtonGeneral>
                    )}
                    {step === 1 && (
                        <ButtonGeneral onClick={() => setOpenAddCustomer(true)} className={`border bg-white border-blue-500 !text-blue-500 max-[990px]:w-full max-[990px]:bg-customBlue max-[990px]:!text-white`}>
                            افزودن مشتری
                        </ButtonGeneral>
                    )}
                    {step === 2 && (
                        <ButtonGeneral onClick={() => setOpenAddCouriers(true)} className={`border bg-white border-blue-500 !text-blue-500 max-[990px]:w-full max-[990px]:bg-customBlue max-[990px]:!text-white`}>
                            افزودن پیک
                        </ButtonGeneral>
                    )}
                </div>
            </div>
            
            <div className=' max-[560px]:mt-[70px]'>
                <TabManagement step={step} index={0}>
                    <hr className='w-[95%] border-none m-auto max-[990px]:hidden'/>
                    <TabAdmins className={`mt-14 max-[1024px]:mt-[120px] max-[1024px]:mb-8`}/>
                </TabManagement>
                <TabManagement step={step} index={1}>
                    <hr className='w-[95%] border-none m-auto max-[990px]:hidden'/>
                    <TabCustomer className={`mt-14 max-[1024px]:mt-[160px] max-[1024px]:mb-8`}/>
                </TabManagement>
                <TabManagement step={step} index={2}>
                    <hr className='w-[95%] border-none m-auto max-[990px]:hidden'/>
                    <TabCouriers className={`mt-14 max-[1024px]:mt-[160px] max-[1024px]:mb-8`}/>
                </TabManagement>
                <TabManagement step={step} index={3}>
                    <hr className='w-[95%] border-none m-auto max-[990px]:hidden'/>
                    <TabTickets/>
                </TabManagement>
            </div>

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
                    const isPhoneExist = data.some((item) => item?.user?.phone === phone);
                    const isNcodeExist = data.some((item) => item?.user?.national_code === nCode);

                    if (!validatePhone(phone)) {
                        setError('شماره تلفن باید دقیقاً 10 رقم باشد و با 09 شروع شود');
                        return;
                    }

                    if (nCode.length !== 10) {
                        setErrNcodeLength('کد ملی اشتباه است')
                        return
                    }
                    
                    if (isPhoneExist) {
                        setErr('شماره تلفن قبلا ثبت شده')
                        return
                    }
                    if (isNcodeExist) {
                        setErrNcode('کد ملی قبلا ثبت شده')
                        return
                    }
                    setOpenAddAdmin(false); 
                    handleCreateAdmin()
                }}
                onClose={(e) => {
                    e.preventDefault()
                    setOpenAddAdmin(false);  
                }}
                sx={{
                    width: '500px', 
                    '@media (max-width: 600px)': {
                        width: '92%',
                    },
                }}
            >
                <div className=' text-right'>
                    <div className='m-auto text-center'>
                        <PersonIcon className='!text-6xl'/>
                    </div>

                    <div className='grid grid-cols-2 gap-4 max-[600px]:grid-cols-1'>
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
                            <Input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode={`numeric`} className={`w-full text-left ${err || error ? 'border !border-red-500' : ''}`} placeholder={`۰۹۱۲۳۴۵۶۷۸۹`}/>
                        </div>                    
                    </div>

                    <div className='text-right'>
                        <Text className={`mt-4 mb-2`}>کد ملی</Text>
                        <Input value={nCode} onChange={(e) => setNcode(e.target.value)} inputMode={`numeric`} className={`w-full ${errNcode || errNcodeLength ? 'border !border-red-500' : ''}`} placeholder={`کد ملی را وارد کنید`}/>
                    </div>

                    <div className='text-right mb-4'>
                        <Text className={`mt-4 mb-2`}>آدرس</Text>
                        <Input value={address} onChange={(e) => setAddress(e.target.value)} className={`w-full`} placeholder={`آدرس را وارد کنید`}/>
                    </div>

                    <Text className={`text-red-500`}>{err ? err : ''}</Text>
                    <Text className={`text-red-500`}>{errNcodeLength ? errNcodeLength : ''}</Text>
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
                    const isPhoneExist = dataCustomer.some((item) => item?.phone === numberCustomer);

                    if (isPhoneExist) {
                        setErr('شماره تلفن قبلا ثبت شده')
                        return
                    }

                    handleCreateNewCustomer(); 
                    setOpenAddCustomer(false) 
                }}
                onClose={(e) => {
                    e.preventDefault()
                    setOpenAddCustomer(false);  
                }}
                sx={{
                    width: '500px', 
                    '@media (max-width: 600px)': {
                        width: '92%',
                    },
                }}
            >
               {/* <Uploader
                    textOne={`لیست مشتریان خود را آپلود کنید`}
                    textTwo={`فرمت فایل حتما اکسل باشد`}
                    selectedFile={selectedFile}
                    onFileSelect={setSelectedFile}
                    preview={preview}
                    setPreview={setPreview}
                /> */}

                <div className='flex w-full gap-4 mt-4 max-[600px]:grid'>
                    <div className='w-full text-right'>
                        <Text>نام</Text>
                        <Input value={nameCustomer} onChange={(e) => setNameCustomer(e.target.value)} className={`w-full mt-2`} placeholder={`نام مشتری را وارد کنید`}/>
                    </div>
                    <div className='w-full text-right'>
                        <Text className={`text-right`}>نام خانوادگی</Text>
                        <Input value={lastNameCustomer} onChange={(e) => setLastNameCustomer(e.target.value)} className={`w-full mt-2`} placeholder={`نام خانوادگی مشتری را وارد کنید`}/>
                    </div>
                </div>

                <Text className={`text-right mt-4`}>شماره تماس</Text>
                <Input value={numberCustomer} onChange={(e) => setNumberCustomer(e.target.value)} inputMode={`numeric`} className={`w-full mt-2 text-left ${err ? 'border !border-red-500' : ''}`} placeholder={`09111111111`}/>

                <Text className={`text-right mt-4`}>آدرس</Text>
                <Input value={addressCustomer} onChange={(e) => setAddressCustomer(e.target.value)} className={`w-full mt-2 mb-4`} placeholder={`آدرس را وارد کنید`}/>

                <Text className={`text-red-500`}>{err ? err : ''}</Text>
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
                     const isPhoneExist = dataDriver?.results?.some((item) => item?.phone === phoneDriver);

                    if (isPhoneExist) {
                        setErr('شماره تلفن قبلا ثبت شده')
                        return
                    }
                    handleCreateNewDriver();
                    setOpenAddCouriers(false); 
                }}
                onClose={(e) => {
                    e.preventDefault()
                    setOpenAddCouriers(false);  
                }}
                sx={{
                    width: '500px', 
                    '@media (max-width: 600px)': {
                        width: '92%',
                    },
                }}
            >
                <div className=' text-right'>
                    <div className='m-auto text-center'>
                        <img src={ImgGift} className='m-auto my-8'  alt="" />
                    </div>

                    <div className='grid grid-cols-2 gap-4 max-[600px]:grid-cols-1'>
                        <div className='text-right'>
                            <Text className={`mt-4 mb-2`}>نام و نام خانوادگی</Text>
                            <Input value={nameDriver} onChange={(e) => setNameDriver(e.target.value)} className={`w-full`} placeholder={`نام محصول را وارد کنید`}/>
                        </div>
                        <div className='text-right'>
                            <Text className={`mt-4 mb-2`}>شماره تماس</Text>
                            <Input value={phoneDriver} onChange={(e) => setPhoneDriver(e.target.value)} inputMode={`numeric`} className={`w-full text-left ${err ? 'border !border-red-500' : ''}`} placeholder={`۰۹۱۲۳۴۵۶۷۸۹`}/>
                        </div>                    
                    </div>

                    <div className='text-right'>
                        <Text className={`mt-4 mb-2`}>آدرس</Text>
                        <Input value={addressDriver} onChange={(e) => setAddressDriver(e.target.value)} className={`w-full text-right mb-4`} placeholder={`آدرس پیک را وارد کنید`}/>
                    </div> 
                </div>
                <Text className={`text-red-500`}>{err ? err : ''}</Text>
            </GeneralModal>
        </div>
    )
}

export default Management
