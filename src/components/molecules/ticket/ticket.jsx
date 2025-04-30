import React, { useState } from 'react';
import Text from '../../atoms/text';
import GeneralModal from '../modal-general';
import { FormControl, MenuItem, Select } from '@mui/material';
import ButtonGeneral from '../../atoms/button-general';
import ModalLeft from '../modal-left';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import UseSectionTicket from '../../db/use-section-ticket';
import UseCreateTicket from '../../db/use-create-ticket';
// import Loading from '../../atoms/loading';
import { toast } from 'react-toastify';
import UseGetAllTicket from '../../db/use-get-all-ticket';
import UseSentAnswer from '../../db/use-sent-answer';
import Img from '../../atoms/img';
import Audio from '../audio-player';
import Loading from '../../atoms/loading';
import Input from '../../atoms/input';
import Uploader from '../uploader';

function Ticket() {
    const [openSentTicket, setOpenSentTicket] = useState(false);
    const [err, setErr] = useState('');
    const [description, setDescription] = useState('');
    const [showLeft, setShowLeft] = useState(false);
    const [valueMessage, setValueMessage] = useState('');
    const [getIdTicket, setGetIdTicket] = useState('');
    const [fileName, setFileName] = useState('');
    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState('');
    const [title, setTitle] = useState('');
    const [section, setSection] = useState('');
    const { data } = UseSectionTicket('');
    const [selectedTicketId, setSelectedTicketId] = useState(null);
    const { mutate, isLoading } = UseCreateTicket('');
    const { data: dataAllTicket } = UseGetAllTicket('');
    const { mutate: mutateAnswer, isLoading: isLoadingAnswer } = UseSentAnswer('');

    const selectedTicket = dataAllTicket?.results.find(ticket => ticket.id === selectedTicketId);

    const handleCloseModalLeft = (e) => {
        e.preventDefault();
        setShowLeft(false);
    }

    const handleSubmitCreateTicket = (e) => {
        e.preventDefault();
        if (setSection || setDescription || setTitle === '') {
            setErr('فیلدها اجباری *')
            return
        }
        setOpenSentTicket(false);
        mutate(
            {
                section,
                description,
                selectedFile,
                title
            },
            {
                onSuccess: () => {
                    toast.success('تیکت ثبت شد');
                }
            }
        );
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFileName(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handlePostTicket = (ticketId) => {
        setGetIdTicket(ticketId)
    }

    const handleSubmitSentAnswer = (e) => {
        e.preventDefault();

        mutateAnswer(
            {
                getIdTicket, fileName, valueMessage
            }
        )
    }

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

            <hr className='w-[95%] m-auto mt-4' />

            {dataAllTicket?.results.map((item) => (
                <div key={item.id} className='border cursor-pointer !border-customBlue my-3 rounded-lg flex justify-between items-center p-2'>
                    <Text>{item?.title}</Text>
                    <ButtonGeneral onClick={() => {
                        setSelectedTicketId(item.id);
                        setShowLeft(true);
                    }} className='bg-customBlue border-none !px-4 !py-2'>
                        <Text className={`text-white`}>مشاهده</Text>
                    </ButtonGeneral>
                </div>
            ))}
            <div className='w-full flex justify-center mt-6'>
                {dataAllTicket?.count === 0 && <Text>تیکت موجود نیست</Text>}
            </div>

            <GeneralModal
                open={openSentTicket}
                onSubmit={handleSubmitCreateTicket}
                handleClose={(e) => {
                    e.preventDefault();
                    setOpenSentTicket(false);
                }}
                title="ثبت تیکت"
                actionText={isLoading ? <Loading /> : 'ثبت'}
                actionHandler={handleSubmitCreateTicket}
            >
                <Text className='text-right !text-red-500 mt-2'>{err}</Text>

                <Text className='text-right mt-2'>دسته بندی را انتخاب کنید :</Text>
                <Select
                    className={`!outline-none w-full text-right pr-5 mt-2 !py-0 border border-gray-300 ${err && 'border-red-500'}`}
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    // displayEmpty
                >
                    <MenuItem disabled value="">
                        <Text>انتخاب وضعیت</Text>
                    </MenuItem>
                    {data?.results.map((item) => (
                        <MenuItem key={item.id} value={item?.id}>
                            <Text>{item?.name}</Text>
                        </MenuItem>
                    ))}
                </Select>

                <Text className='text-right mt-4'>موضوع :</Text>
                <Input onChange={(e) => setTitle(e.target.value)} className={`w-full mt-2 border border-gray-300 bg-transparent ${err && 'border-red-500'}`}/>

                <Text className='text-right mt-4'>توضیحات :</Text>
                <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    className={`resize-none w-full border border-gray-300 mt-2 rounded outline-none p-2 ${err && 'border-red-500'}`} 
                />

                <Uploader
                    className={`mt-2 ${err && '!border-red-500'}`}
                    textOne={`فایل خود را آپلود کنید`}
                    textTwo={`سایز تصویر شما نباید از ۲۰۰ کیلو بایت بیشتر باشه`}
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                />

            </GeneralModal>

            <ModalLeft open={showLeft} onClose={handleCloseModalLeft}>
                <div className='rounded bg-bgMenuDashboard p-2 h-dvh bg-stone-100 relative'>
                    {selectedTicket ? (
                        <>
                            <div className='p-1 grid gap-2'>
                                {selectedTicket?.messages.map((ticket) => {
                                    const fileExtension = ticket?.file?.split('.').pop().toLowerCase();
                                    return (
                                        <div className='border-b border-gray-400 p-1'>
                                            {fileExtension === 'png' || fileExtension === 'jpg' ? (
                                                <Img href={ticket?.file} src={ticket?.file} />
                                            ) : fileExtension === 'mp3' ? (
                                                <Audio src={ticket?.file} />
                                            ) : null}
                                            <Text className='!text-justify mt-4'>{ticket?.text}</Text>
                                            <div className='text-left'>
                                                <Text>
                                                    <AccessTimeFilledIcon className='mr-1' />
                                                    {selectedTicket.created_at}
                                                </Text>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div className='flex justify-center py-2'>
                                    {selectedTicket?.messages?.length === 0 && 'محتوایی وجود ندارد'}
                                </div>
                            </div>
                            {/* {selectedTicket.responses?.map((response) => (
                                <div key={response.id} className='border-b border-gray-400 p-1 text-left rounded grid gap-2 my-2'>
                                    <Text>{response.text}</Text>
                                    <div className='text-right'>
                                        <Text>
                                            <AccessTimeFilledIcon className='mr-1' />
                                            {response.created_at}
                                        </Text>
                                    </div>
                                </div>
                            ))} */}
                            <div className='absolute grid bottom-0 right-0 w-full'>

                                <form onSubmit={handleSubmitSentAnswer}>
                                    <div className='bg-gray-200 p-2'>
                                        <div className='flex items-center gap-2 w-full'>
                                            {/* {preview && (
                                                <>
                                                <button onClick={handleRemoveFile}><CloseIcon/></button> */}
                                                <div className='flex items-center gap-2'>
                                                    {preview && <img src={preview} alt="Preview" className="mt-2 w-12 h-12 rounded" />}
                                                    {/* {fileName && <Text className='ml-2 text-gray-600'>{fileName.name}</Text>} */}
                                                </div>
                                                {/* </>
                                            )} */}
                                        </div>
                                        <div className='flex mt-2'>
                                            <ButtonGeneral 
                                                className='!py-2 !px-3 !border-none bg-gray-200' 
                                                onClick={() => handlePostTicket(selectedTicket?.id)}
                                            >
                                                {isLoadingAnswer ? <Loading/> : <SendIcon className='text-xs' /> }
                                            </ButtonGeneral>
                                            <input 
                                                value={valueMessage}
                                                onChange={(e) => setValueMessage(e.target.value)} 
                                                className='w-full p-2 outline-none text-xs rounded-3xl placeholder:font-sans'
                                                placeholder="توضیحات"
                                            />
                                            <label className='p-2 cursor-pointer bg-gray-200'>
                                                <input 
                                                    type='file' 
                                                    className='hidden' 
                                                    onChange={handleFileChange}
                                                />
                                                <AttachFileIcon/>
                                            </label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </>
                    ) : <Loading/>}
                </div>
            </ModalLeft>
        </div>
    );
}

export default Ticket;
