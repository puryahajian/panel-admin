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
    const { data: dataInfo } = useGetInfo();

    const [step, setStep] = useState(() => {
        const savedStep = localStorage.getItem('activeStep');
        return savedStep !== null ? parseInt(savedStep, 10) : 0;
    });

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('activeStep', step);
    }, [step]);

    const handleExit = () => {
        setOpen(false); 
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        navigate('/login');

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
                <button
                    className='border border-red-600 text-right py-3 px-2 rounded-lg'
                    onClick={() => setOpen(true)}
                >
                    <Text className={`text-red-500`}> خروج از حساب</Text>
                </button>
            </div>
            <HeaderResponsive step={step} setStep={setStep}/>
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
        </>
    )
}

export default MolPanel
