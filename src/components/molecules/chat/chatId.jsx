import React, { useState } from 'react'
import MessageDoctor from './message-doctor'
import MessageUser from './message-user'
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Text from '../../atoms/text';
import Input from '../../atoms/input'
import ButtonGeneral from '../../atoms/button-general';
import SendIcon from '@mui/icons-material/Send';
import Uploader from '../uploader';

function ChatId() {
    const [fileName, setFileName] = useState('');
    const [preview, setPreview] = useState(null);
    const [view, setView] = useState(1);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFileName(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    return (
        <div>
            <div className=' max-w-[800px] m-auto p-2'>
                <div className='flex justify-between items-center my-4'>
                    <Text>چت با بیمار</Text>
                    <ButtonGeneral className={`bg-customBlue text-white border-none`}>
                        بازگشت
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
                        <Uploader
                            textOne={`نسخه رو انتخاب کنید`}
                            textTwo={`سایز تصویر شما نباید از ۲۰۰ کیلو بایت بیشتر باشه`}
                        />
                        <div className='border mt-3 flex justify-between items-center p-2 rounded-lg'>
                            <div>
                                <Text>شماره نسخه</Text>
                            </div>
                            <div>
                                <ButtonGeneral className={`bg-customBlue border-none text-white`}>
                                    دانلود نسخه
                                </ButtonGeneral>
                            </div>
                        </div>
                    </>
                )}

                {view === 1 && (
                    <div>
                        <div className='rounded-t bg-bgInput p-2 h-[500px] max-h-[500px] overflow-scroll'>
                            <MessageDoctor/>
                            <MessageUser/>
                            <MessageDoctor/>
                            <MessageUser/>
                            <MessageDoctor/>
                            <MessageUser/>
                            <MessageDoctor/>
                            <MessageUser/>
                            <MessageDoctor/>
                            <MessageUser/>
                        </div>
                        <div className='py-2 bg-bgInput rounded-b shadow-lg'>
                            <div className='flex items-center gap-2 px-2 pb-2'>
                                {preview && <img src={preview} alt="Preview" className="mt-2 w-12 h-12 rounded" />}
                                {fileName && <Text className='ml-2 text-gray-600'>{fileName.name}</Text>}
                            </div>
                            <div className='flex items-center'>
                                <ButtonGeneral className={`!px-2 border-none`}>
                                    <SendIcon/>
                                </ButtonGeneral>
                                <Input className={`w-full !rounded-full !border border-gray-500`} placeholder={`متن خود را بنویسید`}/>
                                <label className='p-2 !cursor-pointe'>
                                    <input 
                                        type='file' 
                                        className='hidden' 
                                        onChange={handleFileChange}
                                    />
                                    <FolderOpenIcon/>
                                </label>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChatId
