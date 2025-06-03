import React, { useState } from 'react'
import CardDiagram from './card-diagram'
import Text from '../../atoms/text'
import Title from '../../atoms/title';
import ListOrders from '../list-orders';
import ChartComponent from '../chart';
import LinearProgressCom from '../linear-progress';
import useSalesReport from '../../db/use-sales-report';
import useGetAllOrder from '../../db/use-get-all-order'
import DateShamsi from '../date-shamsi';
import GeneralModal from '../modal-general';
import Stepperr from './stepper';
import Img from '../../atoms/img';
import cycle from '../../../assets/image/cycle.png'
import Input from '../../atoms/input';
import useGetDriver from '../../db/use-get-driver';
import usePatchOrder from '../../db/use-patch-order';
import useGetAllActiveOrder from '../../db/use-get-all-active-order';

function Dashboard() {
  const { data } = useSalesReport();
  const { data: dataGetAllOrder } = useGetAllActiveOrder();
  const { mutate } = usePatchOrder();
  const { data: getDriver } = useGetDriver();
  const [giveIdDriver, setGiveIdDriver] = useState(null); 
  const [openModalState, setOpenModalState] = useState(false);
  const [openCustomerOrder, setOpenCustomerOrder] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [timeDelivery, setTimeDelivery] = useState('');
  const [getData, setGetData] = useState(null);

  const lastItem = Array.isArray(data?.sales_data) && data.sales_data.length > 0
    ? data.sales_data[data.sales_data.length - 1]
    : null;

  const statusMap = {
    0: <Text className={`text-orange-500`}>در انتظار تایید</Text>,
    // 1: <Text className={`text-green-500`}>درحال ارسال</Text>,
    2: <Text className={`text-green-500`}>درحال اماده سازی</Text>,
    3: <Text className={`text-red-500`}>لغو شده</Text>,
    4: <Text className={`text-green-500`}>درحال ارسال</Text>,
    5: <Text className={`text-green-500`}>درحال تحویل به پیک</Text>,

  };

  const cellStyle = {
    border: '1px solid #f2f2f2',
  };

  const handleAcceptOrder = (id, state) => {
    console.log('time', timeDelivery, 'driver', giveIdDriver, 'idproduct', id, 'state', state);
    mutate(
      {
        timeDelivery,
        giveIdDriver,
        id,
        state
      }
    )
  }

  return (
    <div>
      <div className='grid grid-cols-2 gap-6'>
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
            {/* <Text>تغییر  10%</Text>
            <Text>تغییر  18%</Text> */}

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

        {/* <CardDiagram 
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
        </CardDiagram> */}
      </div>

      <hr className='border border-gray-300 m-auto w-[93%] my-6'/>

      <div className=''>
        <div className='flex my-4'>
          {/* <Title>ردیف</Title> */}
          {/* title */}
          <div className='grid grid-cols-6 mr-[50px] w-full'>
            <Title className={``}>سفارش</Title>
            <Title className={``}>کد سفارش</Title>
            <Title>قیمت</Title>
            <Title>سفارش دهنده</Title>
            <Title>تاریخ و ساعت</Title>
            <Title className={`text-left ml-8`}>وضعیت سفارش</Title>
          </div>
        </div>
        <div className='grid gap-2'>
          {/* data list */}
          {dataGetAllOrder?.map((item) => (
            <ListOrders
              onClick={() => {
                setGetData(item)
                if (item?.state === 0) setOpenModalState(true)
                if (item?.state === 2) {
                  setOpenCustomerOrder(true);
                  setActiveStep(2); 
                };
                if (item?.state === 5) {
                  setOpenCustomerOrder(true)
                  setActiveStep(3); 
                }
                if (item?.state === 4) setOpenModalState(true)
              }}
              order={item?.items && item.items.length > 0 ? item.items.map((it) => it?.product?.name || 'نامشخص') : ['نامشخص']}
              orderCode={item?.id}
              price={`${item?.final_price?.toLocaleString('fa-IR')} تومان`}
              orderer={item?.user?.name === '' ? 'نامشخص' : item?.user?.name}
              date={<DateShamsi hour={`2-digit`} minute={`2-digit`} date={item?.created_at}/>}
              orderStatus={statusMap[item?.state] || 'نامشخص'}
            />
          ))}
         
        </div>
      </div>

      {/* modal accept order */}
      <GeneralModal
        open={openModalState}
        handleClose={(e) => {
          if (getData?.state === 4) {
            setOpenModalState(false)
            return;
          }
          e.preventDefault();
          setOpenModalState(false)
          handleAcceptOrder(getData?.id, 3);
        }}
        title="مشاهده و تایید سفارش"
        actionText="تایید"
        classAccept={getData?.state === 4 && 'hidden'}
        exitButton={getData?.state === 4 ? 'بستن' : 'رد کردن'}
        actionHandler={(e) => { 
          if (getData?.state === 4) setOpenModalState(false)
          e.preventDefault();
          setOpenModalState(false)
          handleAcceptOrder(getData?.id, 2);
        }}
      >
        <div className="grid grid-cols-4 gap-3">
          {getData?.items?.map((item) => (
            <div key={item?.product?.id}
              className="border border-gray-400 grid justify-center min-w-24 p-2 rounded-xl"
            >
              <Img className="m-auto border-none" src={item?.product?.image} />
              <Text className="mt-4">{item?.product?.name || 'نامشخص'}</Text>
            </div>
          ))}
        </div>
      </GeneralModal>

      {/* modal setTime & setDriver */}
      <GeneralModal
        open={openCustomerOrder}
        handleClose={(e) => {
          e.preventDefault();
          setOpenCustomerOrder(false);
        }}
        title="سفارشات مشتری"
        actionText={'تایید'}
        actionHandler={(e) => {
          e.preventDefault();
          // setActiveStep((prev) => prev + 1);
          handleAcceptOrder(getData?.id, 5);
          setOpenCustomerOrder(false);
          if (activeStep === 3) {
            handleAcceptOrder(getData?.id, 4);
          }
        }}
        classAccept="!w-[250px]"
        classReject="!w-[250px]"
        sx={{ justifyContent: 'end' }}
      >
        <hr className="my-4" />

        {/* show items order */}
        <div className="grid grid-cols-11 gap-3 w-[1200px]">
          {getData?.items?.map((item) => (
            <div key={item?.product?.id}
              className="border border-gray-400 grid justify-center min-w-24 p-2 rounded-xl"
            >
              <Img className="m-auto border-none" src={item?.product?.image} />
              <Text className="mt-4">{item?.product?.name || 'نامشخص'}</Text>
            </div>
          ))}
        </div>
        <div className="my-5">
          {getData?.items?.length === 0 && <Text>سفارش موجود نیست</Text>}
        </div>

        <Stepperr activeStep={activeStep} setActiveStep={setActiveStep} />

        {/* set time */}
        {activeStep === 2 && (
          <div className="mt-8 grid grid-cols-2 text-right">
            <div>
              <Text className="text-lg font-bold mb-2">زمان تقریبی</Text>
              <Text>زمان تقریبی برای تحویل سفارش به مشتری</Text>
            </div>
            <div className="flex items-center gap-2">
              <Text>زمان تقریبی برحسب دقیقه</Text>
              <Input
                value={timeDelivery}
                onChange={(e) => setTimeDelivery(e.target.value)}
                type="text"
              />
            </div>
          </div>
        )}

        {/* set driver */}
        {activeStep === 3 && (
          <div className="flex justify-center mt-8 gap-4">
            {getDriver?.results?.map((item, index) => (
              <div
                key={item?.id}
                onClick={() => item?.in_process !== false && setGiveIdDriver(item?.id)}
                className={`flex cursor-pointer items-center gap-4 border border-gray-400 rounded-2xl p-3 
                  ${item?.in_process === false ? 'border-red-500 cursor-not-allowed' : ''} 
                  ${giveIdDriver === item?.id ? 'border-green-500' : ''}
                `}
              >
                <img src={cycle} alt="پیک" />
                <div className="text-right">
                  <Text
                    className={`${item?.in_process === false ? 'text-red-500' : ''} 
                      ${giveIdDriver === item?.id ? 'text-green-500' : ''}
                    `}
                  >
                    پیک شماره {index + 1}
                  </Text>
                  <Text
                    className={`${item?.in_process === false ? 'text-red-500' : ''} 
                      ${giveIdDriver === item?.id ? 'text-green-500' : ''}
                    `}
                  >
                    {item?.name || 'نامشخص'}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        )}
      </GeneralModal>
    </div>
  )
}

export default Dashboard
