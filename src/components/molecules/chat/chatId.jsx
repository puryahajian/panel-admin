import React, { useEffect, useRef, useState } from 'react'
import MessageDoctor from './message-doctor'
import MessageUser from './message-user'
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Text from '../../atoms/text';
import Input from '../../atoms/input'
import ButtonGeneral from '../../atoms/button-general';
import SendIcon from '@mui/icons-material/Send';
import Uploader from '../uploader';
import UseGetVisit from '../../db/use-get-visit';
import UsePostDoctorVisit from '../../db/use-post-doctor-visit';
import Loading from '../../atoms/loading';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import GeneralModal from '../modal-general';
import ReactAudioPlayer from 'react-audio-player';
// import io from 'socket.io-client';
import UsePostSendMessage from '../../db/use-post-send-message';
// const socket = io("ws://localhost:8000/ws/chat/")

function ChatId() {
    const [fileName, setFileName] = useState('');
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [preview, setPreview] = useState(null);
    const [previewUpload, setPreviewUpload] = useState(null);
    const [description, setDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [view, setView] = useState(1);
    const [selectedVisit, setSelectedVisit] = useState(null);
    const [openShowVisit, setOpenShowVisit] = useState(false);
    const { data } = UseGetVisit();
    const { mutate, isLoading } = UsePostDoctorVisit();
    const { mutate: mutatePostMessage } = UsePostSendMessage();
    
    
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFileName(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleGetVisit = (e) => {
        e.preventDefault()
        mutate(
            {
                description,selectedFile
            },
            {
                onSuccess: (data) => {
                    toast.success('نسخه با موفقیت ثبت شد')
                    setDescription('')
                    setSelectedFile(false)
                }
            }
        )
    }

    const sendMessage = (e) => {
        e.preventDefault();

        mutatePostMessage(
            {
                message, fileName
            }
        )
        if (!message.trim()) return;

        const messageData = {
            sender: 'doctor',
            content: message,
        };
        // socket.emit("send_message", messageData);
        // setMessageList(prev => [...prev, messageData]);
    };

    // useEffect(() => {
    //     socket.on("receive_message", (data) => {
    //         setMessageList(prev => [...prev, data]);
    //         window.location.reload();
    //     });
    // }, [socket]);

    return (
        <div>
            <div className=' max-w-[800px] m-auto p-2'>
                <div className='flex justify-between items-center my-4'>
                    <Text>چت با بیمار</Text>
                    <ButtonGeneral className={`bg-customBlue text-white border-none`}>
                        <Link to='/'>
                            بازگشت
                        </Link>
                    </ButtonGeneral>
                </div>
                <div className='grid grid-cols-2 text-center gap-4 mb-4'>
                    <div 
                        className={`p-3 shadow-lg rounded cursor-pointer ${view === 1 ? 'bg-gray-100' : ''}`}
                        onClick={() => setView(1)}
                    >
                        <Text>چت</Text>
                    </div>                   
                    <div 
                        className={`p-3 shadow-lg rounded cursor-pointer ${view === 2 ? 'bg-gray-100' : ''}`}
                        onClick={() => setView(2)}
                    >
                        <Text>نسخه ها</Text>
                    </div>                
                </div>

                {view === 2 && (
                    <>
                        <form onSubmit={handleGetVisit}>
                            <div className='grid grid-cols-2 gap-4'>
                                <Uploader
                                    textOne={`نسخه رو آپلود کنید`}
                                    // textTwo={`سایز تصویر شما نباید از ۲۰۰ کیلو بایت بیشتر باشه`}
                                    selectedFile={selectedFile}
                                    onFileSelect={setSelectedFile}
                                    setPreview={setPreviewUpload}
                                />
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='w-full h-full border border-gray-300 outline-none rounded-2xl resize-none p-2 text-sm font-sans' placeholder='توضیحات...'></textarea>

                                <ButtonGeneral type={`submit`} className={`bg-customBlue col-span-2 w-full text-white border-transparent ${isLoading && 'cursor-default'}`}>
                                    {isLoading ? <Loading/> : 'ارسال نسخه'}
                                </ButtonGeneral>
                            </div>
                        </form>

                        {data?.results.map((visit) => (
                            <div key={visit?.id} className='border mt-3 flex justify-between items-center p-2 rounded-lg'>
                                <div>
                                    <Text>{visit?.content}</Text>
                                </div>
                                <div>
                                    <ButtonGeneral onClick={(e) => {
                                        e.preventDefault()
                                        setOpenShowVisit(true)
                                        setSelectedVisit(visit);
                                        }} className={`bg-customBlue border-none text-white`}>
                                        مشاهده نسخه
                                    </ButtonGeneral>
                                </div>
                            </div>
                        ))}
                        <div className='w-full justify-center mt-6'>
                            {data?.results.length === 0 && <Text>نسخه موجود نیست</Text>}
                        </div>
                    </>
                )}

                {view === 1 && (
                    <div>
                        <div className='rounded-t bg-bgInput p-2 h-[500px] max-h-[500px] overflow-scroll'>
                            <MessageDoctor/>
                            {/* <MessageUser/> */}
                        </div>
                        <div className='py-2 bg-bgInput rounded-b shadow-lg'>
                            <div className='flex items-center gap-2 px-2 pb-2'>
                                {preview && <img src={preview} alt="Preview" className="mt-2 w-12 h-12 rounded" />}
                                {fileName && <Text className='ml-2 text-gray-600'>{fileName.name}</Text>}
                            </div>
                            <form action="" onSubmit={sendMessage}>
                                <div className='flex items-center'>
                                    <ButtonGeneral className={`!px-2 border-none`}>
                                        <SendIcon/>
                                    </ButtonGeneral>
                                    <Input value={message} onChange={(e) => setMessage(e.target.value)} className={`w-full !rounded-full !border border-gray-500`} placeholder={`متن خود را بنویسید`}/>
                                    <label className='p-2 !cursor-pointe'>
                                        <input 
                                            type='file' 
                                            className='hidden' 
                                            onChange={handleFileChange}
                                        />
                                        <FolderOpenIcon/>
                                    </label>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <GeneralModal
                open={openShowVisit}
                handleClose={(e) => {
                    e.preventDefault()
                    setOpenShowVisit(false)
                    setSelectedVisit(null);
                }}
                title="مشاهده نسخه"
                // content="این یک مودال عمومی است که در تمام بخش‌ها می‌توان از آن استفاده کرد."
                actionText="بستن"
                actionHandler={(e) => { 
                    e.preventDefault()
                    setOpenShowVisit(false); 
                    setSelectedVisit(null);
                }}
                className={`hidden`}
            >
                <div className=' mt-2'>
                    {selectedVisit && (() => {
                        const fileExtension = selectedVisit.media?.split('.').pop().toLowerCase();

                        if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg') {
                            return <img className='w-full rounded-lg' src={selectedVisit.media} />;
                        } else if (fileExtension === 'mp3') {
                            return <ReactAudioPlayer className='w-full' src={selectedVisit?.media} controls/>;
                        } else {
                            return <Text>فرمت فایل پشتیبانی نمی‌شود</Text>;
                        }
                    })()}

                    <Text className={`mt-4 text-right`}>توضیحات :</Text>
                    <Text className={`mt-2 text-right`}>{selectedVisit?.content}</Text>
                </div>
            </GeneralModal>
        </div>
    )
}

export default ChatId
