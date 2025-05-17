import React from 'react'
import ListOrders from '../list-orders'
import Title from '../../atoms/title'
import Text from '../../atoms/text'
import TextBold from '../../atoms/text-bold'
import UseGetAllActiveOrder from '../../db/use-get-all-active-order'

function TabOrderList() {
  const { data } = UseGetAllActiveOrder();
   
  return (
    <div className=''>
        <div className='flex my-4'>
          <Title>ردیف</Title>
          <div className='grid grid-cols-6 w-full'>
            <Title className={`pr-6`}>سفارش</Title>
            <Title className={`pr-3`}>کد سفارش</Title>
            <Title>قیمت</Title>
            <Title>سفارش دهنده</Title>
            <Title>تاریخ و ساعت</Title>
            <Title className={`text-left`}>وضعیت سفارش</Title>
          </div>
          
        </div>
        <div className='grid gap-2'>
          {data?.map((item, index) => (
            <ListOrders
              classOrderer={`pr-1`}
              classDate={`pr-2`}

              momber={index + 1}
              order={item?.items?.map((it) => it?.product?.name)}
              orderCode={item?.id}
              price={`${item?.final_price} تومان`}
              orderer={item?.user?.name === null ? 'نامشخص' : item?.user?.name}
              date={item?.items?.map((it) => it?.product?.create_date)}
              orderStatus={
                item?.items.some((it) => it.canceled) ? (
                  <Text className="text-red-500">کنسل شده</Text>
                ) : item?.items.some((it) => it.accepted) ? (
                  <Text className="text-green-500">تایید شده</Text>
                ) : item?.items.some((it) => it.delivered) ? (
                  <Text className="text-yellow-500">تحویل داده شد</Text>
                ) : (
                  <Text className="text-yellow-500">در انتظار تایید</Text>
                )        
              }
            />
          ))}
         
        </div>
      </div>
  )
}

export default TabOrderList
