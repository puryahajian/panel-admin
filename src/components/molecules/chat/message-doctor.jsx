import React from 'react'
import IconUser from '../../../assets/image/47abcc97c2763336a579eb7937d9c6bf.jpg'
import Text from '../../atoms/text';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import UseGetMessage from '../../db/use-get-message';
import moment from 'jalali-moment';

function MessageDoctor() {
    const {data} = UseGetMessage();

    return (
        <>
            {data?.results.map((items) => (
                <div className='w-max flex gap-2 mb-2'>
                    <img src={IconUser} className='w-7 h-7 rounded-full' alt="" />
                    <div className='p-2 '>
                        <Text>{items?.doctor}</Text>
                        <Text className={`max-w-[300px]`}>{items?.content}</Text>
                        <div className='flex w-full justify-end items-center gap-1 mt-2'>
                            <Text>{moment(items?.created_at).locale('fa').format('YYYY/MM/DD')}</Text>
                            <AccessTimeIcon/>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default MessageDoctor
