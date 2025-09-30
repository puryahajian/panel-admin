import React, { useState } from 'react'
import ListOrders from '../list-orders'
import Title from '../../atoms/title'
import Text from '../../atoms/text'
import DateShamsi from '../date-shamsi'
import useGetAllOrder from '../../db/use-get-all-order'
import GeneralModal from '../modal-general'
import Img from '../../atoms/img'
import Mapp from '../mapp'
import Rial from '../../../assets/image/Frame.png'


function TabOrderList() {
  const { data } = useGetAllOrder();
  // console.log(data)
  const [ openModal, setOpenModal ] = useState(false); 
  const [ getData, setGetData ] = useState(''); 

  const statusMap = {
    8: <Text className={`text-green-500`}>تحویل داده شد</Text>,
  };

  const defaultStyle = {
    width: '100%',
    height: '120px',
    borderRadius: '8px',
    margin: 0,
    padding: 0,
    background: '#eee',
  };
   
  return (
    <div className='mt-0 max-[1024px]:mt-4 px-4'>
        <div className={`flex my-4 max-[1024px]:hidden ${data?.results?.map((item) => item?.state !== 8 && 'hidden')}`}>
          <Title>ردیف</Title>
          <div className='grid grid-cols-6 w-full'>
            <Title className={`pr-6`}>سفارش</Title>
            <Title className={`pr-4`}>کد سفارش</Title>
            <Title className={`pr-4`}>قیمت</Title>
            <Title className={`pr-3`}>سفارش دهنده</Title>
            <Title>تاریخ و ساعت</Title>
            <Title className={`text-left ml-8`}>وضعیت سفارش</Title>
          </div>
        </div>
{/* 
        {data?.results?.every((item) => item?.state !== 8) ? (
          <div className="text-center py-8 text-gray-500">
            لیست خالی
          </div>
        )}
         */}
        <div className='grid gap-2'>
          {data?.results?.map((item, index) => (
            <ListOrders
              onClick={() => {
                setOpenModal(true);
                setGetData(item);
              }}
              classOrderer={`pr-1`}
              classDate={``}
              className={item?.state !== 8 ? 'hidden' : ''}
              classNameResponse={item?.state !== 8 ? 'hidden' : 'max-[680px]:block'}

              momber={index + 1}
              order={item?.items?.length === 0 ? 'نا مشخص' : item?.items?.filter(it => it?.product?.name)?.map(it => it.product.name)?.join(', ')}
              orderCode={item?.id}
              price={<span className='flex items-center gap-1'>{Number(item?.final_price || 0).toLocaleString('fa-IR', { maximumFractionDigits: 0 })} <img src={Rial} alt='ریال' className='w-6 h-6' /></span>}
              orderer={`${item?.user?.name === null ? 'نامشخص' : item?.user?.name} ${item?.user?.family === null ? '' : item?.user?.family}`}
              date={<DateShamsi hour={`2-digit`} minute={`2-digit`} date={item?.created_at}/>}
              orderStatus={
                <>
                  {statusMap[item?.state] || 'نامشخص'}
                </> 
              }
            />
          ))}
        </div>
        <div className='text-center mt-6'>
          {data?.count === 0 && <Text>سفارش موجود نیست</Text>}
        </div>

        <GeneralModal
          open={openModal}
          handleClose={(e) => {
            e.preventDefault()
            setOpenModal(false)
          }}
          title="مشاهده سفارشات"
          actionText="تایید"
          classAccept={`hidden`}
          exitButton={`بستن`}
          classReject={`w-[250px] max-[600px]:w-full`}
          onClose={(e) => {
            e.preventDefault()
            setOpenModal(false)
          }}
          sx={{
            width: '80%', 
            '@media (max-width: 600px)': {
              width: '92%',
            },
          }}
        >
          <hr className="my-4" />

          {/* data user */}
          <div className='grid grid-cols-2 max-[990px]:grid-cols-1 items-center'>
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
            <div className='max-[990px]:mt-4'>
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
            {getData?.items?.map((item) => (
              <div key={item?.product?.id}
                className="border border-gray-400 flex justify-start items-center gap-2 w-max p-2 rounded-xl"
              >
                <Img className="m-auto border-none" src={item?.product?.image} />
                <div>
                  <Text className={`w-max`}>{item?.product?.name || 'نامشخص'}</Text>

                  <div className='flex items-center gap-1 mt-1 justify-between'>
                    <Text className="w-max text-xs">تعداد سفارش : </Text>
                    <Text>{item?.quantity}</Text>
                  </div>
                </div>

              </div>
            ))}
          </div>
          <div className="my-5">
            {getData?.items?.length === 0 && <Text>سفارش موجود نیست</Text>}
          </div>
        </GeneralModal>
      </div>
  )
}

export default TabOrderList
