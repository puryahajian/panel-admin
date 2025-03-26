import React from 'react'
import MessageDoctor from './message-doctor'
import MessageUser from './message-user'

function Chat() {
    return (
        <div className='border'>
            <div className='border border-red-500 max-w-[800px] m-auto p-2'>
                <div className='grid grid-cols-2 text-center gap-4 mb-4'>
                    <div className='p-3 shadow-lg'>1</div>
                    <div className='p-3 shadow-lg'>2</div>
                </div>
                <div className='border border-blue-500 rounded bg-gray-300 p-2 h-[200px] max-h-[200px] overflow-scroll'>
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
                <div className='flex'>
                    <input type="file" name="" id="" />
                </div>
            </div>
        </div>
    )
}

export default Chat
