import React, { useState } from 'react'
import MenuPanel from '../../lib/menu-panel';
import Logo from '../../assets/image/logo.png'
import Text from '../atoms/text';
import GeneralModal from '../molecules/modal-general';
import { FormControl, MenuItem, Select } from '@mui/material';
import Ticket from '../molecules/ticket/ticket';
import RequestVisit from '../molecules/request-visit/request-visit';

function TabPanel({ children, step, index }) {
    return (
        <div
            role="tabpanel"
            hidden={step !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            style={{ padding: '32px', backgroundColor: 'white', color: 'black', borderRadius: '8px' }}
        >
            {step === index && <div>{children}</div>}
        </div>
    );
}

function MolPanel() {
    const [step, setStep] = useState(0);
    const [open, setOpen] = useState(false);
    

    return (
        <>
        <div className='flex'>
            <div className='w-[219px] text-white py-6 content-between px-4 h-dvh grid gap-4 border border-gray-400 sticky top-0'>
                <div>
                    <img src={Logo} className='mb-10' alt="" />
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

                <div className='grid gap-2'>
                    <button
                        className='border border-red-600 text-right p-4 rounded-lg'
                        onClick={() => setOpen(true)}
                    >
                        <Text className={`text-red-500`}> خروج از حساب</Text>
                    </button>
                </div>

            </div>
            <div className=' max-[990px]:ml-0 max-[990px]:mt-4 grow'>
                <TabPanel step={step} index={0}>
                    {/* <Dashboard/> */}
                    <RequestVisit/>
                </TabPanel>
                <TabPanel step={step} index={1}>
                    {/* <Orders/> */}
                </TabPanel>
                <TabPanel step={step} index={2}>
                    {/* <Products/> */}
                </TabPanel>
                <TabPanel step={step} index={3}>
                    {/* <Management/> */}
                </TabPanel>
                <TabPanel step={step} index={4}>
                    {/* <Setting/> */}
                </TabPanel>
                <TabPanel step={step} index={5}>
                    <Ticket/>
                </TabPanel>
                <TabPanel step={step} index={6}>
                    7
                </TabPanel>
            </div>
        </div>
        <GeneralModal
            open={open}
            handleClose={() => setOpen(false)}
            title="آیا می خواهید از اکانت خود خارج شوید ؟"
            // content="این یک مودال عمومی است که در تمام بخش‌ها می‌توان از آن استفاده کرد."
            actionText="بله"
            actionHandler={() => { setOpen(false); }}
        />
        </>
    )
}

export default MolPanel
