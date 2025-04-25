import React, { useState } from 'react'
import ImgLogin from '../../../assets/image/undraw_drag_8oyk.png'
import TextBold from '../../atoms/text-bold'
import Title from '../../atoms/title'
import Input from '../../atoms/input'
import ButtonGeneral from '../../atoms/button-general'
import UsePostLogin from '../../db/use-post-login'
import { useNavigate } from 'react-router-dom'
import Loading from '../../atoms/loading'
import Text from '../../atoms/text'

function MolLogin() {
    const { mutate, isLoading } = UsePostLogin();
    const [number, setNumber] = useState();
    const [pass, setPass] = useState();
    const navigate = useNavigate();
    const [err, setErr] = useState();

    const handlePostLogin = (e) => {
        e.preventDefault();
        mutate(
            {
                number, pass
            },
            {
                onSuccess: (data) => {
                    navigate('/')
                },
                onError: (error) => {
                    setErr('شماره تلفن یا کلمه عبور اشتباه است!')
                }
            }
        )
    }

    return (
        <div className='grid grid-cols-2 h-dvh items-center'>
            <div>
                <div className='text-center max-w-md m-auto'>
                    <TextBold>خوش آمدید!</TextBold>
                    <Title>برای ورود نام کاربری و رمزعبور خود را وارد کنید</Title>
                    <Text className={`text-right mt-4 text-red-500`}>{err}</Text>
                    <div className='text-right mt-4'>
                        <form onSubmit={handlePostLogin}>
                            <Title>شماره تلفن</Title>
                            <Input onChange={(e) => setNumber(e.target.value)} className={`w-full bg-transparent border mt-2 ${err && 'border-red-500'}`}/>

                            <Title className={`mt-4`}>رمزعبور</Title>
                            <Input onChange={(e) => setPass(e.target.value)} className={`w-full bg-transparent border mt-2 ${err && 'border-red-500'}`}/>

                            <ButtonGeneral className={`bg-customBlue w-full border-none text-white mt-6 py-4`}>
                                {isLoading ? <Loading/> : <Text className={`text-white`}>ورود به حساب</Text>} 
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
