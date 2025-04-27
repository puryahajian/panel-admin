import React, { useState } from 'react'
import Text from '../../atoms/text'
import ButtonGeneral from '../../atoms/button-general'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TitleListSearch from './title-list-search'
import GeneralModal from '../modal-general'
import Input from '../../atoms/input'
import UseGetTransaction from '../../db/use-get-transaction'
import UseGetChartSale from '../../db/use-get-chart-sale'
import ChartColumn from './chart-column';
import UseShopSettlement from '../../db/use-post-settlement';
import { toast } from 'react-toastify';
import ListSearch from './list-search';

function TabReportList () {
    const { mutate } = UseShopSettlement();
    const [page, setPage] = useState(1);
    const [openPrice, setOpenPrice] = useState(false);
    const [mony, setMony] = useState('');
    const {data} = UseGetTransaction();
    const { data: dataChart } = UseGetChartSale();

    const handleChange = (event, value) => {
      setPage(value);
    };

    const askingForMony = (e) => {
        e.preventDefault();
            
        mutate(
            { 
                mony
            },
            {
                onSuccess: (data) => {
                    toast.success('با موفقیت ثبت شد !')
                },
            }
        );
    }

    // Pagination
    const itemsPerPage = 5;
    
    const allItems = data?.results.flatMap(item => 
        item?.items.map(items => ({ items, item }))
    ) || [];
    
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedItems = allItems.slice(startIndex, startIndex + itemsPerPage);
    const pageCount = Math.ceil(allItems.length / itemsPerPage);

    return (
        <div>
            <div className='my-6'>
                <ButtonGeneral onClick={() => setOpenPrice(true)} className={`border border-customBlue !text-customBlue`}>درخواست تسویه حساب</ButtonGeneral>
            </div>

            <div className='grid grid-cols-3 pt-10 gap-8'>
                <div className='col-span-2'>
                    <Text>فروش هفتگی</Text>
                    <ChartColumn 
                        columns={dataChart?.data.map((chart) => [
                            chart[0]?.total_sales || 0,
                            chart[1]?.total_sales || 0,
                            chart[2]?.total_sales || 0,
                            chart[3]?.total_sales || 0,
                            chart[4]?.total_sales || 0,
                            chart[5]?.total_sales || 0,
                            chart[6]?.total_sales || 0
                        ])}
                    />
                </div>
               
            </div>


            <Text className={`mt-14`}>لیست تراکنش های قبلی</Text>

            <Stack spacing={2} style={{ direction: "rtl", alignItems: "center", marginTop: '24px' }}>
                <div className='w-full'>
                    <TitleListSearch />
                    <div>
                        {paginatedItems.map(({ items, item }, index) => (
                            <ListSearch key={index} items={items} item={item} />
                        ))}
                        <div className='flex justify-center mt-4'>
                            {pageCount === 0 && <Text>تراکنش موجود نیست</Text>}
                        </div>
                    </div>
                </div>
                <Pagination 
                    count={pageCount} 
                    style={{ direction: 'ltr', width: '100%', marginTop: '24px' }} 
                    variant="outlined" 
                    shape="rounded" 
                    page={page} 
                    onChange={handleChange} 
                />
            </Stack>

            <GeneralModal
                open={openPrice}
                handleClose={() => setOpenPrice(false)}
                title="درخواست تسویه حساب"
                actionText="ثبت"
                actionHandler={() => setOpenPrice(false)}
                onSubmit={askingForMony}
            >
                <div className=' text-right mt-4 relative'>
                    <Text className={`absolute left-2 top-3 !text-base`}>ریال</Text>
                    <Input onChange={(e) => setMony(e.target.value)} className={`w-full`} placeholder={`مبلغ درخواستی`}/>
                </div>
            </GeneralModal>

        </div>
    )
}


export default TabReportList
