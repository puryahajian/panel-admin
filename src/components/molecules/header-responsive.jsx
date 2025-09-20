import React, { useState } from 'react'
import MenuBar from '../../assets/image/Vector.png'
import useGetInfo from '../db/use-get-info'
import User from '../../assets/image/arrow_12363532.png'
import OffcanvasMenu from './offcanvas';
import MenuPanel from '../../lib/menu-panel';
import GeneralModal from './modal-general';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import Text from '../atoms/text';


function HeaderResponsive({step, setStep, setOpenModalEdit}) {
    const navigate = useNavigate();
    const { data } = useGetInfo('');
    const [openProfileState , setOpenProfileState] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

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
                        <button
                            key={index}
                            onClick={() => {
                                setStep(index);
                                toggleMenu();
                            }}
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
                    <button
                        className='border w-full border-gray-700 text-right py-3 px-2 mt-4 rounded-lg'
                        onClick={() => {
                            setIsOpen(false)
                            setOpenModalEdit(true)
                        }}
                    >
                        <Text>پروفایل</Text>
                    </button>
                    
                </div>
            </OffcanvasMenu>

            {/* <img src={data?.logo} className='w-[40px] h-[40px] z-20' alt="" /> */}
            <Text className={` text-center`}>پنل فروشندگان ایرانی شاپ</Text>

            
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
