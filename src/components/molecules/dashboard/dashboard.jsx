import React, { useEffect, useState } from 'react'
import CardDiagram from './card-diagram'
import Text from '../../atoms/text'
import Title from '../../atoms/title';
import ListOrders from '../list-orders';
import ChartComponent from '../chart';
import useSalesReport from '../../db/use-sales-report';
import DateShamsi from '../date-shamsi';
import GeneralModal from '../modal-general';
import Stepperr from './stepper';
import Img from '../../atoms/img';
import cycle from '../../../assets/image/cycle.png'
import Input from '../../atoms/input';
import useGetDriver from '../../db/use-get-driver';
import usePatchOrder from '../../db/use-patch-order';
import useGetAllActiveOrder from '../../db/use-get-all-active-order';
import Mapp from '../mapp';
import Rial from '../../../assets/image/Frame.png'


function Dashboard() {
  const { data } = useSalesReport();
  // console.log(data)
  const { data: dataGetAllOrder } = useGetAllActiveOrder();
  // console.log(dataGetAllOrder)
  const { mutate } = usePatchOrder();
  const { data: getDriver } = useGetDriver();
  const [giveIdDriver, setGiveIdDriver] = useState(''); 
  const [openModalState, setOpenModalState] = useState(false);
  const [openCustomerOrder, setOpenCustomerOrder] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [timeDelivery, setTimeDelivery] = useState('');
  const [getData, setGetData] = useState(null);
  // console.log(getData)

  const lastItem = Array.isArray(data?.sales_data) && data?.sales_data.length > 0
    ? data?.sales_data[data?.sales_data.length - 1]
    : null;

  const statusMap = {
    0: <Text className={`text-orange-500`}>در انتظار تایید</Text>,
    1: <Text className={`text-orange-500`}>درحال پرداخت</Text>,
    2: <Text className={`text-orange-500`}>درحال اماده سازی</Text>,
    3: <Text className={`text-red-500`}>لغو شده</Text>,
    4: <Text className={`text-green-500`}>ارسال شده</Text>,
    5: <Text className={`text-orange-500`}>در انتظار انتخاب پیک</Text>,
    8: <Text className={`text-green-500`}>تحویل داده شد</Text>,

  };

  const handleAcceptOrder = (id, state) => {
    mutate(
      {
        timeDelivery,
        giveIdDriver,
        id,
        state
      }
    )
  }
  
  const defaultStyle = {
    width: '100%',
    height: '120px',
    borderRadius: '8px',
    margin: 0,
    padding: 0,
    background: '#eee',
  };

  return (
    <div className='mt-4 max-[1024px]:mt-20 px-4'>
      <div className='grid grid-cols-2 gap-6 max-[1024px]:grid-cols-1'>
        <CardDiagram 
            contentTitle={
                'جمع فروش'
            }
            contentFooter={
                `فروش روزانه ${lastItem?.total_sales?.toLocaleString('fa-IR') } تومان`
            }
            contentBold={
              `${data?.sales_data[0]?.total_sales.toLocaleString('fa-IR')} تومان`
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
                `فروش روزانه ${lastItem?.total_sales?.toLocaleString('fa-IR')} ريال`
            }
            contentBold={
              `${data?.sales_data[0]?.total_sales?.toLocaleString('fa-IR')} تومان`
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

      <Text className={`hidden mb-4 max-[930px]:flex`}>لیست سفارشات فعال</Text>

      <div className=''>
        <div className='flex my-4 max-[930px]:hidden'>
          {/* <Title>ردیف</Title> */}
          {/* title */}
          <div className='grid grid-cols-6 mr-[50px] w-full'>
            {/* <Title className={``}>سفارش</Title> */}
            <Title>سفارش دهنده</Title>
            <Title>قیمت</Title>
            <Title className={``}>کد سفارش</Title>
            <Title className={`mr-3`}>تاریخ و ساعت</Title>
            <Title className={`col-span-2 text-left ml-8`}>وضعیت سفارش</Title>
          </div>
        </div>
        <div className='grid gap-2'>
          {/* data list */}
          {dataGetAllOrder?.results?.map((item) => (
            <>
            <div
              className={`bg-bgAcceptOrder rounded-lg py-2 max-[1024px]:hidden ${item?.state === 3 && 'bg-bgRejectOrder'} ${item?.state === 8 && 'hidden'}`}
              classNameResponse={`bg-bgAcceptOrder ${item?.state === 3 && 'bg-bgRejectOrder'}`}
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
            >
              <ul className='grid grid-cols-6 items-center mr-[35px] w-full'>
                <li className='pr-3'>
                  <Text>{`${item?.user?.name === null ? 'نامشخص' : item?.user?.name} ${item?.user?.family === null ? '' : item?.user?.family}`}</Text>
                </li>
                <li className='pr-2 flex justify-start items-center'>
                  <Text>{`${Math.round(item?.final_price || 0).toLocaleString('fa-IR')}`}</Text>
                  <img src={Rial} alt="" />
                </li>
                <li>
                  <Text className={`truncate w-20`}>{item?.id}</Text>
                </li>
                <li>
                  <Text><DateShamsi hour={`2-digit`} minute={`2-digit`} date={item?.created_at}/></Text>
                </li>
                <li className='text-left col-span-2 pl-20 flex justify-end items-center'>
                  <Text className={`flex items-center gap-2`}>{statusMap[item?.state] || 'نامشخص'}</Text>
                </li>
              </ul>
            </div>

            <div className={`bg-bgAcceptOrder p-4 rounded-lg hidden max-[1024px]:block ${item?.state === 3 && 'bg-bgRejectOrder'}`} 
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
              >
                <div className='flex justify-between items-center'>
                  <Title>سفارش دهنده</Title>
                  <Text>{`${item?.user?.name === null ? 'نامشخص' : item?.user?.name} ${item?.user?.family === null ? '' : item?.user?.family}`}</Text>
                </div>
                <div className='flex justify-between items-center mt-2'>
                  <Title>قیمت</Title>
                  <Text>{`${item?.final_price?.toLocaleString('fa-IR')} تومان`}</Text>
                </div>
                <div className='flex justify-between items-center mt-2'>
                  <Title>کد سفارش</Title>
                  <Text className={`truncate w-20`}>{item?.id}</Text>
                </div>
                <div className='flex justify-between items-center mt-2'>
                  <Title>تاریخ و ساعت</Title>
                  <Text><DateShamsi hour={`2-digit`} minute={`2-digit`} date={item?.created_at}/></Text>
                </div>
                <div className='flex justify-between items-center mt-2'>
                  <Title>وضعیت سفارش</Title>
                  <Text className={`flex items-center gap-2`}>{statusMap[item?.state] || 'نامشخص'}</Text>
                </div>
            </div>
            </>
          ))}
        </div>
        <div className='text-center mt-6'>
          {dataGetAllOrder?.count === 0 && <Text>سفارش موجود نیست</Text>}
        </div>
      </div>

      {/* modal accept order */}
      <GeneralModal
        open={openModalState}
        handleClose={(e) => {
          e.preventDefault();
          if (getData?.state === 4) {
            setOpenModalState(false)
            return;
          }
          setOpenModalState(false)
          handleAcceptOrder(getData?.id, 3)
        }}
        onClose={(e) => {
          e.preventDefault()
          setOpenModalState(false)
        }}
        title="مشخصات مشتری"
        classTitle={`text-right`}
        actionText="تایید"
        classAccept={`!w-[250px] ${getData?.state === 4 && 'hidden'}`}
        exitButton={getData?.state === 4 ? 'بستن' : 'رد کردن'}
        actionHandler={(e) => { 
          e.preventDefault();
          if (getData?.state === 4) setOpenModalState(false)
          setOpenModalState(false)
          handleAcceptOrder(getData?.id, 2);
        }}
        classReject="!w-[250px] max-[430px]:!w-full"
        sx={{
          width: '80%', 
          '@media (max-width: 600px)': {
            width: '92%',
          },
        }}
      >
        <hr className="my-4" />

        {/* data user */}
        <div className='grid grid-cols-2 items-center max-[680px]:grid-cols-1 max-[680px]:gap-4'>
          <div className='grid gap-4 h-max '>
            <div className='flex items-center gap-2 h-max'>
              <Title>نام و نام خانوادگی : </Title>
              <Text>{getData?.user?.name ? getData?.user?.name : 'موجود نیست'} {getData?.user?.family}</Text>
            </div>
            <div className='flex items-center gap-2 h-max'>
              <Title>شماره مشتری : </Title>
              <Text>{getData?.user?.phone ? getData?.user?.phone : 'موجود نیست'}</Text>
            </div>
            <div className='flex items-center gap-2 h-max'>
              <Title>آدرس مشتری : </Title>
              <Text>{getData?.user?.address ? getData?.user?.address : 'موجود نیست'}</Text>
            </div>
          </div>
          <div>
            {getData?.user?.latitude && (
              <Mapp
                savedLat={getData?.user?.latitude}
                savedLng={getData?.user?.longitude}
                centerLat={getData?.user?.latitude}
                centerLng={getData?.user?.longitude}
                defaultStyle={defaultStyle}
              />
            )}
            {getData?.user?.latitude === "" && <Text>آدرس یافت نشد</Text>}
          </div>
        </div>

        <Text className={`text-right mt-6`}>سفارش مشتری</Text>
        <hr className="my-4" />

        <div className="w-full overflow-scroll gap-3">
          {getData?.items?.map((item) => {
            // console.log(item?.product?.image)
            return(
            <div key={item?.product?.id}
              className="border border-gray-400 flex gap-2 justify-start items-center w-max p-2 rounded-xl"
            >
              <img className="w-14 h-14 m-auto border-none" src={item?.product?.image} />
              <div>
                <Text className={`w-max`}>{item?.product?.name || 'نامشخص'}</Text>

                <div className='flex items-center gap-1 mt-1 justify-between'>
                  <Text className="w-max text-xs">تعداد سفارش : </Text>
                  <Text>{item?.quantity}</Text>
                </div>
              </div>

            </div>
            )
          })}
        </div>

        <div className='my-6'>
          {getData?.items?.length === 0 && <Text>سفارش موجود نیست</Text>}
        </div>
      </GeneralModal>

      {/* modal setTime & setDriver */}
      <GeneralModal
        open={openCustomerOrder}
        handleClose={(e) => {
          e.preventDefault();
          setOpenCustomerOrder(false);
        }}
        onClose={(e) => {
          e.preventDefault()
          setOpenCustomerOrder(false)
        }}
        // width={`100%`}
        title="مشخصات مشتری"
        classTitle={`text-right`}
        actionText={'تایید'}
        actionHandler={(e) => {
          e.preventDefault();
          // setActiveStep((prev) => prev + 1);
          handleAcceptOrder(getData?.id, 5);
          setOpenCustomerOrder(false);
          if (activeStep === 3) {
            handleAcceptOrder(getData?.id, 4);
            if (giveIdDriver === '') handleAcceptOrder(getData?.id, 4);   
          }       
        }}
        classAccept='!w-[250px]'
        classReject="!w-[250px]"
        // sx={{ justifyContent: 'end' }}
        sx={{
          width: '80%', 
          '@media (max-width: 600px)': {
            width: '92%',
          },
        }}
      >
        <hr className="my-4" />

        {/* data user */}
        <div className='grid grid-cols-2 items-center max-[680px]:grid-cols-1 max-[680px]:gap-4'>
          <div className='grid gap-4 h-max '>
            <div className='flex items-center gap-2 h-max'>
              <Title>نام و نام خانوادگی : </Title>
              <Text>{getData?.user?.name ? getData?.user?.name : 'موجود نیست'} {getData?.user?.family}</Text>
            </div>
            <div className='flex items-center gap-2 h-max'>
              <Title>شماره مشتری : </Title>
              <Text>{getData?.user?.phone ? getData?.user?.phone : 'موجود نیست'}</Text>
            </div>
            <div className='flex items-center gap-2 h-max'>
              <Title>آدرس مشتری : </Title>
              <Text>{getData?.user?.address ? getData?.user?.address : 'موجود نیست'}</Text>
            </div>
          </div>
          <div className='max-[680px]:hidden'>
            <Mapp
              savedLat={getData?.user?.latitude ? getData?.user?.latitude : 35.699739}
              savedLng={getData?.user?.longitude ? getData?.user?.longitude : 51.338097}
              defaultStyle={defaultStyle}
            />
          </div>
        </div>

        <Text className={`text-right mt-6`}>سفارش مشتری</Text>
        <hr className="my-4" />

        {/* show items order */}
        <div className="w-full overflow-scroll gap-3">
          {getData?.items?.map((item) => {

            return (
              <div key={item?.product?.id}
                className="border border-gray-400 flex gap-2 justify-start items-center w-max p-2 rounded-xl">
                
                <img className="m-auto w-14 h-14 border border-grayTitle rounded-lg" src={item.product?.image} />

                <div>
                  <Text className={`w-max`}>{item?.product?.name || 'نامشخص'}</Text>

                  <div className='flex items-center gap-1 mt-1 justify-between'>
                    <Text className="w-max text-xs">تعداد سفارش : </Text>
                    <Text>{item?.quantity}</Text>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
        <div className="my-5">
          {getData?.items?.length === 0 && <Text>سفارش موجود نیست</Text>}
        </div>

        <Stepperr activeStep={activeStep} setActiveStep={setActiveStep} />

        {/* set time */}
        {activeStep === 2 && (
          <div className="mt-8 flex gap-2 text-right items-center mb-4">
            <div>
              <Text className="text-lg font-bold mb-2">زمان تقریبی</Text>
              <Text className={`max-[480px]:text-[11px]`}>زمان تقریبی برای تحویل سفارش به مشتری</Text>
            </div>
            <div className="flex items-center gap-2">
              <Input
                value={timeDelivery}
                onChange={(e) => setTimeDelivery(e.target.value)}
                type="number"
                className={`w-20 border border-gray-900`}
                inputMode='numeric'
                />
              <Text>دقیقه</Text>
            </div>
          </div>
        )}

        {/* set driver */}
        {activeStep === 3 && (
          <div className="flex justify-center max-[450px]:grid max-[450px]:grid-cols-2 max-[450px]:gap-4 my-8 gap-4">
            {getDriver?.results?.map((item, index) => (
              <div
                key={item?.id}
                onClick={() => {
                  if (item?.in_process !== '') {
                    setGiveIdDriver(giveIdDriver === item?.id ? '' : item?.id);
                  }
                }}
                className={`flex cursor-pointer items-center gap-4 border border-gray-400 rounded-2xl p-3 
                  ${item?.in_process === false ? 'border-red-500 cursor-not-allowed' : ''} 
                  ${giveIdDriver === item?.id ? 'border-green-500' : ''}
                `}
              >
                <img src={cycle} alt="پیک" />
                <div className="text-right">
                  <Text
                    className={`max-[680px]:text-xs ${item?.in_process === false ? 'text-red-500' : ''} 
                      ${giveIdDriver === item?.id ? 'text-green-500' : ''}
                    `}
                  >
                    پیک شماره {index + 1}
                  </Text>
                  <Text
                    className={`max-[680px]:text-xs ${item?.in_process === false ? 'text-red-500 ' : ''} 
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
