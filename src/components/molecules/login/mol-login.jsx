
import React from 'react'
import ImgLogin from '../../../assets/image/Layer-login.png'
import TextBold from '../../atoms/text-bold'
import Title from '../../atoms/title'
import Input from '../../atoms/input'
import ButtonGeneral from '../../atoms/button-general'
import { useState } from 'react'
import Text from '../../atoms/text'
import Loading from '../../atoms/loading'
import UsePostLogin from '../../db/use-post-login'
import { useNavigate } from 'react-router-dom'

function MolLogin() {
    const { mutate, isPending } = UsePostLogin();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [messageError, setMessageError] = useState('');
    const navigate = useNavigate();

    const handleSubmitLogin = () => {
        mutate(
            {
                userName, password
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
                    <Title>برای ورود نام کاربری و رمزعبور خود را وارد کنید</Title>
                    <div className='text-right mt-6'>
                        <Text className={`text-red-500 mb-2`}>{messageError}</Text>
                        <form>
                            <Title>نام کاربری</Title>
                            <Input value={userName} onChange={(e) => setUserName(e.target.value)} className={`w-full bg-transparent border mt-2 ${messageError ? 'border-red-500' : ''}`}/>

                            <Title className={`mt-4`}>رمزعبور</Title>
                            <Input value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full bg-transparent border mt-2 ${messageError ? 'border-red-500' : ''}`}/>

                            <ButtonGeneral className={`bg-customBlue w-full border-none text-white mt-6 py-4`} 
                                onClick={(e) =>{ 
                                    e.preventDefault()
                                    handleSubmitLogin()
                                }}>
                                {isPending ? <Loading/> : "ورود به پنل"}
                            </ButtonGeneral>
                            
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
