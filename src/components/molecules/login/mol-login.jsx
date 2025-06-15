
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
    const [password, setPassword] = useState('');
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

    return (
        <div className='grid grid-cols-2 h-dvh items-center'>
            <div>
                <div className='text-center max-w-md m-auto'>
                    <TextBold>خوش آمدید!</TextBold>
                    <Title className={`mt-4`}>برای ورود نام کاربری و رمزعبور خود را وارد کنید</Title>
                    <div className='text-right mt-6'>
                        <Text className={`text-red-500 mb-2`}>{messageError}</Text>
                        <form>
                            {step === 1 && (
                                <>
                                    <Title>نام کاربری</Title>
                                    <Input value={userName} onChange={(e) => setUserName(e.target.value)} className={`w-full bg-transparent border mt-2 ${messageError ? 'border-red-500' : ''}`}/>
                                </>
                            )}
                            {step === 2 && (
                                <>
                                    <Title className={`mt-4`}>رمزعبور</Title>
                                    <div className="relative mt-2">
                                        {/* <input
                                            type={`text`}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className={`bg-transparent border w-full py-3 px-2 text-sm rounded-md outline-none placeholder:text-gray-400 ${
                                            messageError ? "border-red-500" : ""
                                            }`}
                                        /> */}
                                        <OTPInput
                                            containerStyle={{
                                                gap: '50px',
                                                direction: 'ltr',
                                                marginTop: '16px'
                                            }}
                                            value={otp}
                                            onChange={setOtp}
                                            numInputs={4}
                                            renderInput={(props) => <input {...props} />}
                                            inputStyle="otp-input"
                                            shouldAutoFocus
                                        />
                                        {/* <button
                                            type="button"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            className="absolute top-[22px] left-2 transform -translate-y-1/2 text-sm text-gray-600"
                                        >
                                            {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                                        </button> */}
                                    </div>
                                </>
                            )}

                            {step === 1 && (
                                <ButtonGeneral className={`bg-customBlue w-full border-none text-white mt-6 py-4`} 
                                    onClick={(e) =>{ 
                                        e.preventDefault()
                                        handleSubmitLogin()
                                    }}>
                                    {isPending ? <Loading/> : "دریافت کد تایید"}
                                </ButtonGeneral>
                            )}
                            {step === 2 && (
                                <ButtonGeneral className={`bg-customBlue w-full border-none text-white mt-6 py-4`} 
                                    onClick={(e) =>{ 
                                        e.preventDefault()
                                        handleSubmitVerify()
                                    }}>
                                    {isPendingVerify ? <Loading/> : "ورود"}
                                </ButtonGeneral>
                            )}
                            
                        </form>
                    </div>
                </div>
            </div>
            <div>
                <img src={ImgLogin} alt="" />
            </div>
        </div>
    )
}

export default MolLogin
