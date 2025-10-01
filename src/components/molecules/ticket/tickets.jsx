import React from 'react'
import ButtonGeneral from '../../atoms/button-general'
import Text from '../../atoms/text'
import IconUser from '../../../assets/image/47abcc97c2763336a579eb7937d9c6bf.jpg'
import HeaderTicket from './header-ticket'
import FormAnswer from './form-answer'
import useGetTicketPage from '../../db/use-get-ticket-page'
import Img from '../../atoms/img'
import DateShamsi from '../date-shamsi'

function Tickets() {
    const { data } = useGetTicketPage();
    // console.log(data)
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
                            <div className='grid gap-2'>
                                <Text><DateShamsi hour={`2-digit`} minute={`2-digit`} date={data?.ticket?.created_at}/></Text>
                                <Text>موضوع : {data?.ticket?.title}</Text>
                            </div>
                        </div>
                        <div className='flex items-center gap-6 mt-6 p-4'>
                            <Text>{data?.ticket?.description}</Text>
                        </div>
                    </>
                )}

                {data?.responses.map((item, index) => (
                    <div key={index}>
                        {item?.sender === 1 ? (
                            <>
                                <div className='bg-gray-100 flex items-center gap-6 mt-6 p-4 rounded-lg'>
                                    <img src={IconUser} className='w-14 h-14 rounded-full' alt="" />
                                    <div className='grid gap-1'>
                                        <Text> یوزر</Text>
                                        <Text className='!text-xs !text-gray-500'><DateShamsi hour={`2-digit`} minute={`2-digit`} date={item?.created_at}/></Text>
                                    </div>
                                </div>
                                <div className='flex items-center gap-6 mt-6 p-4'>
                                    {item?.file && <Img src={item.file} href={item.file} />}
                                    <Text>{item?.response_text}</Text>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='bg-gray-100 flex justify-end items-center gap-6 mt-6 p-4 rounded-lg'>
                                    <div className='grid gap-1 text-left'>
                                        <Text>ادمین</Text>
                                        <Text className='!text-xs !text-gray-500'><DateShamsi hour={`2-digit`} minute={`2-digit`} date={item?.created_at}/></Text>
                                    </div>
                                    <img src={IconUser} className='w-14 h-14 rounded-full' alt="" />
                                </div>
                                <div className='flex justify-end items-center gap-6 mt-6 p-4'>
                                    <Text>{item?.response_text}</Text>
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
