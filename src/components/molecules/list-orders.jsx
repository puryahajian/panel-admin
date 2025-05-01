import React from 'react'
import Text from '../atoms/text'

function ListOrders({momber,order,orderCode,price,comments,date,orderStatus, onClick, handleClick, detailOrder, key}) {
    return (
        <ul key={key} className='grid grid-cols-7 py-4 px-6 border border-gray-300 rounded-lg'>
            <li className=''>
                <Text>{momber}</Text>
            </li>
            <li>
                <Text>{price} تومان</Text>
            </li>
            <li>
                <Text>{date}</Text>
            </li>
            <li className='text-center'>
                <button onClick={handleClick} className='bg-customBlue px-3 py-1 rounded-lg'>
                    <Text className={`text-white`}>
                        {detailOrder}
                    </Text>
                </button>
            </li>
            <li className='text-left flex justify-end'>
                <button onClick={onClick} className='ml-14 bg-customBlue px-3 py-1 rounded-lg'>
                    <Text className={`text-white`}>
                        {comments}
                    </Text>
                </button>
            </li>
            <li className={`text-left col-span-2`}>
                <Text>{orderStatus}</Text>
            </li>
        </ul>
    )
}

export default ListOrders
