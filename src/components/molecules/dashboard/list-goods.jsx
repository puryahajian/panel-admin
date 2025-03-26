import React from 'react'
import Text from '../../atoms/text'

function ListGoods({momber,order,orderCode,price,comments,date,orderStatus, onClick, handleClick, detailOrder, key}) {
    return (
        <ul key={key} className='grid grid-cols-7 py-4 px-6 border border-gray-300 rounded-lg'>
            <li className=''>
                <Text>{momber}</Text>
            </li>
            <li>
                <Text className={``}>{order}</Text>
            </li>
            <li>
                <Text className={``}>{orderCode}</Text>
            </li>
            <li>
                <Text>{price} تومان</Text>
            </li>
            <li>
                <Text>{date}</Text>
            </li>
            <li className={`text-left col-span-2`}>
                <Text>{orderStatus}</Text>
            </li>
        </ul>
    )
}

export default ListGoods
