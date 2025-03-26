import React from 'react'
import Text from '../../atoms/text'
import UseAllProduct from '../../db/use-all-product';
import moment from 'jalali-moment'
import ListGoods from './list-goods';

function Dashboard() {
  const {data} = UseAllProduct();

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

        <Text className={`mb-2`}>لیست کالا ها</Text>
        <div className='grid grid-cols-7 gap-4 p-3 mb-2 rounded-lg bg-gray-100 border-b'>
          <div><Text>ردیف</Text></div>
          <div className='border-l border-r pr-2 border-grayText'><Text>نام</Text></div>
          <div className='border-l border-grayText'><Text>توضیحات</Text></div>
          <div className='border-l border-grayText'><Text>قیمت</Text></div>
          <div><Text>تاریخ</Text></div>
          <div className='text-left pl-4 col-span-2'><Text>وضعیت کالا</Text></div>
        </div>


        <div className='grid gap-2'>
          {data?.results.map((items) => {
            let orderStatus;

            switch (items?.inventory_state) {
              case 0:
                orderStatus = <Text className="text-green-400">در دسترس</Text>;
                break;
              case 1:
                orderStatus = <Text className="text-red-400">در دسترس نیست</Text>;
                break;
            }

            return (
              <ListGoods
                key={items?.id}
                momber={items?.id}
                order={items?.name}
                orderCode={items?.description.replace(/<\/?p>/g, '')}
                price={items?.price.toLocaleString('fa-IR')}
                // orderer={'لورم ایپسوم'}
                date={moment(items?.created_at).locale('fa').format('YYYY/MM/DD')}
                orderStatus={orderStatus}
              />
            );
          })}
          {/* {data?.results.map((items) => (
            <ListGoods
              key={items?.id}
              momber={items?.id}
              order={items?.name}
              orderCode={items?.description.replace(/<\/?p>/g, '')}
              price={items?.price.toLocaleString('fa-IR')}
              // orderer={'لورم ایپسوم'}
              date={moment(items?.created_at).locale('fa').format('YYYY/MM/DD')}


              orderStatus={items?.inventory_state}
            />
          ))} */}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
