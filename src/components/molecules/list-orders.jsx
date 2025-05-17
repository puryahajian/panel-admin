import React from 'react'
import Text from '../atoms/text'

function ListOrders({momber,order,orderCode,price,orderer,date,orderStatus, classPrice, classOrderer, classDate}) {
    return (
        <div className='flex py-4 px-6 border border-gray-300 items-center rounded-lg'>
            <div className=''>
                <Text>{momber}</Text>
            </div>
            <ul className='grid grid-cols-6 mr-6 w-full items-center'>
                <li>
                    <Text>{order}</Text>
                </li>
                <li>
                    <Text className={`truncate w-20 pr-2`}>{orderCode}</Text>
                </li>
                <li>
                    <Text className={classPrice}>{price}</Text>
                </li>
                <li>
                    <Text className={classOrderer}>{orderer}</Text>
                </li>
                <li>
                    <Text className={classDate}>{date}</Text>
                </li>
                <li className='text-left flex justify-end items-center'>
                    <Text className={`flex items-center gap-2`}>{orderStatus}</Text>
                </li>
            </ul>
        </div>
    )
}

export default ListOrders
