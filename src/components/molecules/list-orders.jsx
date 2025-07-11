import React from 'react'
import Text from '../atoms/text'
import Title from '../atoms/title'

function ListOrders({momber,order,orderCode,price,orderer,date,orderStatus, classPrice, classOrderer, classDate, onClick,className, classNameResponse}) {
    return (
        <>
            <div className={`flex py-4 border max-[1024px]:hidden cursor-pointer items-center rounded-lg ${className}`} onClick={onClick}>
                <div className='pr-[11px]'>
                    <Text>{momber}</Text>
                </div>
                <ul className='grid grid-cols-6 items-center mr-[35px] w-full'>
                    {/* <li>
                        <Text className={`truncate w-28`}>{order}</Text>
                    </li> */}
                    <li>
                        <Text className={classOrderer}>{orderer}</Text>
                    </li>
                    <li>
                        <Text className={classPrice}>{price}</Text>
                    </li>
                    <li>
                        <Text className={`truncate w-20`}>{orderCode}</Text>
                    </li>
                    <li>
                        <Text className={classDate}>{date}</Text>
                    </li>
                    <li className='text-left col-span-2 flex justify-end items-center'>
                        <Text className={`flex items-center pl-8 gap-2`}>{orderStatus}</Text>
                    </li>
                </ul>
            </div>

            <div className={`border p-4 hidden max-[1024px]:block rounded-xl ${classNameResponse}`} onClick={onClick}>
                <div className='flex justify-between items-center'>
                    <Title>سفارش دهنده</Title>
                    <Text>{orderer}</Text>
                </div>
                <div className='flex justify-between items-center mt-2'>
                    <Title>قیمت</Title>
                    <Text>{price}</Text>
                </div>
                <div className='flex justify-between items-center mt-2'>
                    <Title>کد سفارش</Title>
                    <Text className={`truncate w-20`}>{orderCode}</Text>
                </div>
                <div className='flex justify-between items-center mt-2'>
                    <Title>تاریخ و ساعت</Title>
                    <Text>{date}</Text>
                </div>
                <div className='flex justify-between items-center mt-2'>
                    <Title>وضعیت سفارش</Title>
                    <Text>{orderStatus}</Text>
                </div>
            </div>
        </>
    )
}

export default ListOrders
