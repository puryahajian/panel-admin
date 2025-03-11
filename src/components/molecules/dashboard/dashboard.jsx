import React from 'react'
import CardDiagram from './card-diagram'
import Text from '../../atoms/text'
import TitrGenaral from '../../../lib/lib-titr-general';
import Title from '../../atoms/title';
import ListOrders from '../list-orders';
import ChartComponent from '../chart';
import LinearProgressCom from '../linear-progress';



function Dashboard() {

  return (
    <div>
      <div className='grid grid-cols-3 gap-6'>
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

      <hr className='border border-gray-300 m-auto w-[93%] my-6'/>

      <div className=''>
        <div className='flex justify-between mb-4'>
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
            orderStatus={'در انتظار تایید'}
          />
          <ListOrders
            momber={'1'}
            order={'پیتزا ,ساندویچ'}
            orderCode={'K9f94fhdb'}
            price={'۲۰۰,۰۰۰ تومان'}
            orderer={'لورم ایپسوم'}
            date={'۱۴۰۳ / ۱۲ / ۰۴   ۲۰ : ۰۰'}
            orderStatus={
              <Text className={`text-red-500`}>در انتظار تایید</Text>
            }
          />
          <ListOrders
            momber={'1'}
            order={'پیتزا ,ساندویچ'}
            orderCode={'K9f94fhdb'}
            price={'۲۰۰,۰۰۰ تومان'}
            orderer={'لورم ایپسوم'}
            date={'۱۴۰۳ / ۱۲ / ۰۴   ۲۰ : ۰۰'}
            orderStatus={'در انتظار تایید'}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
