import React, { useState } from 'react';
import Text from '../../atoms/text';
import GeneralModal from '../modal-general';
import { FormControl, MenuItem, Select } from '@mui/material';
import ButtonGeneral from '../../atoms/button-general';
import ModalLeft from '../modal-left';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import SendIcon from '@mui/icons-material/Send';
import UseGetSection from '../../db/use-get-section';

function Ticket() {
    const { data } = UseGetSection();
    console.log(data)
    const [openSentTicket, setOpenSentTicket] = useState(false);
    const [title, setTitle] = useState('');
    const [selectedId, setSelectedId] = useState('');
    const [description, setDescription] = useState('');
    const [showLeft, setShowLeft] = useState(false);

    const handleCloseModalLeft = () => setShowLeft(false);
    // const handleChange = (event) => setSelectedId(event.target.value);

    return (
        <div>
            <div className='flex justify-between items-center'>
                <Text>تیکت ها</Text>
                <button
                    className='border border-customBlue text-right px-8 py-2 rounded-lg'
                    onClick={() => setOpenSentTicket(true)}
                >
                    <Text className='!text-customBlue'>ثبت تیکت</Text>
                </button>
            </div>

            <hr className='w-[95%] m-auto mt-4'/>

            <div className='border cursor-pointer !border-customBlue my-3 rounded flex justify-between items-center p-2'>
                <Text>تیکت جدید</Text>
                <ButtonGeneral onClick={() => setShowLeft(true)} className='border border-customBlue !px-4 !py-2'>
                    <Text>مشاهده</Text>
                </ButtonGeneral>
            </div>

            <GeneralModal
                open={openSentTicket}
                handleClose={() => setOpenSentTicket(false)}
                title="ثبت تیکت"
                content="این یک مودال عمومی است که در تمام بخش‌ها می‌توان از آن استفاده کرد."
                actionText="ارسال"
                actionHandler={() => setOpenSentTicket(false)}
            >
                <Text className='text-right mt-4'>موضوع :</Text>
                <input 
                    onChange={(e) => setTitle(e.target.value)} 
                    value={title} 
                    className='w-full border my-2 outline-none p-2 rounded' 
                />

                <Text className='text-right mt-4'>انتخاب کنید :</Text>
                <FormControl className='w-full !outline-none rounded' style={{direction: 'ltr'}} size="small">
                    <Select
                        className='!outline-none border-none mt-2'
                        // value={selectedId}
                        // onChange={handleChange}
                    >
                        {data?.results.map((item) => (
                            <MenuItem key={item?.id} className='bg-white'>
                                <Text className='!text-xs'>{item?.name}</Text>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Text className='text-right mt-4'>توضیحات :</Text>
                <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    className='resize-none w-full border !border-Custom mt-2 rounded outline-none p-2' 
                />
            </GeneralModal>

            <ModalLeft open={showLeft} onClose={handleCloseModalLeft}>
                <div className='rounded bg-bgMenuDashboard p-2 h-dvh bg-stone-100 relative'>
                    {/* {isLoading && <Loading />} */}
                    {/* {data ? ( */}
                        <div className='border-b border-gray-400 p-1 grid gap-2'>
                            <Text>title</Text>
                            <Text className='!text-justify'>description</Text>
                            <div className='text-left'>
                                <Text>
                                    {/* {timeAgo} */}
                                    <AccessTimeFilledIcon className='mr-1' />
                                </Text>
                            </div>
                        </div>

                    {/* ) : null} */}

                    {/* {data?.responses.map((item) => {
                        console.log(item)
                        const isValidDateResponse = item?.created_at && !isNaN(new Date(item?.created_at).getTime());
                        const timeAgoResponse = isValidDateResponse
                            ? formatDistanceToNow(new Date(item?.created_at), { 
                                addSuffix: true,
                                locale: faIR,
                            })
                            : "Invalid date";

                        return ( */}
                            <div
                                className='border-b border-gray-400 p-1 text-left rounded grid gap-2 my-2'
                                // key={item?.id}
                            >
                                <Text>response_text</Text>
                                <div className='text-right'>
                                    <Text>
                                        {/* {timeAgoResponse} */}
                                        <AccessTimeFilledIcon className='mr-1' />
                                    </Text>
                                </div>
                            </div>

                        {/* );
                    })} */}

                    <div className='absolute bottom-0 right-0 w-full flex'>
                        <ButtonGeneral 
                            className='!py-2 !px-3 border border-gray-400 rounded-l-none' 
                            // onClick={() => handlePostTicket(data?.ticket?.id)}
                        >
                            <SendIcon className='text-xs' />
                        </ButtonGeneral>
                        <input 
                            // value={valueMessage}
                            // onChange={(e) => setValueMessage(e.target.value)} 
                            className='w-full p-2 border border-gray-400 outline-none rounded !rounded-r-none placeholder:font-sans'
                            placeholder="توضیحات"
                        />
                    </div>
                </div>
            </ModalLeft>
        </div>
    );
}

export default Ticket;