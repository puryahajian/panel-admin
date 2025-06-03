import React from 'react'
import Text from '../atoms/text'

function ListOrders({momber,order,orderCode,price,orderer,date,orderStatus, classPrice, classOrderer, classDate, onClick}) {
    return (
        <div className='flex py-4 border cursor-pointer border-gray-300 items-center rounded-lg' onClick={onClick}>
            <div className='pr-[11px]'>
                <Text>{momber}</Text>
            </div>
            <ul className='grid grid-cols-6 items-center mr-[35px] w-full'>
                <li>
                    <Text className={`truncate w-28`}>{order}</Text>
                </li>
                <li>
                    <Text className={`truncate w-20`}>{orderCode}</Text>
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
                    <Text className={`flex items-center pl-8 gap-2`}>{orderStatus}</Text>
                </li>
            </ul>
        </div>
    )
}

export default ListOrders
