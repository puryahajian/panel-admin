import React, { useState } from 'react'
import ListOrders from '../list-orders'
import Text from '../../atoms/text'
import GeneralModal from '../modal-general';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarFeedback from '../start-feedback';
import CloseIcon from '@mui/icons-material/Close';
import UseGetListOrders from '../../db/use-get-list-orders';

function TabOrderList() {
  const [openModalComments, setOpenModalComments] = useState(false);
  const [openModalDetailOrders, setOpenModalDetailOrders] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedCommentOrderId, setSelectedCommentOrderId] = useState(null);
  const { data } = UseGetListOrders();

  const handleOpenModalDetailOrders = (event, orderId) => {
    if (event && event.preventDefault) event.preventDefault(); 
    setSelectedOrderId(orderId);
    setOpenModalDetailOrders(true);
  };
  
  const handleCloseModalDetailOrders = (event) => {
    if (event && event.preventDefault) event.preventDefault();
    setOpenModalDetailOrders(false);
  };

  const handleOpenModalComments = (event, orderId) => {
    if (event && event.preventDefault) event.preventDefault();
    setSelectedCommentOrderId(orderId);
    setOpenModalComments(true);
  };
  const handleCloseModalComments = (event, orderId) => {
    setOpenModalComments(false);
  }


  return (
    <div className=''>
      <div className='grid grid-cols-7 my-4 bg-gray-100 py-3 px-4 rounded-lg'>
        <Text>ردیف</Text>
        <Text className="mr-4">هزینه</Text>
        <Text className="mr-2">تاریخ</Text>
        <Text className="text-left pl-4 col-span-4">وضعیت سفارش</Text>
      </div>

      <div className='grid gap-2'>
        {data?.results.map((item, index) => {
          let orderStatus;

          switch (item?.state) {
            case 0:
              orderStatus = <Text className="text-yellow-400">تعلیق</Text>;
              break;
            case 1:
              orderStatus = <Text className="text-orange-400">درحال پرداخت</Text>;
              break;
            case 2:
              orderStatus = <Text className="text-red-400">لغو پرداخت</Text>;
              break;
            case 3:
              orderStatus = <Text className="text-green-500">پرداخت شده</Text>;
              break;
            case 4:
              orderStatus = <Text className="text-green-500">درحال بررسی</Text>;
              break;
            case 5:
              orderStatus = <Text className="text-green-500">ارسال شده</Text>;
              break;
            case 6:
              orderStatus = <Text className="text-green-500">برگشت خورده</Text>;
              break;
            case 7:
              orderStatus = <Text className="text-yellow-400">در دست ارسال</Text>;
              break;
            case 8:
              orderStatus = <Text className="text-yellow-400">انجام شده</Text>;
              break;
            case 9:
              orderStatus = <Text className="text-yellow-400">لغو شده</Text>;
              break;
            case 10:
              orderStatus = <Text className="text-yellow-400">لغو فروشگاه</Text>;
              break;
            default:
              orderStatus = <Text className="text-gray-500">نامشخص</Text>;
          }

          return (
            <ListOrders
              key={item?.id} 
              momber={index + 1}
              price={item?.price}
              date={item?.created_at ? new Date(item?.created_at).toLocaleString('fa-IR') : 'نامشخص'}
              comments="نظرات"
              orderStatus={orderStatus}
              detailOrder="جزئیات"
              onClick={(event) => handleOpenModalComments(event, item?.id)}
              handleClick={(event) => handleOpenModalDetailOrders(event, item?.id)}
            />
          );
        })}
        <div className='flex justify-center py-2'>
          {data?.count === 0 && <Text>سفارشی موجود نیست</Text>}
        </div>
      </div>

      {/* modal comment */}
      <GeneralModal
        open={openModalComments}
        // handleClose={() => setOpenModalComments(false)}
        title={`نظرات ثبت شده `}
        actionText="ثبت"
        classBack={`hidden`}
        actionHandler={handleCloseModalComments}
      >
        <div className='max-h-44 overflow-auto'>
          {data?.results.map((item) => (
            item?.items.map((comments) => (
            <div key={comments?.id} className='border-b py-2 mt-4'>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <AccountCircleIcon className='text-grayTitle'/>
                  <Text>{comments?.user_name}</Text>
                </div>
                <StarFeedback rating={comments?.rate}/>
              </div>
              <div className='text-right mt-2'>
                <Text>{comments?.description}</Text>
              </div>
            </div>
            ))
          ))}

          
        </div>

      </GeneralModal>

      {/* modal detail orders */}
      <GeneralModal
        open={openModalDetailOrders}
        // handleClose={handleCloseModalDetailOrders}
        title="جزئیات سفارش"
        actionText="ثبت"
        classBack={`hidden`}
        actionHandler={handleCloseModalDetailOrders}
      >
        <div className='mt-4'>
          {data?.results
            .find(order => order.id === selectedOrderId)
            ?.items?.map((detail) => (
              <div className='flex justify-between' key={detail?.id}>
                <Text>{detail?.name}</Text>
                <div className='flex items-center'>
                  <Text>{detail?.unit}</Text>
                  <CloseIcon className='!text-sm'/>
                </div>
              </div>
            ))
          }
        </div>
      </GeneralModal>
    </div>
  )
}

export default TabOrderList;
