import React from 'react'
import Text from '../../atoms/text'

function ListSearch({item, items}) {
    return (
        <div className='grid grid-cols-5 gap-1 pr-3 p-2 border-b'>
            <div><Text>{items?.id}</Text></div>
            <div><Text>{item?.shop_name}</Text></div>
            <div><Text>{item?.amount.toLocaleString('fa-IR')}</Text></div>
            <div><Text>{item?.created_at}</Text></div>
            <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-blue-600 rounded-full'/>
                <Text>{item?.status}</Text> 
            </div>
        </div>
    )
}

export default ListSearch
