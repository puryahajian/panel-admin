import React from 'react'
import ListOrders from '../list-orders'
import Title from '../../atoms/title'
import Text from '../../atoms/text'
import TextBold from '../../atoms/text-bold'
import UseGetAllActiveOrder from '../../db/use-get-all-active-order'
import snap from '../../../assets/image/bike.svg'
import post from '../../../assets/image/moving.svg'

function TabOrderList() {
  const { data } = UseGetAllActiveOrder();
  console.log(data)

  const statusMap = {
    0: <Text className={`text-orange-500`}>در انتظار تایید</Text>,
    1: <Text className={`text-green-500`}>تایید شده</Text>,
    2: <Text className={`text-red-500`}>رد شده</Text>,
    3: <Text className={`text-green-500`}>تحویل داده شده</Text>,
    4: <Text className={`text-red-500`}>لغو شده</Text>,
  };
   
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
            <Title className={`text-left ml-8`}>وضعیت سفارش</Title>
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
                <>
                  {/* state */}
                  {statusMap[item?.state] || 'نامشخص'}

                  {/* delivery */}
                  {item?.state === 0 ? <img src={post} className='w-8' alt="" /> : <img src={snap} className='w-8' alt="" /> }
                </> 
              }
            />
          ))}
         
        </div>
      </div>
  )
}

export default TabOrderList
