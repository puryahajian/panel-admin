import React, { useState } from 'react'
import Text from '../../atoms/text'
import ButtonGeneral from '../../atoms/button-general';
import UseCreateTicketMessage from '../../db/use-create-ticket-message';
import { useParams } from 'react-router-dom';
import Loading from '../../atoms/loading';

function FormAnswer() {
    const { mutate, isPending } = UseCreateTicketMessage();
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState();
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            // setLocalPreview(URL.createObjectURL(file)); // اگر بخوای پیش‌نمایش درست کنی
        } else {
            setSelectedFile(null);
        }
    };

    const handlePostMessage = () => {
        mutate(
            {
                selectedFile, message
            },
            {
                onSuccess: () => {
                    setMessage('')
                    setSelectedFile(null)
                }
            }
        )
    }

    return (
        <div className='max-w-[800px] m-auto mt-6 shadow-lg p-6'>
            <Text>ارسال پاسخ</Text>
            <Text className={`!text-xs !text-gray-500 mt-2`}>برای ارسال پاسخ به این تیکت، از فرم زیر استفاده کنید.</Text>
            <form action="">
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} className='w-full border outline-none resize-none h-[300px] rounded-lg mt-4 p-2' placeholder='توضیحات' name="" id=""></textarea>

                <div className='flex justify-between'>
                    <div dir="rtl" className="flex items-center text-right gap-4 rounded-full border border-gray-200 shadow-sm px-3 py-2 w-full max-w-md">
                        <label className="text-gray-500 text-xs cursor-pointer w-max min-w-max bg-gray-200 px-3 py-1 rounded-xl">
                            پیوست فایل
                            <input type="file" onChange={handleFileChange} className="hidden" />
                        </label>
                        <span className={`text-gray-700 text-xs w-full px-2 py-1 rounded-xl truncate w-48`}>
                            {selectedFile ? selectedFile.name : 'موردی انتخاب نشده است.'}
                        </span>
                    </div>

                    <ButtonGeneral onClick={(e) => {
                        e.preventDefault()
                        handlePostMessage()
                        }} className={`bg-customBlue border-none text-white`}>{isPending ? <Loading/> : 'ارسال پاسخ' }</ButtonGeneral>
                </div>
            </form>
        </div>
    )
}

export default FormAnswer
