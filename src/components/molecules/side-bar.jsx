import React, { useEffect, useState } from 'react'
import useGetInfo from '../db/use-get-info';
import MenuPanel from '../../lib/menu-panel';
import Text from '../atoms/text';
import { Link, useLocation } from 'react-router-dom';

function SideBar() {
    const { data: dataInfo } = useGetInfo();
    const [open, setOpen] = useState(false);

    const [step, setStep] = useState(0);

    const location = useLocation();

    useEffect(() => {
        const currentIndex = MenuPanel.findIndex(tab => tab.path === location.pathname);
        if (currentIndex !== -1) {
            setStep(currentIndex);
        }
    }, [location.pathname]);

    return (
        <div className='w-[219px] min-w-[219px] text-white py-6 content-between px-4 h-dvh grid gap-4 border-l border-gray-400 sticky top-0 max-[1024px]:hidden'>
            <div>
                <img src={dataInfo?.logo} className='mb-10 w-16 m-auto' alt="" />
                {MenuPanel.map((tab, index) => (
                    <Link
                        key={index}
                        to={tab.path}
                        onClick={() => setStep(index)}
                        className={`px-2 flex items-center gap-2 py-3 cursor-pointer text-right w-full rounded-lg ${
                            step === index
                                ? 'bg-customBlue text-white'
                                : 'bg-bgMenuDashboard text-grayText'
                        }`}
                        aria-controls={`vertical-tabpanel-${index}`}
                    >
                        <span className='font-sans text-sm'>{tab.label}</span>
                    </Link>
                ))}
                
            </div>
            <button
                className='border border-red-600 text-right py-3 px-2 rounded-lg'
                onClick={() => setOpen(true)}
            >
                <Text className={`text-red-500`}> خروج از حساب</Text>
            </button>
        </div>
    )
}

export default SideBar
