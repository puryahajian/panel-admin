import React, { useState } from 'react'
import Text from '../../atoms/text'
import ButtonGeneral from '../../atoms/button-general'
import SalesRatingList from './sales-rating-list'
import ChartColumn from './chart-column'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TitleListSearch from './title-list-search'
import ListSearch from './list-search'
import GeneralModal from '../modal-general'
import Input from '../../atoms/input'
import UseShopSettlement from '../../db/use-shop-settlement'
import { toast } from 'react-toastify'
import UseGetTransaction from '../../db/use-get-transaction'
import UseGetChartSale from '../../db/use-get-chart-sale'

function TabReportList () {
    const [page, setPage] = useState(1);
    const [openPrice, setOpenPrice] = useState(false);
    const [mony, setMony] = useState('');
    const { mutate } = UseShopSettlement();
    const {data} = UseGetTransaction();
    const { data: dataChart } = UseGetChartSale();

    const handleChange = (event, value) => {
      setPage(value);
    };

    const askingForMony = (e) => {
        e.preventDefault();
        // console.log(mony)
            
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
            <div className='flex justify-between my-6'>
                <div className='flex gap-8'>
                    {/* <InputDate
                        textCalender={'از تاریخ'}
                    />
                    <InputDate
                        textCalender={'تا تاریخ'}
                    /> */}
                </div>
                <ButtonGeneral onClick={() => setOpenPrice(true)} className={`border border-blue-500 !text-blue-500`}>درخواست تسفیه حساب</ButtonGeneral>
            </div>
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
            </div> */}

            {/* <div className='flex justify-between border-b border-grayTitle mt-6 items-center'>
                <div>
                    <ul className='flex gap-2'>
                        <li className='py-4 px-2 border-b border-b-customBlue'>
                            <Text className={`text-customBlue`}>فروش ها</Text>
                        </li>
                        <li className='py-4 px-2'>
                            <Text>بازدید ها</Text>
                        </li>
                    </ul>
                </div>
                <div className='flex gap-8 items-center'>
                    <ul className='flex gap-4'>
                        <li>
                            <Text>سالیانه</Text>
                        </li>
                        <li>
                            <Text>ماهیانه</Text>
                        </li>
                        <li>
                            <Text>هفتگی</Text>
                        </li>
                        <li>
                            <Text>روزانه</Text>
                        </li>
                    </ul>
                    <div className='flex border border-grayTitle rounded-lg pl-4 p-1 items-center'>
                        <InputDate
                            className={`text-xs mr-0 !bg-white`}
                            placeholder={`تاریخ شروع`}
                        />
                        <ArrowRightAltIcon className='text-grayTitle'/>
                        <InputDate
                            className={`text-xs mr-0 !bg-white`}
                            placeholder={`تاریخ پایان`}
                        />
                        <CalendarTodayIcon className='text-grayTitle !text-base'/>
                    </div>

                </div>
            </div> */}

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
                {/* <div>
                    <SalesRatingList/>
                </div> */}
            </div>

            {/* <div className='mt-8'>
                <Text>فروش ها</Text>
                <div className=' grid grid-cols-3 mt-6'>
                    <div>
                        <ListOrders/>
                    </div>
                    <div className='col-span-2 grid grid-cols-2'>
                        <ChartCircle
                            circleOne={100} 
                            circleTwo={50} 
                            circleThree={100} 
                            circleFour={200} 
                            circleFive={50}

                            labelOne={'Elit mauris'} 
                            labelTwo={'Elit mauris'} 
                            labelThree={'Elit mauris'} 
                            labelFour={'Elit mauris'} 
                            labelFive={'Elit mauris'}
                        />
                        <ChartCircle
                            circleOne={100} 
                            circleTwo={50} 
                            circleThree={100} 
                            circleFour={200} 
                            circleFive={50}

                            labelOne={'Elit mauris'} 
                            labelTwo={'Elit mauris'} 
                            labelThree={'Elit mauris'} 
                            labelFour={'Elit mauris'} 
                            labelFive={'Elit mauris'}
                        />
                    </div>
                </div>
            </div> */}

            {/* <div className='mt-8'>
                <Text>بالاترین جستجو آنلاین</Text>
                <hr className='my-4'/>

                <div className='grid grid-cols-4 gap-4'>
                    <CardDiagram 
                        className={`border-none px-0 pb-0`}
                        contentTitle={
                            'جستجو کاربران'
                        }
                        
                        contentBold={
                        '126,560 '
                        }
                    >
                        <ChartComponent/>
                    </CardDiagram>
                    <CardDiagram 
                        className={`border-none px-0 pb-0`}
                        contentTitle={
                            'جستجو کاربران'
                        }
                        
                        contentBold={
                            '126,560 '
                        }
                    >
                        <ChartComponent/>
                    </CardDiagram>
                </div>
            </div> */}

            <Text className={`mt-14`}>لیست تراکنش های قبلی</Text>

            <Stack spacing={2} style={{ direction: "rtl", alignItems: "center", marginTop: '24px' }}>
                <div className='w-full'>
                    <TitleListSearch />
                    <div>
                        {paginatedItems.map(({ items, item }, index) => (
                            <ListSearch key={index} items={items} item={item} />
                        ))}
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
                title="تسفیه حساب"
                actionText="ثبت"
                // actionHandler={() => setOpenPrice(false)}
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
