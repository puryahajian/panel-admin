import React from 'react'
import ImgLogin from '../../../assets/image/Layer-login.png'
import TextBold from '../../atoms/text-bold'
import Title from '../../atoms/title'
import Input from '../../atoms/input'
import ButtonGeneral from '../../atoms/button-general'

function MolLogin() {
    return (
        <div className='grid grid-cols-2 h-dvh items-center'>
            <div>
                <div className='text-center max-w-md m-auto'>
                    <TextBold>خوش آمدید!</TextBold>
                    <Title>برای ورود نام کاربری و رمزعبور خود را وارد کنید</Title>
                    <div className='text-right mt-6'>
                        <form action="">
                            <Title>نام کاربری</Title>
                            <Input className={`w-full bg-transparent border mt-2`}/>

                            <Title className={`mt-4`}>رمزعبور</Title>
                            <Input className={`w-full bg-transparent border mt-2`}/>

                            <ButtonGeneral className={`bg-customBlue w-full border-none text-white mt-6 py-4`}>ورود به حساب</ButtonGeneral>
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
