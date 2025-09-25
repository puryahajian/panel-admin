import React, { useEffect, useState } from 'react'
import MenuPanel from '../../lib/menu-panel';
// import Logo from '../../assets/image/logo.png'
import Dashboard from '../molecules/dashboard/dashboard';
import Text from '../atoms/text';
import Orders from '../molecules/orders/orders'
import Products from '../molecules/products/products';
import Management from '../molecules/management/management';
import Setting from '../molecules/setting.jsx/setting';
import GeneralModal from '../molecules/modal-general';
import Logo from '../../assets/image/logoIrani.png';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import useGetInfo from '../db/use-get-info';
import HeaderResponsive from '../molecules/header-responsive';
import Discount from '../molecules/discount/discount';
import useGetProfile from '../db/use-get-profile';
import Title from '../atoms/title';
import InputNumberic from '../atoms/input-numberic';
import usePatchProfile from '../db/use-patch-profile';

function TabPanel({ children, step, index }) {
    return (
        <div
            role="tabpanel"
            hidden={step !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            className='p-4'
            style={{backgroundColor: 'white', color: 'black', borderRadius: '8px', width: '100%' }}
        >
            {step === index && <div>{children}</div>}
        </div>
    );
}

function MolPanel() {
    const {data} = useGetProfile();
    // console.log(data)
    const {mutate} = usePatchProfile();
    const [step, setStep] = useState(() => {
        const savedStep = localStorage.getItem('activeStep');
        return savedStep !== null ? parseInt(savedStep, 10) : 0;
    });

    const [open, setOpen] = useState(false);
    const [getDataBank, setGetDataBank] = useState('');
    const [openEditSnba, setOpenEditSnba] = useState(false);
    const [snba, setSnba] = useState(data?.shomare_shaba);
    const [hesab, setHesab] = useState(data?.shomare_hesab);
    const [kart, setKart] = useState(data?.card_number);

    const [openModalEdit, setOpenModalEdit] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('activeStep', step);
    }, [step]);

    const handleExit = () => {
        setOpenModalEdit(false); 
        Cookies.remove("access")
        Cookies.remove("refresh")
        navigate('/login')
    }

    const handleEdit = () => {
        mutate(
            {
                snba, kart, hesab
            },
            {
                onSuccess: (data) => {
                    // console.log(data)
                    setOpenEditSnba(false)
                },
                onError: (err) => {
                    // console.log(err)
                    // setOpenEditSnba(false)
                }
            }
        )
    }



    return (
        <>
        <div className='flex'>
            <div className='w-[219px] min-w-[219px] text-white py-6 content-between px-4 h-dvh grid gap-4 border-l border-gray-400 sticky top-0 max-[1024px]:hidden'>
                <div>
                    <div className='flex items-center gap-2 w-full justify-center'>
                        <Text className={`mb-8 text-center`}>پنل فروشندگان ایرانی شاپ</Text>
                        <img src={Logo} className='mb-10 w-6' alt="" />
                    </div>
                    
                    {MenuPanel.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => setStep(index)}
                            className={`px-2 flex items-center gap-2 py-3 cursor-pointer text-right w-full rounded-lg ${
                                step === index
                                    ? 'bg-customBlue text-white'
                                    : 'bg-bgMenuDashboard text-grayText'
                            }`}
                            aria-controls={`vertical-tabpanel-${index}`}
                        >
                            <span className='font-sans text-sm '>{tab.label}</span>
                            
                        </button>
                    ))}
                    
                </div>

                <div>
                    <button
                        className='border w-full border-gray-700 text-right py-3 px-2 rounded-lg'
                        onClick={() => setOpenModalEdit(true)}
                    >
                        <Text>پروفایل</Text>
                    </button>
                    <button
                        className='border w-full mt-4 border-red-600 text-right py-3 px-2 rounded-lg'
                        onClick={() => setOpen(true)}
                    >
                        <Text className={`text-red-500`}> خروج از حساب</Text>
                    </button>
                </div>
            </div>
            <HeaderResponsive setOpenModalEdit={setOpenModalEdit} step={step} setStep={setStep}/>
            <div className=' grow max-[1024px]:mt-[60px]'>
                {/* <TabPanel step={step} index={0}>
                    <Dashboard/>
                </TabPanel> */}
                {/* <TabPanel step={step} index={1}>
                    <Orders/>
                </TabPanel> */}
                <TabPanel step={step} index={0}>
                    <Products/>
                </TabPanel>
                {/* <TabPanel step={step} index={3}>
                    <Management/>
                </TabPanel>
                <TabPanel step={step} index={4}>
                    <Setting/>
                </TabPanel>
                <TabPanel step={step} index={5}>
                    <Discount/>
                </TabPanel>
                <TabPanel step={step} index={6}>
                    7
                </TabPanel> */}
            </div>
        </div>
        <GeneralModal
            open={open}
            handleClose={(e) => {
                e.preventDefault();
                setOpen(false)
            }}
            title="آیا می خواهید از اکانت خود خارج شوید ؟"
            // content="این یک مودال عمومی است که در تمام بخش‌ها می‌توان از آن استفاده کرد."
            actionText="بله"
            actionHandler={(e) => { 
                e.preventDefault();
                handleExit()
            }}
            onClose={()=> setOpen(false)}
            sx={{
                width: '500px', 
                '@media (max-width: 840px)': {
                    width: '92%',
                },
            }}
        />

        <GeneralModal
            open={openModalEdit}
            handleClose={(e) => {
                e.preventDefault();
                setOpenModalEdit(false)
            }}
            title="پروفایل"
            classTitle={`!font-bold text-right`}
            // content="این یک مودال عمومی است که در تمام بخش‌ها می‌توان از آن استفاده کرد."
            // actionText="ذخیره"
            classAccept={`hidden`}
            exitButton={`بازگشت`}
            actionHandler={(e) => { 
                e.preventDefault();
                // handleExit()
            }}
            onClose={()=> setOpenModalEdit(false)}
            sx={{
                width: '500px', 
                '@media (max-width: 840px)': {
                    width: '92%',
                },
            }}
        >
            <div className='grid grid-cols-2 mt-4'>
                <div className='text-right'>
                    <Text className={`mb-2`}>نام</Text>
                    <Title>{data?.name}</Title>
                </div>
                <div className='text-right'>
                    <Text className={`mb-2`}>نام خانوادگی</Text>
                    <Title>{data?.family}</Title>
                </div>
            </div>
            <div className='grid grid-cols-2 text-right mt-4'>
                <div className='text-right'>
                    <Text className={`mb-2`}>شماره تلفن</Text>
                    <Title>{data?.phone}</Title>
                </div>
                <div className='text-right'>
                    <Text className={`mb-2`}> آدرس</Text>
                    <Title>{data?.address}</Title>
                </div>
            </div>

            <div className='flex justify-between items-center'>
                <div>
                    <div className='text-right mt-4'>
                        <Text>شماره شبا</Text>
                        <Title className={`mt-2`}>{data?.shomare_shaba === null ? 'موجود نیست' : `IR - ${data?.shomare_shaba}`}</Title>
                    </div>
                    <div className='text-right mt-4'>
                        <Text>شماره حساب</Text>
                        <Title className={`mt-2`}>{data?.shomare_hesab === null ? 'موجود نیست' : `IR - ${data?.shomare_hesab}`}</Title>
                    </div>
                    <div className='text-right mt-4'>
                        <Text>شماره کارت</Text>
                        <Title className={`mt-2`}>{data?.card_number === null ? 'موجود نیست' : `IR - ${data?.card_number}`}</Title>
                    </div>
                </div>


                <svg 
                    onClick={() => {
                        if (!data?.shomare_shaba || !data?.shomare_hesab || !data?.card_number) {
                            setOpenEditSnba(true);
                            setGetDataBank(data)
                        } else {
                            return;
                        }
                    }}
                    className={!data?.shomare_shaba || !data?.shomare_hesab || !data?.card_number ? '' : 'cursor-not-allowed'}
                    xmlns="http://www.w3.org/2000/svg" 
                    width={24} 
                    height={24} 
                    viewBox="0 0 512 512">
                        <defs>
                            <path id="SVGkrQfddLX" fill={!data?.shomare_shaba || !data?.shomare_hesab || !data?.card_number ? '#dc2626' : '#ccc'} d="M426.667 373.333V416H0v-42.667zM186.019 91.314l96 95.999l-143.352 143.354h-96v-96zM277.333 0l96 96l-68.686 68.686l-96-96z">
                            </path>
                        </defs><use fillRule="evenodd" href="#SVGkrQfddLX" transform="translate(42.667 53.333)"></use>
                </svg>
            </div>
        </GeneralModal>

        <GeneralModal
            open={openEditSnba}
            handleClose={(e) => {
                e.preventDefault();
                setOpenEditSnba(false)
            }}
            // title="آیا می خواهید از اکانت خود خارج شوید ؟"
            classTitle={`hidden`}
            // content="این یک مودال عمومی است که در تمام بخش‌ها می‌توان از آن استفاده کرد."
            actionText="ذخیره"
            actionHandler={(e) => { 
                e.preventDefault();
                handleEdit()
            }}
            onClose={()=> setOpenEditSnba(false)}
            sx={{
                width: '500px', 
                '@media (max-width: 840px)': {
                    width: '92%',
                },
            }}
        >
            <div className='text-right mt-4'>
                <Text>شماره شبا</Text>
                <div className='relative mt-2'>
                    <Text className={`absolute left-2 top-[14px]`}> - IR</Text>
                    <InputNumberic defaultValue={getDataBank?.shomare_shaba} className={`w-full pl-9`} value={snba} onChange={(e) => setSnba(e.target.value)}/>
                </div>
            </div>
            <div className='text-right mt-4'>
                <Text>شماره کارت</Text>
                <InputNumberic defaultValue={getDataBank?.card_number} className={`w-full mt-2`} value={kart} onChange={(e) => setKart(e.target.value)}/>
            </div>
            <div className='text-right mt-4'>
                <Text>شماره حساب</Text>
                <InputNumberic defaultValue={getDataBank?.shomare_hesab} className={`w-full mt-2`} value={hesab} onChange={(e) => setHesab(e.target.value)}/>
            </div>
        </GeneralModal>
        </>
    )
}

export default MolPanel
