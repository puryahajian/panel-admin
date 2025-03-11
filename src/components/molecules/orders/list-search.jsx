import React from 'react'
import Text from '../../atoms/text'

function ListSearch() {
    return (
        <div className='grid grid-cols-4 gap-1 pr-3 p-2 border-b'>
            <div><Text>متن</Text></div>
            <div><Text>لورم ایپسوم</Text></div>
            <div><Text>متن</Text></div>
            <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-blue-600 rounded-full'/>
                <Text>وضعیت</Text> 
            </div>
        </div>
    )
}

export default ListSearch
