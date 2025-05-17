import React, { useState } from 'react'
import CardDiagram from '../dashboard/card-diagram'
import Text from '../../atoms/text'
import ChartComponent from '../chart'
import LinearProgressCom from '../linear-progress'
import InputDate from './input-date'
import ButtonGeneral from '../../atoms/button-general'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import SalesRatingList from './sales-rating-list'
import ListOrders from './list-orders'
import ChartColumn from './chart-column'
import ChartCircle from './chart-circle'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Card, CardContent, Typography } from '@mui/material'
import TitleListSearch from './title-list-search'
import ListSearch from './list-search'
import UseSalesReport from '../../db/use-sales-report';

function TabReportList () {
    const { data } = UseSalesReport();
    const lastItem = data.sales_data[data.sales_data.length - 1];

    const [page, setPage] = useState(1);

    const handleChange = (event, value) => {
      setPage(value);
    };
    return (
        <div>
            <div className='flex justify-between my-6'>
                <div className='flex gap-8'>
                    <InputDate
                        textCalender={'از تاریخ'}
                    />
                    <InputDate
                        textCalender={'تا تاریخ'}
                    />
                </div>
                <ButtonGeneral className={`border border-blue-500 !text-blue-500`}>خروجی فایل</ButtonGeneral>
            </div>
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
            </div>

            <div className='flex justify-between border-b border-grayTitle mt-6 items-center'>
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
            </div>

            <div className='grid grid-cols-3 pt-10 gap-8'>
                <div className='col-span-2'>
                    <Text>روند فروش فروشگاه ها</Text>
                    <ChartColumn 
                        colOne={1}
                        colTwo={2}
                        colThree={3}
                        colFour={4}
                        colFive={5}
                        colSix={6}
                        colSeven={7}
                    />
                </div>
                <div>
                    <SalesRatingList/>
                </div>
            </div>

            <div className='mt-8'>
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
            </div>

            <div className='mt-8'>
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
            </div>

            <Stack spacing={2} style={{ direction: "rtl", alignItems: "center", marginTop: '-10px' }}>

                <div variant="outlined" className=' w-full'>
                    <TitleListSearch/>
                    <div>
                        {page === 1 && 
                            <ListSearch/>
                        }
                        {page === 2 && <div>محتوای صفحه ۲</div>}
                        {page === 3 && <div>محتوای صفحه ۳</div>}
                        {page === 4 && <div>محتوای صفحه ۴</div>}
                        {page === 5 && <div>محتوای صفحه ۵</div>}
                    </div>
                </div>
                <Pagination count={5} style={{direction:'ltr', width: '100%', marginTop: '24px'}} variant="outlined" shape="rounded" page={page} onChange={handleChange} />
            </Stack>

        </div>
    )
}


export default TabReportList
