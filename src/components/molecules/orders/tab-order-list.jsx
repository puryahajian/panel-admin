import React, { useState } from 'react'
import ListOrders from '../list-orders'
import Text from '../../atoms/text'
import GeneralModal from '../modal-general';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarFeedback from '../start-feedback';
import CloseIcon from '@mui/icons-material/Close';
import { FormControl, MenuItem, Select } from '@mui/material';

function TabOrderList() {
  const [openModalComments, setOpenModalComments] = useState(false);
  const [openModalDetailOrders, setOpenModalDetailOrders] = useState(false);
  const [age, setAge] = React.useState('');
      
  const handleChange = (event) => {
      setAge(event.target.value);
  };

  return (
    <div className=''>
        <div className='grid grid-cols-7 my-4'>
          <Text>ردیف</Text>
          <Text className={`pr-4`}>سفارشات</Text>
          <Text>توضیحات</Text>
          <Text>هزینه</Text>
          {/* <Text>آدرس</Text> */}
          <Text>تاریخ</Text>
          <Text className={`text-left pl-4 col-span-2`}>وضعیت سفارش</Text>
        </div>
        <div className='grid gap-2'>
          <ListOrders
            momber={'1'}
            order={'پیتزا ,ساندویچ'}
            orderCode={'K9f94fhdb'}
            price={'۲۰۰,۰۰۰ تومان'}
            orderer={'لورم ایپسوم'}
            date={'۱۴۰۳ / ۱۲ / ۰۴   ۲۰ : ۰۰'}
            comments={`نظرات`}
            orderStatus={
              <Text className={`text-green-500`}>ارسال شده</Text>
            }
            detailOrder={`جزئیات`}
            onClick={() => setOpenModalComments(true)}
            handleClick={() => setOpenModalDetailOrders(true)}
          />
          <ListOrders
            momber={'1'}
            order={'پیتزا ,ساندویچ'}
            orderCode={'K9f94fhdb'}
            price={'۲۰۰,۰۰۰ تومان'}
            orderer={'لورم ایپسوم'}
            date={'۱۴۰۳ / ۱۲ / ۰۴   ۲۰ : ۰۰'}
            comments={`نظرات`}
            orderStatus={
              <Text className={`text-green-500`}>ارسال شده</Text>
            }
            detailOrder={`جزئیات`}
            onClick={() => setOpenModalComments(true)}
            handleClick={() => setOpenModalDetailOrders(true)}
          />
          <ListOrders
            momber={'1'}
            order={'پیتزا ,ساندویچ'}
            orderCode={'K9f94fhdb'}
            price={'۲۰۰,۰۰۰ تومان'}
            orderer={'لورم ایپسوم'}
            date={'۱۴۰۳ / ۱۲ / ۰۴   ۲۰ : ۰۰'}
            comments={`نظرات`}
            orderStatus={
              <Text className={`text-green-500`}>ارسال شده</Text>
            }
            detailOrder={`جزئیات`}
            onClick={() => setOpenModalComments(true)}
            handleClick={() => setOpenModalDetailOrders(true)}
          />
        </div>

        {/* modal comment */}
        <GeneralModal
          open={openModalComments}
          handleClose={() => setOpenModalComments(false)}
          title="نظرات ثبت شده"
          actionText="ثبت"
          actionHandler={() => { setOpenModalComments(false); }}
        >
          <div className='max-h-44 overflow-auto'>
            <div className='border-b py-2 mt-4'>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <AccountCircleIcon className='text-grayTitle'/>
                  <Text>no.1</Text>
                </div>
                <StarFeedback rating={4}/>
              </div>
              <div className='text-right mt-2'>
                <Text>لورم ایپسومیسنزپسمنپز</Text>
              </div>
            </div>
            <div className='border-b py-2 mt-4'>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <AccountCircleIcon className='text-grayTitle'/>
                  <Text>no.1</Text>
                </div>
                <StarFeedback rating={4}/>
              </div>
              <div className='text-right mt-2'>
                <Text>لورم ایپسومیسنزپسمنپز</Text>
              </div>
            </div>
          </div>
        </GeneralModal>

        {/* modal comment */}
        <GeneralModal
          open={openModalDetailOrders}
          handleClose={() => setOpenModalDetailOrders(false)}
          title="جزئیات سفارش"
          actionText="ثبت"
          actionHandler={() => setOpenModalDetailOrders(false)}
        >
          <div className='border mt-4'>
            <div className='flex justify-between'>
              <Text>نام محصول</Text>
              <div className='flex items-center'>
                <Text>2</Text>
                <CloseIcon className='!text-sm'/>
              </div>
            </div>
            <div className='mt-4'>
              <FormControl sx={{ minWidth: 120 }} className='w-full bg-bgInput text-right !outline-none !py-0'>
                  <Select
                      className='!outline-none !py-0'
                      value={age}
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                  >
                      <MenuItem value="">
                          <Text>
                              انتخاب وضعیت
                          </Text>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
              </FormControl>
            </div>

          </div>
        </GeneralModal>
      </div>
  )
}

export default TabOrderList
