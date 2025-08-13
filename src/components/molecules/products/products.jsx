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
import useGetProductCategory from '../../db/use-get-product-category';
import useCreateProduct from '../../db/use-create-product';
import Loading from '../../atoms/loading';
import '../../../App.css'
import useDeleteImageProduct from '../../db/use-delete-image-product';
import UseAddImagesProduct from '../../db/use-add-images-product';
import { toast } from 'react-toastify';
import InputNumberic from '../../atoms/input-numberic';


function TabProduct({ children, step, index }) {
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

function Products() {
    const [step, setStep] = useState(0);
    const [open, setOpen] = useState(false);
    const {mutate, isLoading} = useCreateCategory();
    const { mutate: mutateDeleteImage } = useDeleteImageProduct();
    const { mutate: mutateCreatedProduct, isPending } = useCreateProduct();
    const { mutate: mutateAddImage } = UseAddImagesProduct();
    const { data: dataCategory } = useGetProductCategory();
    const [openAddProduct, setOpenAddProduct] = useState(false);
    const [ selectedCategory, setSelectedCategory ] = useState();
    const [ bgProduct, setBgProduct ] = useState(null);
    const [ errCreate, setErrCreate ] = useState(null);

    const [preview, setPreview] = useState(null);
    const [ selectedFile, setSelectedFile ] = useState(null);
    const [previewProduct, setPreviewProduct] = useState(null);
    const [ selectedImage1, setSelectedImage1 ] = useState(null);
    const [previewImage1, setPreviewImage1] = useState(null);

    const [ selectedImage2, setSelectedImage2 ] = useState(null);
    const [previewImage2, setPreviewImage2] = useState(null);

    const [ selectedImage3, setSelectedImage3 ] = useState(null);
    const [previewImage3, setPreviewImage3] = useState(null);

    const [ selectedImage4, setSelectedImage4 ] = useState('');
    const [previewImage4, setPreviewImage4] = useState('');

    const [ selectedImage5, setSelectedImage5 ] = useState('');
    const [previewImage5, setPreviewImage5] = useState('');

    const [priceNumber, setPriceNumber] = useState();
    const [count, setCount] = useState();
    const [unitWeigth, setUnitWeigth] = useState();

    const [nameProduct, setNameProduct] = useState('');
    const [priceProduct, setPriceProduct] = useState('');
    const [selectorCategory, setSelectorCategory] = useState();
    const [unitName, setUnitName] = useState();
    const [offer, setOffer] = useState();
    const [description, setDescription] = useState('');
    const [nameCategory, setNameCategory] = useState('');
    const [ productTol, setProductTol ] = useState('');
    const [ productArz, setProductArz ] = useState('');
    const [ productErtefa, setProductErtefa ] = useState('');

    const [ wholPrice, setWholPrice ] = useState('');
    const [isCheckedAmazon, setIsCheckedAmazon] = useState(false);
    const [isCheckedSoqMaftoh, setIsCheckedSoqMaftoh] = useState(false);
    const [isCheckedNon, setIsCheckedNon] = useState(false);
    

    const handleCheckboxChangeAmazon = () => {
        const valueAmazon = !isCheckedAmazon;
        setIsCheckedAmazon(valueAmazon); 
    };

    const handleCheckboxChangeSoqMaftoh = () => {
        const valueSoqMaftoh = !isCheckedSoqMaftoh;
        setIsCheckedSoqMaftoh(valueSoqMaftoh); 
    };

    const handleCheckboxChangeNon = () => {
        const valueNon = !isCheckedNon;
        setIsCheckedNon(valueNon); 
    };

    const Buttons = [
        {label: "لیست محصولات" },
        // {label: "دسته بندی ها" },
    ];

    const [uploaderCount, setUploaderCount] = useState(1); 
    
    // const handleAddUploader = (e) => {
    //     e.preventDefault();
    //     if (uploaderCount < 5) {
    //         setUploaderCount(prev => prev + 1);
    //     }
    // };

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

        // console.log(selectedImage1,
        //         selectedImage2,
        //         selectedImage3,)

        if (bgProduct === null && selectedFile === null && selectedImage1 === null && selectedImage2 === null && selectedImage3 === null) {
            const errorMessage = 'لطفاً حداقل یک تصویر برای محصول انتخاب کنید';
            setErrCreate({ message: errorMessage });
            toast.info('تصویر را انتخاب کنید');
            return;
        } else if (nameProduct === '' || priceProduct === '' ) {
            setErrCreate({ message: 'فیلدهای نام، قیمت, عکس الزامی هستند' });
            toast.info('فیلدهای نام، قیمت الزامی هستند');
            return;
        }

        mutateCreatedProduct(
            {
                selectedFile,
                bgProduct,
                nameProduct, 
                priceProduct, 
                // selectorCategory, 
                unitName,
                offer, 
                description, 
                selectedImage1,
                selectedImage2,
                selectedImage3,
                wholPrice,
                isCheckedAmazon,
                isCheckedSoqMaftoh,
                isCheckedNon,
                productTol,
                productArz,
                productErtefa,
                count
            },
            {
                onSuccess: (data) => {
                    setOpen(false); 
                    setPreviewProduct(null);
                    setPreview(null);
                    setNameProduct('');
                    setPriceProduct('');
                    // setSelectorCategory('');
                    setUnitName('');
                    setOffer('');
                    setDescription('');
                    setPreviewImage1(null);
                    setPreviewImage2(null);
                    setPreviewImage3(null);
                    setWholPrice('');
                    setIsCheckedAmazon(false);
                    setIsCheckedSoqMaftoh(false);
                    setIsCheckedNon(false);
                    setProductTol('');
                    setProductArz('');
                    setProductErtefa('');
                    setErrCreate(null)
                },
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
    const handleChangePriceNumber = (e) => {
        const wholValue = e.target.value.replace(/,/g, ''); // فقط عدد خام
        if (!/^\d*$/.test(wholValue)) return; // فقط اعداد مجاز باشن
        setWholPrice(formatNumber(wholValue));
    };


    return (
        <div>
            <div className='flex justify-between'>
                <div className='flex gap-4 max-[480px]:grid max-[480px]:grid-cols-2 max-[480px]:w-full max-[480px]:gap-2'>
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

                <div className='max-[990px]:fixed max-[990px]:w-full max-[990px]:bottom-0 max-[990px]:right-0 max-[990px]:px-4 max-[990px]:py-2 max-[990px]:bg-white max-[990px]:opacity-95'>
                    {step === 0 ? (
                        <ButtonGeneral onClick={() => setOpen(true)} className={` border border-blue-500 !text-blue-500 max-[990px]:w-full max-[990px]:bg-customBlue max-[990px]:!text-white`}>
                            افزودن محصول
                        </ButtonGeneral>
                    ):(
                        <></>
                    )}
                     {/* : (
                         <ButtonGeneral onClick={() => setOpenAddProduct(true)} className={`border border-blue-500 !text-blue-500 max-[990px]:w-full max-[990px]:bg-customBlue max-[990px]:!text-white`}>
                             افزودن دسته بندی
                         </ButtonGeneral>
                     )} */}
                </div>
            </div>
            <TabProduct step={step} index={0}>
                <hr className='w-[95%] m-auto'/>
                <TabListProducts/>
            </TabProduct>
            <TabProduct step={step} index={1}>
                <hr className='w-[95%] m-auto'/>
                {/* <TabCategory/> */}
            </TabProduct>

            <GeneralModal
                open={open}
                handleClose={(e) => {
                    e.preventDefault()
                    setOpen(false)
                }}
                // title="آیا می یخواهید این محصول را حذف کنید ؟"
                actionText={isPending ? <Loading/> : 'ذخیره'}
                actionHandler={(e) => { 
                    e.preventDefault()
                    handleCreateProduct();
                }}
                classBtn={`mt-4`}
                onClose={(e) => {
                    e.preventDefault()
                    setOpen(false)}
                }
                sx={{
                    width: '800px', 
                    '@media (max-width: 840px)': {
                        width: '92%',
                    },
                }}
            >
                <div className='grid grid-cols-2 max-[840px]:grid-cols-1 gap-4'>
                    <div className=''> 
                        <div className='h-max max-[840px]:hidden'>
                            <Text className={`text-right text-sm mb-1`}>سایز تصویر باید ۲۰۰ * ۲۰۰ پیکسل باشد</Text>
                            <Uploader
                                textOne={`عکس محصول را انتخاب کنید`}
                                selectedFile={selectedFile}
                                onFileSelect={setSelectedFile}
                                preview={preview} 
                                setPreview={setPreview}
                                clssBtnDelete={`hidden`}
                                className={`h-[200px] min-h-9 max-h-[200px] ${errCreate ? '!border-red-500' : ''}`}
                            />
                        </div>
                        <form className='mt-4 max-[840px]:!mt-0'>
                            <div className='grid grid-cols-3 gap-4 max-[840px]:hidden'>
                                <Uploader
                                    // textOne={`عکس محصول را انتخاب کنید`}
                                    selectedFile={selectedImage1}
                                    onFileSelect={setSelectedImage1}
                                    preview={previewImage1}
                                    setPreview={setPreviewImage1}
                                    clssBtnDelete={`hidden`}
                                    className={`h-[80px] max-[840px]:h-[80px] max-[840px]:min-h-20 min-h-9 max-h-[80px]`}
                                />
                                <Uploader
                                    // textOne={`عکس محصول را انتخاب کنید`}
                                    selectedFile={selectedImage2}
                                    onFileSelect={setSelectedImage2}
                                    preview={previewImage2}
                                    setPreview={setPreviewImage2}
                                    clssBtnDelete={`hidden`}
                                    className={`h-[80px] max-[840px]:h-[80px] max-[840px]:min-h-20 min-h-9 max-h-[80px]`}
                                />
                                <Uploader
                                    // textOne={`عکس محصول را انتخاب کنید`}
                                    selectedFile={selectedImage3}
                                    onFileSelect={setSelectedImage3}
                                    preview={previewImage3}
                                    setPreview={setPreviewImage3}
                                    clssBtnDelete={`hidden`}
                                    className={`h-[80px] max-[840px]:h-[80px] max-[840px]:min-h-20 min-h-9 max-h-[80px]`}
                                />
                            </div>

                            <div className='text-right mt-2 max-[840px]:hidden'>
                                <Text>اجازه فروش در :</Text>
                                
                               <div className='grid grid-cols-3 max-[840px]:hidden'>
                                    <div className='flex justify-start items-center gap-2 mt-2'>
                                        <input type="checkbox" 
                                            checked={isCheckedAmazon}
                                            onChange={handleCheckboxChangeAmazon} 
                                        />
                                        <Text>آمازون</Text>
                                    </div>
                                    <div className='flex justify-start items-center gap-2 mt-2'>
                                        <input type="checkbox" 
                                            checked={isCheckedSoqMaftoh}
                                            onChange={handleCheckboxChangeSoqMaftoh} 
                                        />
                                        <Text>سوق المفتوح</Text>
                                    </div>
                                    <div className='flex justify-start items-center gap-2 mt-2'>
                                        <input type="checkbox" 
                                            checked={isCheckedNon}
                                            onChange={handleCheckboxChangeNon} 
                                        />
                                        <Text>نون</Text>
                                    </div>
                                </div>
                            </div>
                        </form>
                       
                    </div>
                    <div className='max-[840px]:h-[500px] max-[840px]:overflow-x-hidden max-[840px]:overflow-y-auto'>  
                        <div className='grid grid-cols-2 gap-4'>
                            <div className='text-right'>
                                <Text className={` mb-2`}>نام</Text>
                                <Input value={nameProduct} onChange={(e) => setNameProduct(e.target.value)} className={`w-full ${errCreate ? 'border !border-red-500' : ''}`} placeholder={`نام محصول را وارد کنید`}/>
                            </div>
                            <div className='text-right'>
                                <Text className={`mb-2`}>قیمت تکی</Text>
                                <div className='relative'>
                                    <p className='mt-[13px] mr-2 absolute font-sans text-xs'>تومان</p>
                                    <InputNumberic value={priceProduct} onChange={handleChange} className={`w-full text-left ${errCreate ? 'border !border-red-500' : ''}`} placeholder={`۳۰۰۰`}/>
                                </div>
                            </div>                    
                        </div>

                        <div className='grid grid-cols-2 text-right mt-6 gap-4'>
                            <div>
                                <Text>قیمت عمده</Text>
                                <div className=' relative'>
                                    <p className='mt-[22px] mr-2 absolute font-sans text-xs'>تومان</p>    
                                    <InputNumberic value={wholPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} placeholder={`۳۰۰۰۰`} onChange={handleChangePriceNumber} className={`w-full mt-2 !bg-bgInput !text-left bg-transparent border border-gray-300`}/>
                                </div>
                            </div>
                            <div>
                                <Text>تعداد موجود</Text>
                                <InputNumberic value={count} onChange={(e) => setCount(e.target.value)} className={`w-full !bg-bgInput !text-left mt-2 bg-transparent border border-gray-300`}/>
                            </div>
                        </div>

                        {/* <div className='text-right mt-4 gap-4'>
                            <Text className={`mb-2`}>دسته بندی</Text>
                            <FormControl sx={{ minWidth: 120, outline: 'none' }} className={`w-full bg-bgInput !rounded-lg !outline-none ${errCreate ? 'border !border-red-500' : ''}`}>
                                <Select
                                    className={`!outline-none !rounded-lg ${errCreate ? 'border !border-red-500' : ''}`}
                                    value={selectorCategory}
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                        '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                        outline: 'none'
                                    }}
                                    onChange={(e) => setSelectorCategory(e.target.value)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                    {dataCategory?.map((item) => (
                                        <MenuItem key={item?.id} value={item?.id}>
                                            <Text>
                                                {item?.name}
                                            </Text>    
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div> */}

                        <div className='grid grid-cols-2 text-right mt-6 gap-4'>
                            <div>
                                <Text className={`text-right`}>تخفیف</Text>
                                <div className='relative mt-2'>
                                    <p className='mt-[13px] mr-3 absolute font-sans text-sm'>٪</p>  
                                    <InputNumberic value={offer} onChange={(e) => setOffer(e.target.value)} className={`w-full text-left`} placeholder={`20`}/>
                                </div>
                            </div>
                            <div>
                                <Text>وزن واحد</Text>
                                <div className='relative'>
                                    <p className='mt-[21px] mr-2 absolute font-sans text-xs'>gr</p>    
                                    <InputNumberic value={unitWeigth} placeholder={`۳۰۰۰۰`} onChange={(e) => setUnitWeigth(e.target.value)} className={`w-full mt-2 !bg-bgInput text-left bg-transparent`}/>
                                </div>
                            </div>
                        </div>

                        <Text className={`text-right mt-5`}>ابعاد واحد cm</Text>
                        <div className='grid grid-cols-3 text-right mt-2 gap-2'>
                            <div className='relative'>
                                <p className='!mt-[16px] mr-2 absolute font-sans text-xs'>طول</p>    
                                <InputNumberic value={productTol} placeholder={`20`} onChange={(e) => setProductTol(e.target.value)} className={`w-full text-left !bg-bgInput bg-transparent border border-gray-300`}/>
                            </div>
                            <div className='relative'>
                                <p className='!mt-[16px] mr-2 absolute font-sans text-xs'>عرض</p>    
                                <InputNumberic value={productArz} placeholder={`20`} onChange={(e) => setProductArz(e.target.value)} className={`w-full text-left !bg-bgInput bg-transparent border border-gray-300`}/>
                            </div>
                            <div className='relative'>
                                <p className='!mt-[16px] mr-2 absolute font-sans text-xs'>ارتفاع</p>    
                                <InputNumberic value={productErtefa} placeholder={`20`} onChange={(e) => setProductErtefa(e.target.value)} className={`w-full text-left !bg-bgInput bg-transparent border border-gray-300`}/>
                            </div>
                        </div>


                        <div className='max-[840px]:block mt-6 hidden'>
                            <div className='max-[840px]:mb-4'>
                                <Text className={`text-right text-sm mb-4`}>سایز تصویر باید ۲۰۰ * ۲۰۰ پیکسل باشد</Text>
                                <Uploader
                                    textOne={`تصویر محصول را آپلود کنید`}
                                    selectedFile={bgProduct}
                                    onFileSelect={setBgProduct}
                                    preview={previewProduct}
                                    setPreview={setPreviewProduct}
                                    className={`h-[274px]`}
                                />
                            </div>
                        </div>
                        <div className=' grid-cols-3 gap-4 hidden max-[840px]:grid'>
                            <Uploader
                                // textOne={`عکس محصول را انتخاب کنید`}
                                selectedFile={selectedImage1}
                                onFileSelect={setSelectedImage1}
                                preview={previewImage1}
                                setPreview={setPreviewImage1}
                                clssBtnDelete={`hidden`}
                                className={`h-[80px] max-[840px]:h-[80px] max-[840px]:min-h-24 min-h-9 max-h-[80px]`}
                            />
                            <Uploader
                                // textOne={`عکس محصول را انتخاب کنید`}
                                selectedFile={selectedImage2}
                                onFileSelect={setSelectedImage2}
                                preview={previewImage2}
                                setPreview={setPreviewImage2}
                                clssBtnDelete={`hidden`}
                                className={`h-[80px] max-[840px]:h-[80px] max-[840px]:min-h-24 min-h-9 max-h-[80px]`}
                            />
                            <Uploader
                                // textOne={`عکس محصول را انتخاب کنید`}
                                selectedFile={selectedImage3}
                                onFileSelect={setSelectedImage3}
                                preview={previewImage3}
                                setPreview={setPreviewImage3}
                                clssBtnDelete={`hidden`}
                                className={`h-[80px] max-[840px]:h-[80px] max-[840px]:min-h-24 min-h-9 max-h-[80px]`}
                            />
                        </div>

                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='border h-[130px] bg-bgInput w-full font-sans hidden max-[840px]:block rounded-xl p-2 my-4 resize-none text-xs outline-none placeholder:text-gray-400' placeholder='توضیحات'/>

                        <div className='text-right my-6 hidden max-[840px]:block'>
                            <Text>اجازه فروش در :</Text>
                            
                            <div className='grid-cols-3 hidden max-[840px]:grid'>
                                <div className='flex justify-start items-center gap-2 mt-2'>
                                    <input type="checkbox" 
                                        checked={isCheckedAmazon}
                                        onChange={handleCheckboxChangeAmazon} 
                                    />
                                    <Text>آمازون</Text>
                                </div>
                                <div className='flex justify-start items-center gap-2 mt-2'>
                                    <input type="checkbox" 
                                        checked={isCheckedSoqMaftoh}
                                        onChange={handleCheckboxChangeSoqMaftoh} 
                                    />
                                    <Text>سوق المفتوح</Text>
                                </div>
                                <div className='flex justify-start items-center gap-2 mt-2'>
                                    <input type="checkbox" 
                                        checked={isCheckedNon}
                                        onChange={handleCheckboxChangeNon} 
                                    />
                                    <Text>نون</Text>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='border h-[130px] bg-bgInput w-full font-sans max-[840px]:hidden rounded-xl p-2 mt-4 resize-none text-xs outline-none placeholder:text-gray-400' placeholder='توضیحات'/>
            </GeneralModal>

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
