import React from 'react';
import Text from '../../atoms/text';
import DoneIcon from '@mui/icons-material/Done';

function Stepper({ activeStep, setActiveStep }) {
    const steps = [
        { id: 1, title: 'تایید شده' },
        { id: 2, title: 'زمان' },
        { id: 3, title: 'پیک' },
        { id: 4, title: 'درحال ارسال' },
        { id: 5, title: 'ارسال شده' },
    ];

    return (
        <div className="mt-7 gap-6 flex justify-between items-center w-full">
            {steps.map((step, index) => (
                <React.Fragment key={index}>
                    <div
                        className={`flex w-full flex-col items-center ${
                            step.id <= activeStep ? 'text-customBlue' : 'text-gray-500'
                        }`}
                    >
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                step.id <= activeStep ? 'bg-customBlue !text-white' : 'border-2 border-gray-400'
                            } transition-all duration-300`}
                            >
                            <Text
                                className={`${
                                    step.id <= activeStep ? 'bg-customBlue text-white' : '!text-gray-400'
                                } flex items-center justify-center`}
                            >
                                {step.id <= activeStep ? (
                                <DoneIcon
                                    className={`text-white ${step.id <= activeStep ? 'animate-tick' : ''}`}
                                />
                                ) : (
                                    step.id
                                )}
                            </Text>
                        </div>
                        <Text
                            className={`mt-2 w-full ${
                                step.id <= activeStep ? '!text-customBlue' : '!text-gray-400'
                            }`}
                            >
                            {step.title}
                        </Text>
                    </div>
                    {step.id !== 5 && (
                        <hr
                            className={`${
                                step.id < activeStep ? 'border-customBlue' : 'border-gray-400'
                            } w-full border`}
                        />
                    )}

                    
                </React.Fragment>
            ))}
            
        </div>
    );
}

export default Stepper;