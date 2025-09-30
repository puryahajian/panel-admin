import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react'
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
import useGetParentCategory from '../../db/use-get-parent-category'
import useGetCategory from '../../db/use-get-category'


function TabListProducts() {
    const { mutate } = useDeleteProduct();
    const { data, isLoading:isLoadingProduct } = useGetAllProducts();
    const prosuctList = Array.isArray(data) 
    ? data 
    : Array.isArray(data) 
        ? data 
        : Array.isArray(data?.data)
        ? data.data 
        : [];
        console.log(prosuctList)
    const { data: dataCategory } = useGetProductCategory();
    const { mutate: mutatePatchProduct, isLoading } = usePatchProduct();

    const [selectIdProduct, setSelectIdProduct] = useState(null);
    const selectedItem = Array.isArray(data?.data)
        ? data?.data?.find((it) => it?.id === selectIdProduct)
        : null;

    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState('');
    const [selectorCategory, setSelectorCategory] = useState(selectedItem?.category);   
    const [selectorState, setSelectorState] = useState('');  
    const [getParentId, setGetParentId] = useState(''); 
    const [nameEditProduct, setNameEditProduct] = useState(selectedItem?.name)
    const [priceEditProduct, setPriceEditProduct] = useState(selectedItem?.price);
    const [descriptionEdit, setDescriptionEdit] = useState(selectedItem?.details);
    const [offerEdit, setOfferEdit] = useState(selectedItem?.discount_percentage);
    const [selectedParentId, setSelectedParentId] = useState('')
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('')
    const [subCategories, setSubCategories] = useState([])
    const { data: parentCategories } = useGetCategory();
    const { data: subCategoriesData } = useGetParentCategory(selectedParentId)
    const [omNameProduct, setOmNameProduct] = useState();
    const [sku, setSku] = useState(selectedItem?.sku);
    const [idEdit, setIdEdit] = useState();
    const [inState, setInState] = useState(false);
    const [selectedFile, setSelectedFile] = useState('');
    const [preview, setPreview] = useState('');
    const [errors, setErrors] = useState({});

    // Lazy loading state
    const [displayCount, setDisplayCount] = useState(20);
    const [isLoadinglist, setIsLoading] = useState(false);
    

    useEffect(() => {
        if (selectedItem) {
            setNameEditProduct(selectedItem?.name || '');
            setPriceEditProduct(selectedItem?.price || '');
            setOmNameProduct(selectedItem?.om_name || '');
            setDescriptionEdit(selectedItem?.details || '');
            setOfferEdit(selectedItem?.discount_percentage || '');
            setSku(selectedItem?.sku || '');
            setSelectorCategory(selectedItem?.category || ''); 
            setSelectorState(selectedItem?.exist !== undefined ? String(selectedItem?.exist) : '');
            setPreview(selectedItem?.image || null);
        }
    }, [selectedItem]);

    useEffect(() => {
        if (getParentId) setSelectedParentId(getParentId);
    }, [getParentId]);

    useEffect(() => {
        if (subCategoriesData?.results) setSubCategories(subCategoriesData.results);
        else setSubCategories([]);
    }, [subCategoriesData]);

    useEffect(() => {
        if (selectedSubCategoryId) setSelectorCategory(selectedSubCategoryId);
        else if (selectedParentId) setSelectorCategory(selectedParentId);
        else setSelectorCategory('');
    }, [selectedParentId, selectedSubCategoryId]);

    const mainCategoriesOrder = useMemo(
        () => parentCategories?.filter(item => item?.order !== 0) || [],
        [parentCategories]
    );
    console.log(mainCategoriesOrder)

    const stateProduct = [
        { label: 'فعال', value: 'true' },
        { label: 'غیرفعال', value: 'false' }
    ];

    const handleDeleteProduct = () => {
        mutate({ selectedItemId }, { onSuccess: () => setOpen(false) });
    };

    const handleEditProduct = (idEdit, currentExist) => {
        const newValue = !currentExist;
        setInState(newValue);

        mutatePatchProduct({ 
            idEdit, selectedSubCategoryId, selectorState, nameEditProduct, priceEditProduct, selectedFile, inState: newValue, omNameProduct, sku
        });
    };

    const formatNumber = (value) => {
        const numericValue = value.replace(/,/g, '');
        return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const handleChange = (e) => {
        const rawValue = e.target.value.replace(/,/g, '');
        if (!/^\d*$/.test(rawValue)) return;
        setPriceEditProduct(formatNumber(rawValue));
    };

    const validateFormEdit = () => {
        let newErrors = {};
        if (!selectedFile && !selectedItem?.image) newErrors.image = "تصویر محصول الزامی است";
        if (!sku) newErrors.sku = "کد محصول الزامی";
        if (!nameEditProduct) newErrors.nameEditProduct = "نام محصول الزامی است";
        if (!priceEditProduct) newErrors.priceEditProduct = "قیمت الزامی است";
        if (!selectorCategory) newErrors.selectorCategory = "انتخاب دسته‌بندی الزامی است";
        if (!descriptionEdit) newErrors.descriptionEdit = "توضیحات الزامی است";
        if (!selectorState) newErrors.selectorState = "انتخاب وضعیت الزامی است";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

       const loadMore = () => {
            if (isLoading) return;
            setIsLoading(true);
            setTimeout(() => {
                setDisplayCount((prev) => prev + 10);
                setIsLoading(false);
            }, 400);
        };
    
        // Intersection observer for infinite scroll
        const observer = useRef();
        const sentinelRef = useCallback(node => {
            if (isLoadinglist) return
            if (observer.current) observer.current.disconnect()

            observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && displayCount < prosuctList.length) {
                loadMore()
            }
            })

            if (node) observer.current.observe(node)
        }, [isLoadinglist, displayCount, prosuctList.length])

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

            <div className='grid gap-4'>
            {prosuctList.slice(0, displayCount).map((item, index) => {
                    return (
                        <div 
                            className='flex items-center border border-grayTitle rounded-2xl max-[992px]:hidden' 
                            key={item?.id}
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
                                        <Text className={`flex items-center`}>
                                            {item?.price?.toLocaleString('fa-IR')} 
                                            <img src={Rial} alt="ریال" loading="lazy" />
                                        </Text>
                                    </div>
                                </div>

                                <Text>{item?.category_name ? item?.category_name : 'ندارد'}</Text>

                                <div className='flex items-center justify-between gap-2'>
                                    <Text 
                                        className={`truncate text-left w-28 cursor-pointer rounded mr-7`} 
                                        onClick={() => {
                                            navigator.clipboard.writeText(item?.sku);
                                            toast.success('کپی شد');
                                        }}
                                        title="کلیک برای کپی کردن"
                                    >
                                        {item?.sku || "ندارد"}
                                    </Text>
                                    <Tooltip title="کپی کد محصول" placement="top">
                                        <ContentCopyIcon 
                                            onClick={() => {
                                                navigator.clipboard.writeText(item?.sku);
                                                toast.success('کپی شد');
                                            }} 
                                            className='!text-sm cursor-pointer'
                                        />
                                    </Tooltip>
                                </div>

                                <Text className={`mr-7`}><DateShamsi date={item?.create_date} /></Text>

                                <div className='col-span-2 flex justify-end gap-4'>
                                    <ButtonExisting
                                        onClick={() => handleEditProduct(item.id, item.exist)}
                                        className={`${item?.exist ? '' : 'bg-red-500 border-transparent'}`}
                                    >
                                        {item?.exist ? 'فعال' : 'غیر فعال'}
                                    </ButtonExisting>

                                    <ButtonEdit onClick={() => {
                                        setIdEdit(item);
                                        setOpenEdit(true);
                                        setSelectIdProduct(item?.id);

                                        const category = dataCategory?.data?.find(cat => cat.id === item?.category);
                                        if (category) {
                                            const parentId = category?.parent;
                                            setGetParentId(parentId);

                                            const mainCat = mainCategoriesOrder?.find(cat => cat.id === parentId);
                                            if (mainCat) setSelectedParentId(mainCat.id);

                                            setSelectedSubCategoryId(category.id);
                                        }
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
                    );
                })}
            </div>

            <div ref={sentinelRef} style={{ height: 1 }}></div>

            {isLoadinglist && (
                <div className='flex justify-center py-4 max-[992px]:hidden'>
                    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></div>
                </div>
            )}

            {/* size tablet & mobile */}
            <div className='gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] hidden max-[992px]:grid max-[990px]:mb-14'>
                {prosuctList.slice(0, displayCount).map((item, index) => {
                    return (
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
                                        <Text>{item?.category_name ? item?.category_name : 'ندارد'}</Text>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <Title>کد محصول :</Title>
                                        <Text>{item?.sku === null ? "ندارد" : item?.sku} {item?.sku === "" && "ندارد"}</Text>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <Title>محصول :</Title>
                                        <Text className={`truncate w-max max-w-[150px]`}>{item?.name}</Text>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <Title>قیمت :</Title>
                                        <Text className={`flex items-center`}>
                                            {item?.price?.toLocaleString('fa-IR')} 
                                            <img src={Rial}/>
                                        </Text>
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
                                        const category = dataCategory?.data?.find(cat => cat.id === item?.category);
                                        if (category) {
                                            const parentId = category?.parent;
                                            setGetParentId(parentId);

                                            const mainCat = mainCategoriesOrder?.find(cat => cat.id === parentId);
                                            if (mainCat) setSelectedParentId(mainCat.id);

                                            setSelectedSubCategoryId(category.id);
                                        }
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
                    );
                })}

                {data?.count === 0 && (
                    <div className='flex justify-center mt-4'>
                        <Text>محصول موجود نیست</Text>
                    </div>
                )}

            </div>

            <div ref={sentinelRef} style={{ height: 1 }}></div>

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


            {/* ویرایش محصول */}
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
                    setSelectedParentId('')
                }}
                sx={{
                    width: 'max-content', 
                    '@media (max-width: 600px)': { width: '92%' },
                }}
                >
                <div className='grid grid-cols-2 gap-4 max-[480px]:grid-cols-1 max-[480px]:h-[600px] max-[480px]:overflow-y-auto'>
                    <div className='grid grid-cols-1 gap-4'>
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
                                className={`h-[209px] min-h-9 max-h-full ${errors.image ? "border border-red-500" : ""}`}
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
                                className={`border rounded-xl p-2 font-sans resize-none text-xs outline-none placeholder:text-gray-400 w-full h-[209px] ${errors?.descriptionEdit ? "border-red-500" : "border-gray-300"}`}
                                placeholder='توضیحات'
                            />
                            {errors?.descriptionEdit && <p className="text-red-500 text-xs mt-1">{errors?.descriptionEdit}</p>}
                        </div>
                    </div>

                    <div>
                        <div className='grid grid-cols-2 text-right gap-2 max-[480px]:grid-cols-1'>
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
                        <div className='grid grid-cols-2 mt-4 gap-2 text-right max-[480px]:grid-cols-1'>
                            <div>
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
                            <div className='text-right'>
                                <Text className={`mb-2`}>کد محصول</Text>
                                <Input
                                    value={sku}
                                    onChange={(e) => {
                                        setSku(e.target.value);
                                    }}
                                    className={`w-full bg-transparent border ${errors.sku ? "border border-red-500" : "border-gray-300"}`}
                                    placeholder={`کد محصول را وارد کنید`}
                                />
                            </div>
                        </div>

                        <div className='mt-4 gap-2'>
                            {/* دسته‌بندی + خطا (با FormControl) */}
                           
                            <Text className='text-right'>تخفیف</Text>
                            <Input
                                inputMode='numeric'
                                value={offerEdit}
                                onChange={(e) => setOfferEdit(e.target.value)}
                                className='w-full mt-2 h-[47px] text-left bg-transparent border border-gray-300'
                                placeholder='درصد تخفیف'
                            />
                        </div>

                        <div className='mt-4'>
                            <Text className='text-right mb-2'> دسته بندی اصلی</Text>
                            <FormControl className='w-full' error={Boolean(errors.selectorCategory)}>
                                <Select
                                    className='!outline-none !rounded-lg text-right w-full'
                                    value={selectedParentId}
                                    onChange={(e) => {
                                        setSelectedParentId(e.target.value)
                                        setSelectedSubCategoryId('')
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
                                    {mainCategoriesOrder.map(item => (
                                        <MenuItem className='!font-sans !text-[12px]' key={item.id} value={item.id}>
                                            <Text>{item.name}</Text>
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.selectorCategory && <Text>{errors.selectorCategory}</Text>}
                            </FormControl>
                        </div>

                        <div className='mt-4'>
                            <Text className='text-right mb-2'>زیر دسته بندی</Text>
                            <FormControl className='w-full' >
                                <Select
                                    className='!outline-none !rounded-lg text-right w-full'
                                    value={selectedSubCategoryId}
                                    onChange={(e) => setSelectedSubCategoryId(e.target.value)}
                                    // displayEmpty
                                    // inputProps={{ 'aria-label': 'Without label' }}
                                    sx={{ '& .MuiSelect-select': { padding: '11.5px 14px' } }}
                                    >
                                    <MenuItem value="" className='!py-3'>
                                        <Text className='text-gray-400'>
                                        انتخاب کنید
                                        </Text>
                                    </MenuItem>
                                    {parentCategories
                                        ?.filter(sub => sub.parent === selectedParentId) // فقط زیرمجموعه‌های parent انتخاب‌شده
                                        ?.map(sub => (
                                            <MenuItem key={sub.id} value={sub.id}>
                                                <Text>{sub.name}</Text>
                                            </MenuItem>
                                    ))}
                                </Select>
                                {errors.selectorCategory && <Text>{errors.selectorCategory}</Text>}
                            </FormControl>
                        </div>
                       

                        {/* وضعیت محصول + خطا */}
                        {/* <Text className='mt-4 text-right mb-2'>وضعیت محصول</Text>
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
                        </FormControl> */}
                    </div>

                </div>
            </GeneralModal>

            <div className='flex justify-center mt-6 items-center'>
                {isLoadingProduct ? <Loading/> : ''}
            </div>
        </div>
    )
}

export default TabListProducts
