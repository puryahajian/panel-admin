
import React from 'react'
import ImgLogin from '../../../assets/image/Layer-login.png'
import TextBold from '../../atoms/text-bold'
import Title from '../../atoms/title'
import Input from '../../atoms/input'
import ButtonGeneral from '../../atoms/button-general'
import { useState } from 'react'
import Text from '../../atoms/text'
import Loading from '../../atoms/loading'
import usePostLogin from '../../db/use-post-login'
import { useNavigate } from 'react-router-dom'
import usePostVerify from '../../db/use-post-verify'
import OTPInput from 'react-otp-input'
import '../../../App.css'

function MolLogin() {
    const { mutate, isPending } = usePostLogin();
    const { mutate: mutateVerify, isPending: isPendingVerify } = usePostVerify();
    const [step, setStep] = useState(1);
    const [userName, setUserName] = useState('');
    const [messageError, setMessageError] = useState('');
    const [otp, setOtp] = useState('');

    const navigate = useNavigate();

    const handleSubmitLogin = () => {
        mutate(
            {
                userName
            },
            {
                onSuccess: () => {
                    setStep(2)
                },
                onError: (error) => {
                    setMessageError('نام کاربری یا کلمه عبور اشتباه است !')
                },
            }
        )
    }

    const handleSubmitVerify = () => {
        mutateVerify(
            {
                otp, userName
            },
            {
                onSuccess: () => {
                    navigate('/')
                },
                onError: (error) => {
                    setMessageError('نام کاربری یا کلمه عبور اشتباه است !')
                },
            }
        )
    }

    const handleGoRegister = () => {
        window.open("https://register.iranishop.om/", "_blank");
    }

    return (
        <div className='flex flex-row h-dvh justify-center gap-32 items-center max-[1024px]:flex-col-reverse'>
            <div>
                <div className='text-center m-auto max-[990px]:w-[325px]'>
                    <TextBold>خوش آمدید!</TextBold>
                    <Title className={`mt-4`}>برای ورود شماره تلفن خود را وارد کنید</Title>
                    <div className='text-right mt-6'>
                        <Text className={`text-red-500 mb-2`}>{messageError}</Text>
                        <form className='max-w-[325px] max-[580px]:max-w-[100%] w-[325px] max-[580px]:w-full'>
                            {step === 1 && (
                                <>
                                    <Title>شماره تلفن را وارد کنید</Title>
                                    <Input value={userName} onChange={(e) => setUserName(e.target.value)} className={`w-full bg-transparent border text-left mt-2 ${messageError ? 'border-red-500' : ''}`}/>
                                </>
                            )}
                            {step === 2 && (
                                <div>
                                    <Title className={`mt-4`}>رمزعبور</Title>
                                    <div className="relative mt-4">
                                        {/* <input
                                            type={`text`}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className={`bg-transparent border w-full py-3 px-2 text-sm rounded-md outline-none placeholder:text-gray-400 ${
                                            messageError ? "border-red-500" : ""
                                            }`}
                                        /> */}
                                        <OTPInput
                                            containerStyle="otp-container"
                                            value={otp}
                                            onChange={setOtp}
                                            numInputs={4}
                                            renderInput={(props) => <input {...props} inputMode='numeric'/>}
                                            inputStyle="otp-input"
                                            shouldAutoFocus
                                        />
                                    </div>
                                </div>
                            )}

                            {step === 1 && (
                                <ButtonGeneral className={`bg-customBlue w-full min-w-[150px] max-[680px]:w-[100%] border-none text-white mt-6 py-4`} 
                                    onClick={(e) =>{ 
                                        e.preventDefault()
                                        handleSubmitLogin()
                                    }}>
                                    {isPending ? <Loading/> : "دریافت کد تایید"}
                                </ButtonGeneral>
                            )}
                            {step === 2 && (
                                <ButtonGeneral className={`bg-customBlue w-full min-w-[150px] max-[680px]:w-[100%] border-none text-white mt-6 py-4`} 
                                    onClick={(e) =>{ 
                                        e.preventDefault()
                                        handleSubmitVerify()
                                    }}>
                                    {isPendingVerify ? <Loading/> : "ورود"}
                                </ButtonGeneral>
                            )}

                            <div className='mt-6 mb-2 text-center w-full m-auto'>
                                <Text className={`flex gap-2 text-center m-auto w-full justify-center`}>آیا ثبت نام نیستید ؟<div className='text-customBlue font-bold cursor-pointer' onClick={handleGoRegister}> ثبت نام</div></Text>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
            <div className='flex justify-center'>
                <img src={ImgLogin} className='max-[680px]:w-[224px] max-[680px]:h-[200px] w-[400px] h-[400px]' alt="" />
            </div>
        </div>
    )
}

export default MolLogin
