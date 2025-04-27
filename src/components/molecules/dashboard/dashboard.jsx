import React, { useState } from 'react'
import Text from '../../atoms/text'
import UseAllProduct from '../../db/use-all-product';
import moment from 'jalali-moment'
import ListGoods from './list-goods';
import Input from '../../atoms/input';

function Dashboard() {
  const {data} = UseAllProduct();
  console.log(data)
  const [searchTerm, setSearchTerm] = useState("");
  const search =  data?.results.map((item) => item)
  const filteredItems = search?.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <div className=''>

        <div className='w-full flex justify-between mb-2 items-center'>
          <Text className={``}>لیست کالا ها</Text>
          <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={`جستجو بر اساس نام`}/>
        </div>


        <div className='flex gap-4 p-3 mb-2 rounded-lg bg-gray-100'>
          <div><Text>ردیف</Text></div>
            <div className=' border-grayText'><Text></Text></div>
          <div className='grid w-full grid-cols-7'>
            <div className=' col-span-2 border-r pr-2 border-grayText'><Text>نام</Text></div>
            <div className='border-r border-grayText pr-2 mr-10'><Text>قیمت</Text></div>
            <div className='pr-2 mr-7 border-r border-grayText'><Text>تاریخ</Text></div>
            <div className='text-left pl-4 col-span-3'><Text>وضعیت کالا</Text></div>
          </div>
        </div>


        <div className='grid gap-2'>
          {filteredItems?.map((item, index) => {
            let orderStatus;

            switch (item?.inventory_state) {
              case 0:
                orderStatus = <Text className="text-green-400">در دسترس</Text>;
                break;
              case 1:
                orderStatus = <Text className="text-red-400">در دسترس نیست</Text>;
                break;
            }

            return (
              <ListGoods
                key={item?.id}
                src={item?.images[1]?.image}
                momber={index + 1}
                order={<Text className={``} dangerouslySetInnerHTML={{__html: item?.name || 'محتوا موجود نیست'}}></Text>}
                // orderCode={<Text className={`truncate w-20 h-[20px]`} dangerouslySetInnerHTML={{__html: item?.description || 'محتوا موجود نیست'}}></Text>}
                price={item?.price.toLocaleString('fa-IR')}
                // orderer={'لورم ایپسوم'}
                date={moment(item?.created_at).locale('fa').format('YYYY/MM/DD')}
                orderStatus={orderStatus}
              />
            );
    })}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
