import React from 'react'
import Text from '../atoms/text'

function ListOrders({momber,order,orderCode,price,orderer,date,orderStatus}) {
    return (
        <ul className='grid grid-cols-7 py-4 px-6 border border-gray-300 rounded-lg'>
            <li className=''>
                <Text>{momber}</Text>
            </li>
            <li>
                <Text>{order}</Text>
            </li>
            <li>
                <Text>{orderCode}</Text>
            </li>
            <li>
                <Text>{price}</Text>
            </li>
            <li>
                <Text>{date}</Text>
            </li>
            <li>
                {/* <Text>{orderer}</Text> */}
            </li>
            <li className='text-left'>
                <Text>{orderStatus}</Text>
            </li>
        </ul>
    )
}

export default ListOrders
