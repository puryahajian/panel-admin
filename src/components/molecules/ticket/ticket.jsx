import React, { useState } from 'react';
import Text from '../../atoms/text';
import GeneralModal from '../modal-general';
import { FormControl, MenuItem, Select } from '@mui/material';
import ButtonGeneral from '../../atoms/button-general';
import ModalLeft from '../modal-left';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Uploader from '../uploader';

function Ticket() {
    const [openSentTicket, setOpenSentTicket] = useState(false);
    const [title, setTitle] = useState('');
    const [selectedId, setSelectedId] = useState('');
    const [description, setDescription] = useState('');
    const [showLeft, setShowLeft] = useState(false);
    const [fileName, setFileName] = useState('');
    const [age, setAge] = React.useState('');
        
    const handleChange = (event) => {
        setAge(event.target.value);
    };

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
                actionText="ثبت"
                actionHandler={() => setOpenSentTicket(false)}
            >
                <Uploader
                    className={`h-full grid items-center mt-4`}
                    textOne={`عکس خود را انتخاب کنید`}
                    textTwo={`سایز تصویر شما نباید از ۲۰۰ کیلو بابت بیشتر باشه`}
                />

                <Text className='text-right mt-4'>موضوع :</Text>
                <input 
                    onChange={(e) => setTitle(e.target.value)} 
                    value={title} 
                    className='w-full border !border-Custom my-2 outline-none p-2 rounded' 
                />

                <Text className='text-right mt-4'>انتخاب کنید :</Text>
                <FormControl sx={{ minWidth: 120 }} className='w-full text-right !outline-none !py-0 !mt-2'>
                    <Select
                        className='!outline-none !py-0 border !border-gray-200'
                        value={age}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="">
                            <Text>
                                انتخاب وضعیت
                            </Text>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
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

                    <div className='absolute grid bottom-0 right-0 w-full'>
                        {fileName && <Text className='ml-2 text-gray-600'>{fileName}</Text>}
                        <div className='flex bg-gray-200 py-2'>
                            <ButtonGeneral 
                                className='!py-2 !px-3 !border-none bg-gray-200' 
                                // onClick={() => handlePostTicket(data?.ticket?.id)}
                            >
                                <SendIcon className='text-xs' />
                            </ButtonGeneral>
                            <input 
                                // value={valueMessage}
                                // onChange={(e) => setValueMessage(e.target.value)} 
                                className='w-full p-2 outline-none text-xs rounded-3xl placeholder:font-sans'
                                placeholder="توضیحات"
                            />
                            <label className='p-2 cursor-pointer bg-gray-200'>
                                <input 
                                    type='file' 
                                    className='hidden' 
                                    onChange={(e) => setFileName(e.target.files[0]?.name || '')}
                                />
                                <AttachFileIcon/>
                            </label>
                        </div>
                    </div>
                </div>
            </ModalLeft>
        </div>
    );
}

export default Ticket;