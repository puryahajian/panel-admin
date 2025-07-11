import React from 'react'
import ButtonGeneral from '../../atoms/button-general'
import Text from '../../atoms/text'
import IconUser from '../../../assets/image/47abcc97c2763336a579eb7937d9c6bf.jpg'
import HeaderTicket from './header-ticket'
import FormAnswer from './form-answer'
import useGetTicketPage from '../../db/use-get-ticket-page'
import Img from '../../atoms/img'

function Tickets() {
    const { data } = useGetTicketPage();
    return (
        <div className=' h-full max-[830px]:mx-4'>
            <div className='max-w-[800px] m-auto mt-6'>
                <HeaderTicket/>
            </div>

            <div className='max-w-[800px] m-auto shadow-lg rounded-lg'>
                {data && (
                    <>
                        <div className='bg-gray-100 flex items-center gap-6 mt-6 p-4 rounded-lg'>
                            <img src={IconUser} className='w-14 h-14 rounded-full' alt="" />
                        </div>
                        <div className='flex items-center gap-6 mt-6 p-4'>
                            <Text className={`mr-14`}>{data?.description}</Text>
                        </div>
                    </>
                )}

                {data?.messages.map((item, index) => (
                    <div key={index}>
                        {item?.is_user ? (
                            <>
                                <div className='bg-gray-100 flex items-center gap-6 mt-6 p-4 rounded-lg'>
                                    <img src={IconUser} className='w-14 h-14 rounded-full' alt="" />
                                    <div className='grid gap-1'>
                                        <Text>نام یوزر</Text>
                                        <Text className='!text-xs !text-gray-500'>02 اردیبهشت 1404، 16:34:48</Text>
                                    </div>
                                </div>
                                <div className='flex items-center gap-6 mt-6 p-4'>
                                    <Img src={item.file} href={item.file} />
                                    <Text>{item?.text}</Text>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='bg-gray-100 flex justify-end items-center gap-6 mt-6 p-4 rounded-lg'>
                                    <div className='grid gap-1 text-left'>
                                        <Text>ادمین</Text>
                                        <Text className='!text-xs !text-gray-500'>02 اردیبهشت 1404، 16:34:48</Text>
                                    </div>
                                    <img src={IconUser} className='w-14 h-14 rounded-full' alt="" />
                                </div>
                                <div className='flex justify-end items-center gap-6 mt-6 p-4'>
                                    <Text>{item?.text}</Text>
                                    <Img src={item.file} href={item.file}/>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>


            <FormAnswer/>
        </div>
    )
}

export default Tickets
