import React from 'react'
import ListOrders from '../list-orders'
import Text from '../../atoms/text'

function TabOrderList() {
  return (
    <div className=''>
        <div className='grid grid-cols-7 my-4'>
          <Text>ردیف</Text>
          <Text className={`pr-4`}>سفارشات</Text>
          <Text>توضیحات</Text>
          <Text>هزینه</Text>
          {/* <Text>آدرس</Text> */}
          <Text>تاریخ</Text>
          <Text className={`text-left pl-4 col-span-2`}>وضعیت سفارش</Text>
        </div>
        <div className='grid gap-2'>
          <ListOrders
            momber={'1'}
            order={'پیتزا ,ساندویچ'}
            orderCode={'K9f94fhdb'}
            price={'۲۰۰,۰۰۰ تومان'}
            orderer={'لورم ایپسوم'}
            date={'۱۴۰۳ / ۱۲ / ۰۴   ۲۰ : ۰۰'}
            orderStatus={
              <Text className={`text-green-500`}>ارسال شده</Text>
            }
          />
          <ListOrders
            momber={'1'}
            order={'پیتزا ,ساندویچ'}
            orderCode={'K9f94fhdb'}
            price={'۲۰۰,۰۰۰ تومان'}
            orderer={'لورم ایپسوم'}
            date={'۱۴۰۳ / ۱۲ / ۰۴   ۲۰ : ۰۰'}
            orderStatus={
              <Text className={`text-green-500`}>ارسال شده</Text>
            }
          />
          <ListOrders
            momber={'1'}
            order={'پیتزا ,ساندویچ'}
            orderCode={'K9f94fhdb'}
            price={'۲۰۰,۰۰۰ تومان'}
            orderer={'لورم ایپسوم'}
            date={'۱۴۰۳ / ۱۲ / ۰۴   ۲۰ : ۰۰'}
            orderStatus={
              <Text className={`text-green-500`}>ارسال شده</Text>
            }
          />
        </div>
      </div>
  )
}

export default TabOrderList
