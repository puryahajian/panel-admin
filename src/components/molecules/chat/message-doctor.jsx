import React from 'react'
import IconUser from '../../../assets/image/47abcc97c2763336a579eb7937d9c6bf.jpg'
import Text from '../../atoms/text';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function MessageDoctor() {
    return (
        <div className='w-max flex gap-2 mb-2'>
            <img src={IconUser} className='w-7 h-7 rounded-full' alt="" />
            <div className='p-2 '>
                <Text>اسم دکتر</Text>
                <Text className={`max-w-[300px]`}>لورم ایپسوملورم ایپسوم</Text>
                <div className='flex w-full justify-end items-center gap-1 mt-2'>
                    <Text>1234</Text>
                    <AccessTimeIcon/>
                </div>
            </div>
        </div>
    )
}

export default MessageDoctor
