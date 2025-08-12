import React, { useState } from 'react'
import ButtonGeneral from '../../atoms/button-general'
import TabOrderList from './tab-order-list';
import TabReportList from './tab-report-list';


function TabOrder({ children, step, index }) {
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

function Orders() {
    const [step, setStep] = useState(0);

    const Buttons = [
        {label: "لیست سفارشات" },
        // {label: "لیست گزارشات " },
    ];

    return (
        <div>
            <div className='flex gap-4 fixed top-0 shadow-lg right-0 w-full bg-white py-4 max-[1024px]:mt-14'>
                {/* <ButtonGeneral className={`bg-grayText text-white`}>
                    لیست سفارشات
                </ButtonGeneral>
                <ButtonGeneral>
                    لیست گزارشات 
                </ButtonGeneral> */}
                {Buttons.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setStep(index)}
                        className={`px-7 py-3  mr-[235px] max-[1024px]:mr-4 rounded-lg text-sm font-sans text-grayText ${
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

            <TabOrder step={step} index={0}>
                <hr className='w-[95%] m-auto'/>
                <TabOrderList/>
            </TabOrder>
            {/* <TabOrder step={step} index={1}>
                <hr className='w-[95%] m-auto'/>
                <TabReportList/>
            </TabOrder> */}
        </div>
    )
}

export default Orders
