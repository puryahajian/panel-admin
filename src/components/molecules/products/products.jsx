import React, { useState } from 'react'
import ButtonGeneral from '../../atoms/button-general';
import TabListProducts from './tab-list-products';
import TabCategory from './tab-category';
import GeneralModal from '../modal-general';
import Uploader from '../uploader';
import Text from '../../atoms/text';
import Input from '../../atoms/input';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import useCreateCategory from '../../db/use-create-category';
import useCreateProduct from '../../db/use-create-product';
import Loading from '../../atoms/loading';
import '../../../App.css'
import useGetAllCategory from '../../db/use-get-all-category';
import BirthDate from '../birth-day';


function TabProduct({ children, step, index }) {
    return (
        <div
            role="tabpanel"
            className='mt-0'
            hidden={step !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            style={{ backgroundColor: 'white', color: 'black', borderRadius: '8px'}}
        >
            {step === index && <div>{children}</div>}
        </div>
    );
}

function Products() {
    const [step, setStep] = useState(0);
    const [open, setOpen] = useState(false);
    const {mutate, isLoading} = useCreateCategory();
    const { mutate: mutateCreatedProduct , isLoading: isLoadingCreateProduct } = useCreateProduct();
    const { data: dataCategory } = useGetAllCategory();
    // console.log(dataCategory)
    const [openAddProduct, setOpenAddProduct] = useState(false);
    const [ selectedCategory, setSelectedCategory ] = useState();
    const [ bgProduct, setBgProduct ] = useState();
    const [preview, setPreview] = useState();
    const [previewProduct, setPreviewProduct] = useState();
    const [nameProduct, setNameProduct] = useState();
    const [priceProduct, setPriceProduct] = useState();
    const [birthDay, setBirthDay] = useState();
    const [gregorianBirthDay, setGregorianBirthDay] = useState("");
    const [selectorCategory, setSelectorCategory] = useState();
    const [unitName, setUnitName] = useState();
    const [offer, setOffer] = useState();
    const [description, setDescription] = useState();
    const [nameCategory, setNameCategory] = useState('');

    const Buttons = [
        {label: "لیست محصولات" },
        {label: "دسته بندی ها" },
    ];
  

    const handleSendCategory = () => {
        mutate(
            { 
                nameCategory, selectedCategory
            },
            {
                onSettled: (data) => {
                }
            }
        )
    }

    const handleCreateProduct = () => {
        // console.log(gregorianBirthDay)
        mutateCreatedProduct(
            {
                bgProduct, nameProduct, priceProduct, selectorCategory, unitName,offer, description, gregorianBirthDay
            }
        )
    }

    const formatNumber = (value) => {
        const numericValue = value.replace(/,/g, ''); // حذف ویرگول‌های قبلی
        return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // افزودن ویرگول سه‌رقمی
    };

    const handleChange = (e) => {
        const rawValue = e.target.value.replace(/,/g, ''); // فقط عدد خام
        if (!/^\d*$/.test(rawValue)) return; // فقط اعداد مجاز باشن
        setPriceProduct(formatNumber(rawValue));
    };


    return (
        <div className='max-[1024px]:mt-16 grid col-span-10'>
            <div className='flex justify-between shadow-lg w-full bg-white py-4 max-[1024px]:top-[64px]'>
                <div className='flex gap-4 max-[480px]:grid max-[480px]:grid-cols-2 max-[480px]:w-full max-[480px]:gap-2 pr-4'>
                    {Buttons.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => setStep(index)}
                            className={`px-7 py-3 rounded-lg text-sm font-sans text-grayText ${
                                step === index
                                    ? 'bg-grayText text-white'
                                    : 'border border-gray-600 text-grayText'
                            }`}
                            aria-controls={`vertical-tabpanel-${index}`}
                        >
                            <span className='font-sans text-sm '>{tab.label}</span>
                            
                        </button>
                    ))}
                </div>

                <div className=' max-[990px]:fixed max-[990px]:w-full max-[990px]:bottom-0 max-[990px]:right-0 max-[990px]:px-4 max-[990px]:py-2 max-[990px]:bg-white max-[990px]:opacity-95 ml-[17px] max-[990px]:ml-0'>
                    {step === 0 ? (
                        <ButtonGeneral onClick={() => setOpen(true)} className={` border border-blue-500 !text-blue-500 max-[990px]:w-full max-[990px]:bg-customBlue max-[990px]:!text-white`}>
                            افزودن محصول
                        </ButtonGeneral>
                    ) : (
                        <ButtonGeneral onClick={() => setOpenAddProduct(true)} className={`border border-blue-500 !text-blue-500 max-[990px]:w-full max-[990px]:bg-customBlue max-[990px]:!text-white`}>
                            افزودن دسته بندی
                        </ButtonGeneral>
                    )}
                </div>
            </div>
            <TabProduct step={step} index={0}>
                <hr className='w-[95%] m-auto'/>
                <TabListProducts/>
            </TabProduct>
            <TabProduct step={step} index={1}>
                <hr className='w-[95%] m-auto'/>
                <TabCategory/>
            </TabProduct>

            {/* add product */}
            <GeneralModal
                open={open}
                handleClose={(e) => {
                    e.preventDefault()
                    setOpen(false)
                }}
                // title="آیا می یخواهید این محصول را حذف کنید ؟"
                actionText={isLoadingCreateProduct ? <Loading/> : 'ذخیره'}
                actionHandler={(e) => { 
                    e.preventDefault()
                    handleCreateProduct()
                    setOpen(false); 
                }}
                classBtn={`mt-4`}
                onClose={(e) => {
                    e.preventDefault()
                    setOpen(false)}
                }
                // width={`w-[300px]`}
                sx={{
                    width: '500px', 
                    '@media (max-width: 600px)': {
                        width: '92%',
                    },
                }}
            >
                <div className='text-right'>
                    <div className='grid grid-cols-2 max-[1037px]:grid-cols-1 gap-4'>
                        <Uploader
                            textOne={`تصویر محصول را آپلود کنید`}
                            selectedFile={bgProduct}
                            onFileSelect={setBgProduct}
                            preview={previewProduct}
                            setPreview={setPreviewProduct}
                            className={`h-[200px]`}

                        />
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='border bg-bgInput font-sans rounded-xl p-2 resize-none text-xs outline-none placeholder:text-gray-400' placeholder='توضیحات'/>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='text-right'>
                            <Text className={`mt-4 mb-2`}>نام</Text>
                            <Input value={nameProduct} onChange={(e) => setNameProduct(e.target.value)} className={`w-full`} placeholder={`نام محصول را وارد کنید`}/>
                        </div>
                        <div className='text-right'>
                            <Text className={`mt-4 mb-2`}>قیمت</Text>
                            <div>
                                <p className='mt-3 mr-2 absolute font-sans text-xs'>تومان</p>
                                {/* <Input value={priceProduct} onChange={(e) => setPriceProduct(e.target.value)} onChange={handleChange} className={`w-full text-left`} placeholder={`۳۰۰۰`}/> */}
                                <Input value={priceProduct} onChange={handleChange} className={`w-full text-left`} placeholder={`۳۰۰۰`}/>
                            </div>
                        </div>                    
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className='text-right'>
                            <Text className={`mt-4 mb-2`}>نام واحد</Text>
                            <Input value={unitName} onChange={(e) => setUnitName(e.target.value)} className={`w-full`} placeholder={`نام واحد را وارد کنید`}/>
                        </div>
                        <div className='text-right'>
                            <Text className={`mt-4 mb-2`}>تخفیف</Text>
                            <Input value={offer} onChange={(e) => setOffer(e.target.value)} className={`w-full text-left`} placeholder={`20%`}/>
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className='text-right'>
                            <Text className={`mt-4 mb-2`}>دسته بندی</Text>
                            <FormControl sx={{ minWidth: 120, outline: 'none' }} className='w-full bg-bgInput !outline-none'>
                                <Select
                                    className='!outline-none'
                                    value={selectorCategory}
                                    // sx={{outline: 'none'}}
                                    onChange={(e) => setSelectorCategory(e.target.value)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    sx={{
                                        '& .MuiSelect-select': {
                                            padding: '10px 14px', // اعمال پدینگ به عنصر select داخلی
                                            outline: 'none'
                                        },
                                    }}
                                    >
                                        <MenuItem value="">
                                            <Text>
                                                دسته بندی را انتخاب کنید
                                            </Text>
                                        </MenuItem>
                                    {Array.isArray(dataCategory?.data) &&
                                    dataCategory?.data?.map((item) => (
                                        <MenuItem key={item?.id} value={item?.id}>
                                            <Text>
                                                {item?.name}
                                            </Text>    
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className='text-right'>
                            <Text className={`mt-4 mb-2`}>تاریخ تولد</Text>
                            <BirthDate value={birthDay}  onChange={setBirthDay} onGregorianChange={setGregorianBirthDay}/>  
                        </div> 
                    </div>
                </div>
            </GeneralModal>

            {/* add category */}
            <GeneralModal
                open={openAddProduct}
                handleClose={(e) => {
                    e.preventDefault()
                    setOpenAddProduct(false)
                }}
                // title="آیا می یخواهید این دسته بندی را حذف کنید ؟"
                actionText={isLoading ? <Loading/> : 'ذخیره'}
                actionHandler={(e) => {
                    e.preventDefault()
                    handleSendCategory();
                    setOpenAddProduct(false); 
                }}
                onClose={(e) => {
                    e.preventDefault()
                    setOpenAddProduct(false);  
                }}
                sx={{
                    width: '400px', 
                    '@media (max-width: 600px)': {
                        width: '92%',
                    },
                }}
            >
                <div className=' text-right'>
                    <Uploader
                        textOne={`تصویر دسته بندی را اپلود کنید`}
                        // textTwo={`سایز تصویر شما نباید از ۲۰۰ کیلو بایت بیشتر باشه`}
                        selectedFile={selectedCategory}
                        onFileSelect={setSelectedCategory}
                        preview={preview}
                        setPreview={setPreview}
                        className={`h-[260px]`}
                    />

                    <Text className={`mt-4 mb-2`}>نام</Text>
                    <Input value={nameCategory} onChange={(e) => setNameCategory(e.target.value)} className={`w-full mb-4`} placeholder={`نام دسته بندی خود را وارد کنید`}/>
                </div>
            </GeneralModal>
        </div>
    )
}

export default Products
