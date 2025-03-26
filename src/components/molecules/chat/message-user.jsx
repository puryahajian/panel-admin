import React from 'react'
import IconUser from '../../../assets/image/47abcc97c2763336a579eb7937d9c6bf.jpg'
import Text from '../../atoms/text';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function MessageUser() {
    return (
        <div className='flex justify-end w-full'>
            <div className='w-max flex gap-2 mt-2'> 
                <div className='p-2 '>
                    <div className='flex w-full justify-end'>
                        <Text>اسم یوزر</Text>
                    </div>
                    <Text className={`max-w-[300px]`}> لورم ایپسوملورم ایپسوملورم ایپسوملورم ایپسوملورم ایپسوملورم ایپسوملورم ایپسوملورم ایپسوملورم ایپسوم</Text>
                    <div className='flex w-full items-center gap-1 mt-2'>
                        <Text>1234</Text>
                        <AccessTimeIcon/>
                    </div>
                </div>
                <img src={IconUser} className='w-7 h-7 rounded-full' alt="" />
            </div>
        </div>
    )
}

export default MessageUser
