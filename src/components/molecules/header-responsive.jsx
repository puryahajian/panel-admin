import React, { useEffect, useState } from 'react'
import MenuBar from '../../assets/image/Vector.png'
import useGetInfo from '../db/use-get-info'
import User from '../../assets/image/arrow_12363532.png'
import OffcanvasMenu from './offcanvas';
import MenuPanel from '../../lib/menu-panel';
import GeneralModal from './modal-general';
import Cookies from "js-cookie";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoDefault from '../../assets/image/default-logo.png'

function HeaderResponsive({step, setStep}) {
    const { data: dataInfo } = useGetInfo();
    const details = dataInfo?.results
    const navigate = useNavigate();
    const location = useLocation();
    const { data } = useGetInfo('');
    const [openProfileState , setOpenProfileState] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        const currentIndex = MenuPanel.findIndex((tab) => tab.path === location.pathname);
        if (currentIndex !== -1) {
        setStep(currentIndex);
        }
    }, [location.pathname, setStep]);

    const handleUserClick = () => setOpenProfileState(true);

    return (
        <div className='hidden max-[1024px]:flex justify-between items-center py-4 px-4 max-[390px]:py-4 z-[1000] fixed top-0 w-full bg-white opacity-95'>
            <OffcanvasMenu
                onClose={toggleMenu}
                onClick={toggleMenu}
                contentButton={<img src={MenuBar} className='w-6 h-6 z-20' alt="" />}
                isOpen={isOpen}
                step={step}
                setStep={setStep}
            >
                <div>
                    <img src={data?.logo} className='mb-10 w-16 m-auto' alt="" />
                    {MenuPanel.map((tab, index) => (
                        <Link
                            key={index}
                            onClick={() => {
                                setStep(index);
                                toggleMenu();
                            }}
                            to={tab.path}
                            className={`px-2 flex items-center gap-2 py-3 cursor-pointer text-right w-full rounded-lg ${
                                step === index
                                    ? 'bg-customBlue text-white'
                                    : 'bg-bgMenuDashboard text-grayText'
                            }`}
                            aria-controls={`vertical-tabpanel-${index}`}
                        >
                            <span className='font-sans text-sm '>{tab.label}</span>
                            
                        </Link>
                    ))}
                    
                </div>
            </OffcanvasMenu>
            {details?.map((item) => (
                // <img src={item?.logo} className='mb-10 w-16 m-auto' alt="" />
                <img src={item?.logo} onError={(e) => { 
                    e.target.onerror = null;
                    e.target.src = LogoDefault; 
                    }} className='w-[40px] h-[40px] z-20' alt="" />
            ))}
            
            <button onClick={handleUserClick}>
                <img src={User} className='w-6 h-6 z-20 rotate-180' alt="" />
            </button>

            {/* modal exit panel */}
            <GeneralModal
                open={openProfileState}
                handleClose={(e) => {
                    e.preventDefault(); 
                    setOpenProfileState(false)
                }}
                title="آیا می خواهید از اکانت خارج شوید ؟"
                actionText="بله"
                actionHandler={(e) => {
                    e.preventDefault(); 
                    setOpenProfileState(false);
                    navigate('/login');
                    Cookies.remove('access');
                    Cookies.remove('refresh');
                }}
                onClose={(e) => {
                    e.preventDefault()
                    setOpenProfileState(false);  
                }}
                sx={{
                    width: '500px', 
                    '@media (max-width: 600px)': {
                        width: '93%',
                    },
                }}
            />
        </div>
    )
}

export default HeaderResponsive
