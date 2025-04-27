import React from 'react'
import Text from '../../atoms/text'

function ListGoods({
    momber,
    order,
    orderCode,
    price,
    comments,
    date,
    orderStatus, 
    onClick, 
    handleClick, 
    detailOrder, 
    src,
    key}) {
    return (
        <ul key={key} className='flex py-4 px-6 border border-gray-300 rounded-lg items-center'>
            <li>
                <Text>{momber}</Text>
            </li>
            <img src={`https://mediplant.ir/${src}`} className='w-[50px] h-[50px] rounded-lg mr-10' alt="" />
            <ul className='grid grid-cols-7 mr-8 w-full items-center'>
                <li className='col-span-2'>
                    {order}
                    {/* <Text className={`truncate w-20`}>{order}</Text> */}
                </li>
                
                <li>
                    <Text>{price} تومان</Text>
                </li>
                <li>
                    <Text>{date}</Text>
                </li>
                <li className={`text-left col-span-3`}>
                    <Text>{orderStatus}</Text>
                </li>
            </ul>
        </ul>
    )
}

export default ListGoods
