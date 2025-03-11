import React from 'react'
import CardDiagram from './card-diagram'
import Text from '../../atoms/text'
import Title from '../../atoms/title';
import ListOrders from '../list-orders';
import ChartComponent from '../chart';
import LinearProgressCom from '../linear-progress';



function Dashboard() {

  return (
    <div>
      {/* <div className='grid grid-cols-3 gap-6'>
        <CardDiagram 
            contentTitle={
                'جمع فروش'
            }
            contentFooter={
                'فروش روزانه 12,432 ريال'
            }
            contentBold={
              '126,560 تومان'
            }
        >
            <Text>تغییر wow 10%</Text>
            <Text>تغییر dod 18%</Text>

        </CardDiagram>

        <CardDiagram 
            contentTitle={
                'جمع فروش'
            }
            contentFooter={
                'فروش روزانه 12,432 ريال'
            }
            contentBold={
              '2,560'
            }
        >
          <ChartComponent/>
        </CardDiagram>

        <CardDiagram 
            contentTitle={
              'اثر عملیاتی'
            }
            contentFooter={
              'تغییر WoW   27.2'
            }
            contentBold={
              '69%'
            }
        >
           <LinearProgressCom value={50}/>
        </CardDiagram>
      </div>

      <hr className='border border-gray-300 m-auto w-[93%] my-6'/> */}

      <div className=''>
        {/* <div className='grid grid-cols-7 my-4'>
          <Text>ردیف</Text>
          <Text className={`pr-4`}>سفارشات</Text>
          <Text>توضیحات</Text>
          <Text>آدرس</Text>
          <Text>قیمت</Text>
          <Text>هزینه</Text>
          <Text className={`text-left pl-4`}>وضعیت سفارش</Text>
        </div> */}

        <Text className={`mb-2`}>لیست کالا ها</Text>
        <div className='grid grid-cols-7 gap-4 p-3 mb-2 rounded-lg bg-gray-100 border-b'>
            <div><Text>ردیف</Text></div>
            <div className='border-l border-r pr-2 border-grayText'><Text>نام</Text></div>
            <div className='border-l border-grayText'><Text>توضیحات</Text></div>
            {/* <div className='border-l border-grayText'><Text>آدرس</Text></div> */}
            <div className='border-l border-grayText'><Text>قیمت</Text></div>
            <div><Text>تاریخ</Text></div>
            <div className='text-left pl-4 col-span-2'><Text>وضعیت کالا</Text></div>
        </div>
        <div className='grid gap-2'>
          <ListOrders
            momber={'1'}
            order={'پیتزا ,ساندویچ'}
            orderCode={'K9f94fhdb'}
            price={'۲۰۰,۰۰۰ تومان'}
            // orderer={'لورم ایپسوم'}
            date={'۱۴۰۳ / ۱۲ / ۰۴   ۲۰ : ۰۰'}
            orderStatus={'در انتظار تایید'}
          />
          <ListOrders
            momber={'1'}
            order={'پیتزا ,ساندویچ'}
            orderCode={'K9f94fhdb'}
            price={'۲۰۰,۰۰۰ تومان'}
            // orderer={'لورم ایپسوم'}
            date={'۱۴۰۳ / ۱۲ / ۰۴   ۲۰ : ۰۰'}
            orderStatus={'در انتظار تایید'}
          />
          <ListOrders
            momber={'1'}
            order={'پیتزا ,ساندویچ'}
            orderCode={'K9f94fhdb'}
            price={'۲۰۰,۰۰۰ تومان'}
            // orderer={'لورم ایپسوم'}
            date={'۱۴۰۳ / ۱۲ / ۰۴   ۲۰ : ۰۰'}
            orderStatus={'در انتظار تایید'}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
