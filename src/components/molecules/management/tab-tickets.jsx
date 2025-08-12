import React, { useState } from 'react'
import Text from '../../atoms/text'
import ButtonGeneral from '../../atoms/button-general'
import sad from '../../../assets/image/sad.svg'
import happy from '../../../assets/image/happyTicket.svg'
import DraftsIcon from '@mui/icons-material/Drafts';
import Input from '../../atoms/input'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useGetAllTickets from '../../db/use-get-all-tickets'
import useGetAllSection from '../../db/use-get-all-section'
import useCreateTicket from '../../db/use-create-ticket'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import DateShamsi from '../date-shamsi'
import Title from '../../atoms/title'


function TabManagement({ children, step, index }) {
    return (
        <div
            role="tabpanel"
            className='mt-4'
            hidden={step !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            style={{ backgroundColor: 'white', color: 'black', borderRadius: '8px' }}
        >
            {step === index && <div>{children}</div>}
        </div>
    );
}

function TabTickets() {
    const priority = [
        {name: 'معمولی', id: 1},
        {name: 'مهم', id: 2},
        {name: 'بسیار مهم', id: 3},
    ]

    const { data } = useGetAllTickets()
    const { data: dataSection } = useGetAllSection();
    console.log(dataSection)
    const { mutate } = useCreateTicket();
    const [step, setStep] = useState(0);
    const [detail, setDetail] = useState();
    const [selectorCategory, setSelectorCategory] = useState('')
    const [activeId, setActiveId] = useState(null);
    const [titleForm, setTitleForm] = useState('');
    const navigate = useNavigate();
    
    const handleClick = (id) => {
        setActiveId(id);
    };
    
    
    const handleCreateTicket = () => {
        // console.log("title",titleForm, "category",selectorCategory, "property",activeId,"detail", detail)

        mutate(
            {
                titleForm, selectorCategory, activeId, detail
            },
            {
                onSuccess: () => {
                    setStep(0)
                    toast.success('تیکت ثبت شد')
                }
            }
        )
    }
    
    return (
        <div className='mt-24 max-[1024px]:mt-[155px]'>
            {/* tab tickets */}
            <TabManagement step={step} index={0}>
                <div className='flex justify-between items-center gap-2'>
                    <Text className={`max-[600px]:text-xs`}>تمامِ تیکت‌هایی که برای واحد امور مشتریان دلیوری ارسال کرده‌اید، در این صفحه لیست شده‌اند:</Text>

                    <ButtonGeneral className={`text-xs w-[150px] max-[600px]:text-xs max-[600px]:px-1 max-[600px]:w-[220px]`} onClick={() => setStep(1)}>ارسال تیکت جدید</ButtonGeneral>
                </div>

                {/* title list */}
                <div className='grid grid-cols-10 bg-[#f8f9fa] py-3 rounded-lg mt-4 max-[680px]:hidden'>
                    <div></div>
                    <Text className={`col-span-2`}>شناسه</Text>
                    <Text className={`col-span-2`}>عنوان</Text>
                    <Text className={`col-span-3`}>تاریخ و ساعت</Text>
                    <Text className={`col-span-2`}>وضعیت</Text>
                    {/* <Text>بازخورد</Text> */}
                </div>

                {/* list */}
                {data?.results.map((item) => (
                    <div className='grid grid-cols-10 py-3 rounded-lg border-b relative max-[680px]:hidden' key={item?.id}>
                        <div className={`bg-slate-200 opacity-45 absolute w-full h-full rounded-lg cursor-not-allowed ${item?.state === '1' && 'hidden'} ${item?.state === '2' && 'hidden'}`}></div>
                        <div>
                            <DraftsIcon className='!mr-8'/>
                        </div>
                        <Text className={`col-span-2 truncate w-28`}>{item?.id}</Text>
                        <Text className={`col-span-2 cursor-pointer`} onClick={() => navigate(`/tickets/${item?.id}`)}>{item?.title}</Text>
                        <Text className={`col-span-3`}><DateShamsi hour={`2-digit`} minute={`2-digit`} date={item?.updated_at}/></Text>
                        <Text className={`col-span-2`}>
                            {item?.state === '1' && 'باز'}
                            {item?.state === '2' && 'درحال بررسی'}
                            {item?.state === '3' && 'بسته'}
                        </Text>
                        {/* <div className='flex gap-2'>
                            <img src={happy} alt="" />
                            <img src={sad} alt="" />
                        </div> */}
                    </div>
                ))}

                {/*  */}
                <div className='hidden mt-4 max-[680px]:grid max-[680px]:gap-4'>
                    {data?.results.map((item) => (
                        <>
                        <div className='grid gap-2 relative border rounded-lg p-3' onClick={() => navigate(`/tickets/${item?.id}`)}>
                            <div className={`bg-slate-200 opacity-45 absolute w-full h-full rounded-lg cursor-not-allowed ${item?.state === '1' && 'hidden'}`}></div>
                            <div className='flex justify-between items-center'>
                                <Title>شناسه</Title>
                                <Text className={`truncate w-28`}>{item?.id}</Text>
                            </div>
                            <div className='flex justify-between items-center'>
                                <Title>عنوان</Title>
                                <Text className={`cursor-pointer`}>{item?.title}</Text>
                            </div>
                            <div className='flex justify-between items-center'>
                                <Title>تاریخ و ساعت</Title>
                                <Text><DateShamsi hour={`2-digit`} minute={`2-digit`} date={item?.updated_at}/></Text>
                            </div>
                            <div className='flex justify-between items-center'>
                                <Title>وضعیت</Title>
                                <Text>
                                    {item?.state === 1 && 'باز'}
                                    {item?.state === 2 && 'درحال بررسی'}
                                    {item?.state === 3 && 'بسته'}
                                </Text>                       
                            </div>
                        </div>

                        <hr className='w-[92%] m-auto'/>
                        </>
                    ))}
                </div>
                

            </TabManagement>

            {/* tab form */}
            <TabManagement step={step} index={1}>
                <div className='flex justify-between items-center'>
                    <Text>برای ارسال تیکت به کارشناسان امور مشتریانِ زرین‌پال، فرم زیر را کامل کنید.</Text>

                    <ButtonGeneral onClick={() => setStep(0)}>بازگشت</ButtonGeneral>
                </div>

                <form>
                    <div className='w-[600px] max-[630px]:w-full  m-auto mt-4'>
                        <Input value={titleForm} onChange={(e) => setTitleForm(e.target.value)} className={`w-full bg-transparent border placeholder:text-gray-400`} placeholder={`عنوان تیکت`}/>

                        <div className='grid grid-cols-2 max-[630px]:grid-cols-1 items-center my-4'>
                            <FormControl sx={{ minWidth: 120 }} className='w-full !outline-none'>
                                <Select
                                    className='!outline-none !text-gray-400'
                                    value={selectorCategory}
                                    onChange={(e) => setSelectorCategory(e.target.value)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value="">
                                            <Text className={`text-gray-400`}>
                                                دسته بندی را انتخاب کنید
                                            </Text>
                                        </MenuItem>
                                        {dataSection?.results?.map((item) => (
                                            <MenuItem key={item?.id} value={item?.id}>
                                                <Text>
                                                    {item?.name}
                                                </Text>    
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>

                            <div className='flex justify-center items-center gap-3 max-[630px]:mt-4'>
                                <Text>اولویت بندی</Text>

                                <div className='border flex h-max p-2 rounded-3xl gap-2'>
                                    {priority?.map((item) => (
                                        <div key={item?.id} className={`px-2 py-1 border rounded-3xl cursor-pointer transition-colors ${
                                            item?.id === activeId ? 'bg-gray-200' : 'text-gray-400'
                                        }`}
                                        onClick={() => handleClick(item?.id)}>
                                            <Text className={`text-xs text-gray-400`}>{item?.name}</Text>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <textarea value={detail} onChange={(e) => setDetail(e.target.value)} name="" className='w-full border outline-none rounded-lg p-2 text-xs resize-none h-64' placeholder='توضیحات' id=""></textarea>
                        
                        <div className='flex justify-end items-center'>
                            {/* <div dir="rtl" className="flex items-center text-right gap-4 rounded-full border border-gray-200 shadow-sm px-3 py-2 w-full max-w-md">
                                <label className="text-gray-500 text-xs cursor-pointer w-max min-w-max bg-gray-200 px-3 py-1 rounded-xl">
                                    پیوست فایل
                                    <input type="file" onChange={handleFileChange} className="hidden" />
                                </label>
                                <span className={`text-gray-700 text-xs w-full px-2 py-1 rounded-xl`}>{fileSize}</span>
                            </div> */}

                            <ButtonGeneral className={`bg-customBlue text-white border-none`} onClick={(e) => {
                                e.preventDefault();
                                handleCreateTicket()
                                }}>ارسال تیکت</ButtonGeneral>
                        </div>
                    </div>
                </form>
            </TabManagement>
            
        </div>
    )
}

export default TabTickets
