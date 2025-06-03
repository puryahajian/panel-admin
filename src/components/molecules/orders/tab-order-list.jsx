import React, { useState } from 'react'
import ListOrders from '../list-orders'
import Title from '../../atoms/title'
import Text from '../../atoms/text'
import useGetAllActiveOrder from '../../db/use-get-all-active-order'
import snap from '../../../assets/image/bike.svg'
import post from '../../../assets/image/moving.svg'
import DateShamsi from '../date-shamsi'
import useGetAllOrder from '../../db/use-get-all-order'
import GeneralModal from '../modal-general'
import Img from '../../atoms/img'

function TabOrderList() {
  const { data } = useGetAllOrder();
  const [ openModal, setOpenModal ] = useState(false); 
  const [ getData, setGetData ] = useState(''); 

  const statusMap = {
    0: <Text className={`text-orange-500`}>در انتظار تایید</Text>,
    1: <Text className={`text-green-500`}>تایید شده</Text>,
    2: <Text className={`text-red-500`}>رد شده</Text>,
    3: <Text className={`text-green-500`}>تحویل داده شده</Text>,
    4: <Text className={`text-red-500`}>لغو شده</Text>,
    8: <Text className={`text-green-500`}>ارسال شده</Text>,
  };
   
  return (
    <div className=''>
        <div className='flex my-4'>
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
        <div className='grid gap-2'>
          {data?.map((item, index) => (
            <ListOrders
              onClick={() => {
                setOpenModal(true);
                setGetData(item);
              }}
              classOrderer={`pr-1`}
              classDate={``}

              momber={index + 1}
              order={item?.items?.length === 0 ? 'نا مشخص' : item?.items?.filter(it => it?.product?.name)?.map(it => it.product.name)?.join(', ')}
              orderCode={item?.id}
              price={`${item?.final_price} تومان`}
              orderer={item?.user?.name === '' ? 'نامشخص' : item?.user?.name}
              date={<DateShamsi hour={`2-digit`} minute={`2-digit`} date={item?.created_at}/>}
              orderStatus={
                <>
                  {/* state */}
                  {statusMap[item?.state] || 'نامشخص'}
                </> 
              }
            />
          ))}
         
        </div>

        <GeneralModal
          open={openModal}
          handleClose={(e) => setOpenModal(false)}
          title="مشاهده سفارشات"
          actionText="تایید"
          classAccept={`hidden`}
          exitButton={`بستن`}
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
      </div>
  )
}

export default TabOrderList
