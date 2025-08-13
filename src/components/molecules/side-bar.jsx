import React, { useEffect, useState } from 'react'
import useGetInfo from '../db/use-get-info';
import MenuPanel from '../../lib/menu-panel';
import Text from '../atoms/text';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../App.css'
import GeneralModal from './modal-general';
import Cookies from "js-cookie";
import LogoDefault from '../../assets/image/default-logo.png'

function SideBar() {
    const { data: dataInfo } = useGetInfo();
    const details = dataInfo?.results

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const [step, setStep] = useState(0);

    const location = useLocation();

    const handleItemClick = (index) => {
        setStep(index); 
    };

    const handleExit = () => {
        setOpen(false); 
        navigate('/login');
        Cookies.remove('access');
        Cookies.remove('refresh');
    }

    useEffect(() => {
        const currentIndex = MenuPanel.findIndex(tab => tab.path === location.pathname);
        if (currentIndex !== -1) {
            setStep(currentIndex);
        }
    }, [location.pathname]);

    return (
        <div className='w-full z-[10] bg-white min-w-[230px] text-white py-6 content-between px-4 h-dvh grid gap-4 border-l border-gray-400 max-[1024px]:hidden'>
            <div className='relative'>
                {details?.map((item) => (
                    <img src={item?.logo} onError={(e) => { 
                        e.target.onerror = null;
                        e.target.src = LogoDefault; 
                        }} className='mb-10 w-16 m-auto' alt="" />
                ))}
                <div className='hover-item bg-customBlue'style={{
                    transform: `translateY(${step * 44}px)`,
                    transition: 'transform 0.3s ease-in-out', 
                }}></div>

                {MenuPanel.map((tab, index) => (
                    <Link
                        key={index}
                        to={tab.path}
                        onClick={() => handleItemClick(index)}
                        className={`px-2 flex items-center z-30 gap-2 py-3 cursor-pointer text-right w-full rounded-lg bg-bgMenuDashboard text-grayText ${step === index ? 'active text-white transform transition-all duration-75' : ''}`}
                        aria-controls={`vertical-tabpanel-${index}`}
                    >
                        <span className='font-sans text-sm z-30'>{tab.label}</span>
                    </Link>
                ))}
                
            </div>
            <button
                className='border border-red-600 text-right py-3 px-2 rounded-lg'
                onClick={() => setOpen(true)}
            >
                <Text className={`text-red-500`}> خروج از حساب</Text>
            </button>

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
            />
        </div>
    )
}

export default SideBar
