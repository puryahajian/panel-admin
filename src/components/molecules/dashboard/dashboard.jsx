import React from 'react'
import CardDiagram from './card-diagram'
import Text from '../../atoms/text'
import Title from '../../atoms/title';
import ListOrders from '../list-orders';
import ChartComponent from '../chart';
import LinearProgressCom from '../linear-progress';
import UseSalesReport from '../../db/use-sales-report';
import UseGetAllOrder from '../../db/use-get-all-order'
import DateShamsi from '../date-shamsi';

function Dashboard() {
  const { data } = UseSalesReport();
  const { data: dataGetAllOrder } = UseGetAllOrder();
  const lastItem = Array.isArray(data?.sales_data) && data.sales_data.length > 0
    ? data.sales_data[data.sales_data.length - 1]
    : null;

  const statusMap = {
    0: <Text className={`text-orange-500`}>در انتظار تایید</Text>,
    1: <Text className={`text-green-500`}>تایید شده</Text>,
    2: <Text className={`text-red-500`}>رد شده</Text>,
    3: <Text className={`text-green-500`}>تحویل داده شده</Text>,
    4: <Text className={`text-red-500`}>لغو شده</Text>,
  };
  return (
    <div>
      <div className='grid grid-cols-3 gap-6'>
        <CardDiagram 
            contentTitle={
                'جمع فروش'
            }
            contentFooter={
                `فروش روزانه ${lastItem?.total_sales} ريال`
            }
            contentBold={
              `${data?.sales_data[0].total_sales} تومان`
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
                `فروش روزانه ${lastItem?.total_sales} ريال`
            }
            contentBold={
              `${data?.sales_data[0].total_sales} تومان`
            }
        >
          <ChartComponent data={data}/>
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
      <div className='flex my-4'>
          <Title>ردیف</Title>
          <div className='grid grid-cols-6 mr-6 w-full'>
            <Title className={``}>سفارش</Title>
            <Title className={``}>کد سفارش</Title>
            <Title>قیمت</Title>
            <Title>سفارش دهنده</Title>
            <Title>تاریخ و ساعت</Title>
            <Title className={`text-left`}>وضعیت سفارش</Title>
          </div>
        </div>
        <div className='grid gap-2'>
          {dataGetAllOrder && (
            <ListOrders

              classPrice={`pr-3`}
              classOrderer={`pr-4`}
              classDate={`pr-4`}
              // momber={i}
              order={dataGetAllOrder?.items?.map((it) => it?.product?.name)}
              orderCode={dataGetAllOrder?.id}
              price={`${dataGetAllOrder?.final_price.toLocaleString('fa-IR')} تومان`}
              orderer={dataGetAllOrder?.user?.name === null ? 'نامشخص' : dataGetAllOrder?.user?.name}
              date={<DateShamsi>{dataGetAllOrder?.items?.map((it) => it?.product?.create_date)}</DateShamsi>}
              orderStatus={statusMap[dataGetAllOrder?.state] || 'نامشخص'}
            />
          )}
         
        </div>
      </div>
    </div>
  )
}

export default Dashboard
