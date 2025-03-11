import React from 'react'
import ListOrders from '../list-orders'
import TitrGenaral from '../../../lib/lib-titr-general'
import Title from '../../atoms/title'
import Text from '../../atoms/text'
import TextBold from '../../atoms/text-bold'

function TabOrderList() {
  return (
    <div className=''>
        <div className='flex justify-between my-4'>
          {TitrGenaral.map((item) => (
            <Title>{item.label}</Title>
          ))}
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
