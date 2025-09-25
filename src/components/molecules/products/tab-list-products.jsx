import React, { useEffect, useState, useRef, useCallback } from 'react'
import Text from '../../atoms/text'
import ButtonExisting from '../../atoms/button-existing'
import ButtonEdit from '../../atoms/button-edit'
import GeneralModal from '../modal-general'
import useGetAllProducts from '../../db/use-get-all-products'
import useDeleteProduct from '../../db/use-delete-product'
import useGetProductCategory from '../../db/use-get-product-category'
import usePatchProduct from '../../db/use-patch-product'
import Input from '../../atoms/input'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Uploader from '../uploader'
import Loading from '../../atoms/loading';
import DateShamsi from '../date-shamsi'
import Title from '../../atoms/title'
import { FormControl, Tooltip } from '@mui/material'
import { toast } from 'react-toastify'
import Rial from '../../../assets/image/Frame.png'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function TabListProducts() {
    const { mutate } = useDeleteProduct();
    const { data } = useGetAllProducts();
    // console.log(data)
    const { data: dataCategory } = useGetProductCategory();
    // console.log(dataCategory)
    const { mutate: mutatePatchProduct, isLoading } = usePatchProduct();
    const [selectIdProduct, setSelectIdProduct] = useState(null);
    const selectedItem = Array.isArray(data?.data)
        ? data?.data?.find((it) => it?.id === selectIdProduct)
        : null;
        // console.log(selectedItem)
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState('');
    const [selectorCategory, setSelectorCategory] = useState(selectedItem?.category_name);   
    const [selectorState, setSelectorState] = useState('');  
    const [nameEditProduct, setNameEditProduct] = useState(selectedItem?.name)
    const [priceEditProduct, setPriceEditProduct] = useState(selectedItem?.price);
    const [descriptionEdit, setDescriptionEdit] = useState(selectedItem?.details);
    const [offerEdit, setOfferEdit] = useState(selectedItem?.discount_percentage);
    const [omNameProduct, setOmNameProduct] = useState();
    
    const [idEdit, setIdEdit] = useState();
    const [inState, setInState] = useState(false);
    const [ selectedFile, setSelectedFile ] = useState('');
    const [preview, setPreview] = useState('');
    const [errors, setErrors] = useState({});

    // Lazy loading state
    const [displayCount, setDisplayCount] = useState(20);
    const [isLoadingLoder, setIsLoading] = useState(false);


   useEffect(() => {
        if (selectedItem) {
            setNameEditProduct(selectedItem?.name || '');
            setPriceEditProduct(selectedItem?.price || '');
            setOmNameProduct(selectedItem?.om_name || '');
            setDescriptionEdit(selectedItem?.details || '');
            setOfferEdit(selectedItem?.discount_percentage || '');
            setSelectorCategory(selectedItem?.category ? String(selectedItem?.category) : ''); // category id را string کن
            setSelectorState(
                selectedItem?.exist !== undefined
                    ? String(selectedItem?.exist)  // تبدیل boolean به string برای select
                    : ''
            );
            setPreview(selectedItem?.image || null);
        }
    }, [selectedItem]);

    
    const stateProduct = [
        { label: 'فعال', value: 'true' },
        { label: 'غیرفعال', value: 'false' }
    ]

    const handleDeleteProduct = () => {
        mutate(
            { 
                selectedItemId 
            }, 
            {
            onSuccess: (data) => {
                setOpen(false);
            },
        });
    };
    
    const handleEditProduct = (idEdit, currentExist) => {
        const newValue = !currentExist;
        setInState(newValue);

        mutatePatchProduct(
            { 
                idEdit, selectorCategory, selectorState, nameEditProduct, priceEditProduct, selectedFile, inState: newValue, omNameProduct
            },    
        );

    }

    const formatNumber = (value) => {
        const numericValue = value.replace(/,/g, ''); // حذف ویرگول‌های قبلی
        return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // افزودن ویرگول سه‌رقمی
    };

    // Lazy loading 
    const loadMore = () => {
        if (isLoadingLoder) return;
        
        setIsLoading(true);
        setTimeout(() => {
            setDisplayCount(prev => prev + 10);
            setIsLoading(false);
        }, 400);
    };

    // مدیریت lazy loading
    const observerRef = React.useRef();
    const lastElementRef = React.useCallback(node => {
        if (isLoadingLoder) return;
        if (observerRef.current) observerRef.current.disconnect();
        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && displayCount < (data?.data?.length || 0)) {
                loadMore();
            }
        });
        if (node) observerRef.current.observe(node);
    }, [isLoadingLoder, displayCount, data?.data?.length]);

    const handleChange = (e) => {
        const rawValue = e.target.value.replace(/,/g, ''); // فقط عدد خام
        if (!/^\d*$/.test(rawValue)) return; // فقط اعداد مجاز باشن
        setPriceEditProduct(formatNumber(rawValue));
    };

    // مدیریت ارور ها
    const validateFormEdit = () => {
        let newErrors = {};

        if (!selectedFile && !selectedItem?.image) {
            newErrors.image = "تصویر محصول الزامی است";
        }
        if (!nameEditProduct || nameEditProduct === "") {
            newErrors.nameEditProduct = "نام محصول الزامی است";
        }
        if (!priceEditProduct || priceEditProduct === "") {
            newErrors.priceEditProduct = "قیمت الزامی است";
        }
        if (!selectorCategory) {
            newErrors.selectorCategory = "انتخاب دسته‌بندی الزامی است";
        }
        if (!descriptionEdit || descriptionEdit === "") {
            newErrors.descriptionEdit = "توضیحات الزامی است";
        }
        if (!selectorState) {
            newErrors.selectorState = "انتخاب وضعیت الزامی است";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <div className='mt-0 px-4 max-[1024px]:mt-[24px]'>
            <div className='flex items-center max-[992px]:hidden'>
                <Text>ردیف</Text>
                <div className='grid grid-cols-8 items-center w-full py-4'>
                    <Text className={`col-span-2 pr-11`}>محصول</Text>
                    <Text className={`col-span-1 pr-6`}>دسته بندی</Text>
                    <Text className={`mr-[42px]`}>کد محصول</Text>
                    <Text className={`mr-[40px]`}>تاریخ </Text>

                </div>
            </div>

            <div className='grid gap-2'>
                {Array.isArray(data?.data) && data?.data?.length > 0 ? (
                    data?.data?.slice(0, displayCount).map((item, index) => (
                        <div 
                            className='flex items-center border border-grayTitle rounded-2xl max-[992px]:hidden' 
                            key={item?.id}
                            ref={index === displayCount - 1 ? lastElementRef : null}
                        >
                            <div className='px-8'>{index + 1}</div>
                            <div className='grid grid-cols-8 items-center p-4 pr-0 w-full'>
                                <div className='col-span-2 flex items-center gap-6'>
                                    <img 
                                        src={item?.image} 
                                        className='w-16 h-16 rounded-lg object-cover' 
                                        alt={item?.name || 'تصویر محصول'}
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.src = '/src/assets/image/default-logo.png';
                                        }}
                                    />
                                    <div className='grid gap-2'>
                                        <Text>{item?.name}</Text>
                                        <Text className={`flex items-center`}>{item?.price?.toLocaleString('fa-IR')} <img src={Rial} alt="ریال" loading="lazy" /></Text>
                                    </div>
                                </div>

                                <Text>{item?.category_name ? item?.category_name : 'ندارد'}</Text>

                                <div className='flex items-center justify-between gap-2'>
                                    <Text 
                                        className={`truncate w-28 cursor-pointer rounded mr-7`} 
                                        onClick={() => {
                                            navigator.clipboard.writeText(item?.sku);
                                            toast.success('کپی شد')
                                            // می‌توانید یک toast یا پیام موفقیت نمایش دهید
                                        }}
                                        title="کلیک برای کپی کردن"
                                    >
                                        {item?.sku === null || "" ? "ندارد" : item?.sku}{item?.sku === "" && "ندارد"}
                                    </Text>
                                    <Tooltip title="کپی کد محصول" placement="top">
                                        <ContentCopyIcon onClick={() => {
                                            navigator.clipboard.writeText(item?.sku);
                                            toast.success('کپی شد')
                                            // می‌توانید یک toast یا پیام موفقیت نمایش دهید
                                        }} className='!text-sm cursor-pointer'/>
                                    </Tooltip>
                                </div>

                                <Text className={`mr-7`}><DateShamsi date={item?.create_date} /></Text>

                                <div className='col-span-2 flex justify-end gap-4'>
                                    <ButtonExisting
                                        onClick={() => handleEditProduct(item.id, item.exist)}
                                        className={`${item?.exist === true ? '' : 'bg-red-500 border-transparent'}`}
                                    >
                                        {item?.exist === true ? 'فعال' : 'غیر فعال'}
                                    </ButtonExisting>

                                    <ButtonEdit onClick={() => {
                                            setIdEdit(item);
                                            setOpenEdit(true);
                                            setSelectIdProduct(item?.id);
                                        }}>
                                            ویرایش
                                    </ButtonEdit>
                                </div>

                                <div className='text-center'>
                                    <button onClick={() => {
                                        setOpen(true);
                                        setSelectedItemId(item?.id);
                                    }}>
                                        <Text className='text-red-500'>حذف</Text>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    ''
                )}

                {data?.count === 0 && (
                    <div className='flex justify-center mt-4'>
                        <Text>محصول موجود نیست</Text>
                    </div>
                )}

            
               
            </div>
            {/* Loading indicator */}
            {isLoadingLoder && (
                <div className='flex justify-center mt-4'>
                    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></div>
                </div>
            )}

            {/* size tablet & mobile */}
            <div className='gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] hidden max-[992px]:grid max-[990px]:mb-14'>
                {Array.isArray(data?.data) && data.data.length > 0 ? (
                    data.data.slice(0, displayCount).map((item, index) => (
                        <div 
                            className='border border-grayTitle rounded-2xl p-4' 
                            key={item?.id}
                        >
                            <div className='flex gap-4'>
                                <img 
                                    src={item?.image} 
                                    className={`min-w-16 h-16 rounded-lg object-cover`} 
                                    alt={item?.name || 'تصویر محصول'}
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.src = '/src/assets/image/default-logo.png';
                                    }}
                                />
                                <div className='w-full grid gap-1'>
                                    <div className='flex justify-between items-center'>
                                        <Title>دسته بندی :</Title>
                                        <Text>{item?.category_name}</Text>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <Title>کد محصول :</Title>
                                        <Text>{item?.sku === null ? "ندارد" : item?.sku} {item?.sku === "" && "ندارد"}</Text>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <Title>محصول :</Title>
                                        <Text>{item?.name}</Text>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <Title>قیمت :</Title>
                                        <Text>{item?.price?.toLocaleString('fa-IR')} تومان</Text>
                                    </div>
                                </div>
                            </div>
                            <div className='grid grid-cols-3 gap-3 mt-4'>
                                <ButtonExisting 
                                    onClick={() => handleEditProduct(item.id, item.exist)}
                                    className={`${item?.exist === true ? '' : 'bg-red-500 border-transparent'}`}
                                    >
                                        {item?.exist === true ? 'فعال' : 'غیر فعال'}
                                </ButtonExisting>
                            
                                <ButtonEdit onClick={() => {
                                    setIdEdit(item)
                                    setOpenEdit(true)
                                    setSelectIdProduct(item?.id)
                                    }}>
                                        ویرایش
                                </ButtonEdit>

                                <button onClick={() => { 
                                    setOpen(true)
                                    setSelectedItemId(item?.id)
                                    }}>
                                    <Text className={`text-red-500`}>
                                        حذف
                                    </Text>
                                </button>
                            </div>
                        </div>
                       ))
                ) : (
                    ''
                )}

                {data?.count === 0 && (
                    <div className='flex justify-center mt-4'>
                        <Text>محصول موجود نیست</Text>
                    </div>
                )}

            </div>

            {/* <div className='flex justify-center mt-4'>
                {data?.length === 0 && <Text>محصول موجود نیست</Text>}
            </div> */}

            <GeneralModal
                open={open && selectedItemId !== null}
                handleClose={(e) => {
                    e.preventDefault()
                    setOpen(false)
                }}
                title="آیا می خواهید این محصول را حذف کنید ؟"
                // content="این یک مودال عمومی است که در تمام بخش‌ها می‌توان از آن استفاده کرد."
                actionText="بله"
                actionHandler={(e) => { 
                    e.preventDefault()
                    handleDeleteProduct()
                    setOpen(false); 
                }}
                onClose={(e) => {
                    e.preventDefault()
                    setOpen(false)}
                }
                sx={{
                    width: '500px', 
                    '@media (max-width: 600px)': {
                        width: '92%',
                    },
                }}
            />

            <GeneralModal
                open={openEdit}
                handleClose={(e) => {
                    e.preventDefault();
                    setOpenEdit(false);
                    setErrors({});
                }}
                actionText={isLoading ? <Loading/> : 'ذخیره'}
                actionHandler={(e) => { 
                    e.preventDefault();
                    if (!validateFormEdit()) return; // جلوی ذخیره را بگیر اگر خطا هست
                    handleEditProduct(idEdit?.id);
                    setOpenEdit(false); 
                    setErrors({});
                }}
                onClose={(e) => {
                    e.preventDefault();
                    setOpenEdit(false);
                    setErrors({});
                }}
                sx={{
                    width: '500px', 
                    '@media (max-width: 600px)': { width: '92%' },
                }}
                >
                <div className='grid grid-cols-2 max-[550px]:grid-cols-1 gap-4'>
                    {/* آپلودر + خطا */}
                    <div>
                    <Uploader
                        textOne={`عکس محصول را انتخاب کنید`}
                        selectedFile={selectedFile}
                        onFileSelect={(file) => {
                        setSelectedFile(file);
                        if (errors.image) { const { image, ...rest } = errors; setErrors(rest); }
                        }}
                        preview={selectedItem?.image || preview}
                        setPreview={setPreview}
                        className={`h-[155px] min-h-9 max-h-[155px] ${errors.image ? "border border-red-500" : ""}`}
                    />
                    {errors?.image && <p className="text-red-500 text-xs mt-1">{errors?.image}</p>}
                    </div>

                    {/* توضیحات + خطا */}
                    <div>
                    <textarea
                        value={descriptionEdit}
                        onChange={(e) => {
                        setDescriptionEdit(e.target.value);
                        if (errors?.descriptionEdit) { const { descriptionEdit, ...rest } = errors; setErrors(rest); }
                        }}
                        className={`border rounded-xl p-2 font-sans resize-none text-xs outline-none placeholder:text-gray-400 w-full h-[155px] ${errors?.descriptionEdit ? "border-red-500" : "border-gray-300"}`}
                        placeholder='توضیحات'
                    />
                    {errors?.descriptionEdit && <p className="text-red-500 text-xs mt-1">{errors?.descriptionEdit}</p>}
                    </div>
                </div>

                <div className='grid grid-cols-2 text-right mt-4 gap-2'>
                    {/* نام محصول + خطا */}
                    <div>
                        <Text>نام محصول</Text>
                        <Input
                            value={nameEditProduct}
                            onChange={(e) => {
                            setNameEditProduct(e.target.value);
                            if (errors?.nameEditProduct) { const { nameEditProduct, ...rest } = errors; setErrors(rest); }
                            }}
                            className={`w-full mt-2 bg-transparent border ${errors?.nameEditProduct ? "border-red-500" : "border-gray-300"}`}
                            placeholder="نام محصول"
                        />
                        {errors?.nameEditProduct && <p className="text-red-500 text-xs mt-1">{errors?.nameEditProduct}</p>}
                    </div>
                    <div>
                        <Text>نام عربی</Text>
                        <Input
                            value={omNameProduct}
                            onChange={(e) => {
                            setOmNameProduct(e.target.value);
                            if (errors.omNameProduct) { const { omNameProduct, ...rest } = errors; setErrors(rest); }
                            }}
                            className={`w-full mt-2 bg-transparent border ${errors?.omNameProduct ? "border-red-500" : "border-gray-300"}`}
                            placeholder="نام عربی محصول"
                        />
                        {errors?.omNameProduct && <p className="text-red-500 text-xs mt-1">{errors?.omNameProduct}</p>}
                    </div>

                </div>

                {/* قیمت + خطا */}
                <div className='mt-4 text-right'>
                    <Text>قیمت</Text>
                    <div>
                        <img src={Rial} className='mt-5 mr-2 absolute font-sans text-xs'/>
                        <Input
                        inputMode='numeric'
                        value={priceEditProduct?.toLocaleString('fa-IR')}
                        placeholder='۳۰۰۰۰'
                        onChange={(e) => {
                            handleChange(e);
                            if (errors?.priceEditProduct) { const { priceEditProduct, ...rest } = errors; setErrors(rest); }
                        }}
                        className={`w-full mt-2 text-left bg-transparent border ${errors?.priceEditProduct ? "border-red-500" : "border-gray-300"}`}
                        />
                    </div>
                    {errors.priceEditProduct && <p className="text-red-500 text-xs mt-1">{errors?.priceEditProduct}</p>}
                </div>

                <div className='mt-4 grid grid-cols-2 gap-2'>
                    {/* دسته‌بندی + خطا (با FormControl) */}
                    <div>
                    <Text className='text-right mb-2'>دسته بندی</Text>
                    <FormControl className='w-full' error={Boolean(errors.selectorCategory)}>
                        <Select
                        className='!outline-none !rounded-lg text-right w-full'
                        value={selectorCategory}
                        onChange={(e) => {
                            setSelectorCategory(e.target.value);
                            if (errors.selectorCategory) { const { selectorCategory, ...rest } = errors; setErrors(rest); }
                        }}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        sx={{ '& .MuiSelect-select': { padding: '11.5px 14px' } }}
                        >
                        <MenuItem value="" className='!py-3'>
                            <Text className='text-gray-400'>
                             انتخاب کنید
                            </Text>
                        </MenuItem>
                        {dataCategory?.data?.map((item) => (
                            <MenuItem key={item.id} value={String(item.id)}>
                                <Text>{item.name}</Text>
                            </MenuItem>
                        ))}
                        </Select>
                        {errors.selectorCategory && <Text>{errors.selectorCategory}</Text>}
                    </FormControl>
                    </div>

                    {/* تخفیف (اختیاری) */}
                    <div>
                    <Text className='text-right'>تخفیف</Text>
                    <Input
                        inputMode='numeric'
                        value={offerEdit}
                        onChange={(e) => setOfferEdit(e.target.value)}
                        className='w-full mt-2 h-[47px] text-left bg-transparent border border-gray-300'
                        placeholder='درصد تخفیف'
                    />
                    </div>
                </div>

                {/* وضعیت محصول + خطا */}
                <Text className='mt-4 text-right mb-2'>وضعیت محصول</Text>
                <FormControl className='w-full mb-4' error={Boolean(errors.selectorState)}>
                    <Select
                    className='!outline-none text-right !rounded-lg w-full'
                    value={selectorState}
                    onChange={(e) => {
                        setSelectorState(e.target.value);
                        if (errors.selectorState) { const { selectorState, ...rest } = errors; setErrors(rest); }
                    }}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    >
                    <MenuItem value="">
                        <Text className='text-gray-400'>
                        {selectedItem?.exist === true ? 'فعال'
                            : selectedItem?.exist === false ? 'غیر فعال'
                            : 'وضعیت نامشخص'}
                        </Text>
                    </MenuItem>
                    {stateProduct?.map((item, index) => (
                        <MenuItem key={index} value={item.value}>
                        <Text>{item.label}</Text>
                        </MenuItem>
                    ))}
                    </Select>
                    {errors.selectorState && <Text>{errors.selectorState}</Text>}
                </FormControl>
            </GeneralModal>

        </div>
    )
}

export default TabListProducts
