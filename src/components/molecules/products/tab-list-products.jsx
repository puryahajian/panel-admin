import React, { useEffect, useState } from 'react'
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
import UseAddImagesProduct from '../../db/use-add-images-product'
import useDeleteImageProduct from '../../db/use-delete-image-product'


function TabListProducts() {
    const { mutate } = useDeleteProduct();
    const { data } = useGetAllProducts();
    const { mutate: mutateDeleteImage } = useDeleteImageProduct();
    const { data: dataCategory } = useGetProductCategory();
    const { mutate: mutatePatchProduct, isLoading } = usePatchProduct();
    const [selectIdProduct, setSelectIdProduct] = useState(null);
    const selectedItem = data?.find((it) => it?.id === selectIdProduct)
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState('');
    const [selectorCategory, setSelectorCategory] = useState(selectedItem?.category_name);   
    const [selectorState, setSelectorState] = useState('');  
    const [nameEditProduct, setNameEditProduct] = useState(selectedItem?.name)
    const [priceEditProduct, setPriceEditProduct] = useState(selectedItem?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    const [descriptionEdit, setDescriptionEdit] = useState(selectedItem?.details);
    const [offerEdit, setOfferEdit] = useState(selectedItem?.discount_percentage);
    
    const [idEdit, setIdEdit] = useState();
    const [inState, setInState] = useState(false);
    const [ selectedFile, setSelectedFile ] = useState('');
    const [ preview, setPreview ] = useState('');
    const [ stockNumber, setStockNumber ] = useState(selectedItem?.stock);

    const [ selectedImage1, setSelectedImage1 ] = useState('');
    const [ previewImage1, setPreviewImage1 ] = useState(selectedItem?.image1);

    const [ selectedImage2, setSelectedImage2 ] = useState('');
    const [ previewImage2, setPreviewImage2 ] = useState(selectedItem?.image2);

    const [ selectedImage3, setSelectedImage3 ] = useState('');
    const [ previewImage3, setPreviewImage3 ] = useState(selectedItem?.image3);

    const [ selectedImage4, setSelectedImage4 ] = useState('');
    const [ previewImage4, setPreviewImage4 ] = useState('');

    const [ selectedImage5, setSelectedImage5 ] = useState('');
    const [ previewImage5, setPreviewImage5 ] = useState('');
    const [ productTol, setProductTol ] = useState(selectedItem?.tole);
    const [ productArz, setProductArz ] = useState(selectedItem?.arze);
    const [ productErtefa, setProductErtefa ] = useState(selectedItem?.ertefahe);


    const [unitWeigth, setUnitWeigth] = useState(selectedItem?.unit_weight);
    const [ wholPrice, setWholPrice ] = useState(selectedItem?.wholesale_price);
    const [isCheckedAmazon, setIsCheckedAmazon] = useState(false);
    const [isCheckedSoqMaftoh, setIsCheckedSoqMaftoh] = useState(false);
    const [isCheckedNon, setIsCheckedNon] = useState(false);

    useEffect(() => {
    if (selectedItem) {
        setIsCheckedAmazon(selectedItem.amazon ?? false);
        setIsCheckedNon(selectedItem.non ?? false);
        setIsCheckedSoqMaftoh(selectedItem.soghol_maftoh ?? false);
    } else {
        setIsCheckedAmazon(false);
        setIsCheckedNon(false);
        setIsCheckedSoqMaftoh(false);
    }
    }, [selectedItem]);


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
    
    const stateProduct = [
        { label: 'فعال', value: 'true' },
        { label: 'غیرفعال', value: 'false' }
    ]

    useEffect(() => {
        if (selectedItem?.category_name && dataCategory) {
        const matchingCategory = dataCategory.find((item) => item?.name === selectedItem?.category_name);
        if (matchingCategory) {
        setSelectorCategory(matchingCategory.id);
        } else {
        setSelectorCategory('');
        }
    } else {
        setSelectorCategory('');
    }
    }, [selectedItem?.category_name, dataCategory]);

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

    
    
    const handleEditProduct = (idEdit, currentExist, newImage1, newImage2, newImage3 ,newImage4, newImage5) => {
        const newValue = !currentExist;
        setInState(newValue);

        mutatePatchProduct(
            { 
                idEdit, 
                stockNumber,
                selectorCategory, 
                selectorState, 
                nameEditProduct, 
                priceEditProduct, 
                selectedFile, 
                inState: newValue, 
                newImage1, 
                newImage2,
                newImage3,
                newImage4,
                newImage5,
                productTol,
                productArz,
                productErtefa,
                wholPrice,
                isCheckedAmazon,
                isCheckedSoqMaftoh,
                isCheckedNon
            },    
        );

    }

    const handleDeleteImage = (idImage) => {
        mutateDeleteImage(
            { 
                idImage
            },    
        );

    }

    const formatNumber = (value) => {
        const numericValue = value.replace(/,/g, ''); // حذف ویرگول‌های قبلی
        return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // افزودن ویرگول سه‌رقمی
    };

    const handleChange = (e) => {
        const rawValue = e.target.value.replace(/,/g, ''); // فقط عدد خام
        if (!/^\d*$/.test(rawValue)) return; // فقط اعداد مجاز باشن
        setPriceEditProduct(formatNumber(rawValue));
    };

    const handleChangeWhol = (e) => {
        const wholValue = e.target.value.replace(/,/g, ''); // فقط عدد خام
        if (!/^\d*$/.test(wholValue)) return; // فقط اعداد مجاز باشن
        setWholPrice(formatNumber(wholValue));
    };


    return (
        <div>
            <div className='flex items-center max-[992px]:hidden'>
                <Text>ردیف</Text>
                <div className='grid grid-cols-7 items-center w-full py-4'>
                    <Text className={`col-span-2 pr-10`}>محصول</Text>
                    <Text className={`col-span-1 pr-5`}>تعداد</Text>
                    <Text className={`pr-4`}>تاریخ </Text>
                </div>
            </div>

            <div className='grid gap-2'>
                {data?.map((item, index) => {
                    return(
                        <div className='flex items-center border border-grayTitle rounded-2xl max-[992px]:hidden' key={item?.id}>
                            <div className='px-8'>{index + 1}</div>
                            <div className='grid grid-cols-7 items-center p-4 pr-0 w-full'>
                                <div className=' col-span-2 flex items-center gap-6'>
                                    <img src={`https://bahateam.ir${item?.image}`} className={`w-16 h-16 rounded-lg`} alt="" />

                                    <div className='grid gap-2'>
                                        <Text>{item?.name}</Text>
                                        <Text>{item?.price?.toLocaleString('fa-IR')} تومان</Text>
                                    </div>
                                </div>
                                <Text>{item?.stock}</Text>
                                <Text>{<DateShamsi date={item?.create_date}/>}</Text>
                                <div className=' col-span-2 flex justify-end gap-4'>
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
                                </div>
                                <div className=' text-center'>
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
                        </div>
                    )
                })}
            </div>

            {/* size tablet & mobile */}
            <div className='gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] hidden max-[992px]:grid max-[990px]:mb-14'>
                {data?.map((item, index) => {
                    // const category = dataCategory?.find((c) => c?.id === item?.category)
                    return(
                        <div className='border border-grayTitle rounded-2xl p-4' key={item?.id}>
                            <div className='flex gap-4'>
                                <img src={`https://bahateam.ir${item?.image}`} className={`min-w-16 h-16 rounded-lg`} alt="" />
                                <div className='w-full grid gap-1'>
                                    <div className='flex justify-between items-center'>
                                        <Title>تعداد :</Title>
                                        <Text>{item?.stock}</Text>
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
                    )
                })}
            </div>

            <div className='flex justify-center mt-4'>
                {data?.count === 0 && <Text>محصول موجود نیست</Text>}
            </div>

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
                    e.preventDefault()
                    setOpenEdit(false)
                }}
                actionText={isLoading ? <Loading/> : 'ذخیره'}
                actionHandler={(e) => { 
                    e.preventDefault()
                    handleEditProduct(idEdit?.id)
                    setOpenEdit(false); 
                }}
                onClose={(e) => {
                    e.preventDefault()
                    setOpenEdit(false)}
                }
                sx={{
                    width: '800px', 
                    '@media (max-width: 840px)': {
                        width: '92%',
                    },
                }}
            >
                <div className='grid grid-cols-2 max-[640px]:grid-cols-1 gap-4'>
                    <div>
                        <div className='h-max max-[840px]:hidden'>
                            <Uploader
                                textOne={`عکس محصول را انتخاب کنید`}
                                selectedFile={selectedFile}
                                onFileSelect={setSelectedFile}
                                preview={`https://bahateam.ir${selectedItem?.image || preview}`}
                                setPreview={setPreview}
                                clssBtnDelete={`hidden`}
                                className={`h-[200px] min-h-9 max-h-[200px]`}
                            />
                        </div>
                        
                        <div className=' grid-cols-3 mt-4 gap-4 grid max-[840px]:hidden'>
                            <Uploader
                                handleDeleteImage={() => handleDeleteImage()}
                                selectedFile={selectedImage1}
                                onFileSelect={(file) => {
                                    setSelectedImage1(file); 
                                    if (file && idEdit?.id) {
                                        handleEditProduct(idEdit.id, inState, file, selectedImage1); 
                                    }
                                }} 
                                preview={`https://bahateam.ir${selectedItem?.image1}`}
                                setPreview={setPreviewImage1}
                                className="h-[80px] max-[840px]:h-[80px] max-[840px]:min-h-20 min-h-9 max-h-[80px]"
                            />
                            <Uploader
                                handleDeleteImage={() => handleDeleteImage()}
                                selectedFile={selectedImage2}
                                onFileSelect={(file) => {
                                    setSelectedImage2(file); 
                                    if (file && idEdit?.id) {
                                        handleEditProduct(idEdit.id, inState, selectedImage2, file); 
                                    }
                                }}    
                                preview={`https://bahateam.ir${selectedItem?.image2}`}
                                setPreview={setPreviewImage2}
                                className="h-[80px] max-[840px]:h-[80px] max-[840px]:min-h-20 min-h-9 max-h-[80px]"
                            />
                            <Uploader
                                handleDeleteImage={() => handleDeleteImage()}
                                selectedFile={selectedImage3}
                                onFileSelect={(file) => {
                                    setSelectedImage3(file); 
                                    if (file && idEdit?.id) {
                                        handleEditProduct(idEdit.id, inState, selectedImage3, file);
                                    }
                                }}   
                                preview={`https://bahateam.ir${selectedItem?.image3}`}
                                setPreview={setPreviewImage3}
                                className="h-[80px] max-[840px]:h-[80px] max-[840px]:min-h-20 min-h-9 max-h-[80px]"
                            />
                        </div>

                        <form className='mt-4 max-[640px]:!mt-0'>
                            <div className='text-right mt-2 max-[640px]:hidden'>
                                <Text>اجازه فروش در :</Text>
                                
                                <div className='grid grid-cols-3'>
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
                    <div className='max-[640px]:h-[500px] max-[640px]:overflow-y-auto max-[640px]:overflow-x-hidden'>
                        
                        <div className='grid grid-cols-2 text-right gap-2'>
                            <div>
                                <Text>نام محصول</Text>
                                <Input defaultValue={selectedItem?.name} value={nameEditProduct} onChange={(e) => setNameEditProduct(e.target.value)} className={`w-full mt-2 bg-transparent border border-gray-300`}/>
                            </div>
                            <div>
                                <Text>قیمت تکی</Text>
                                <div className=' relative'>
                                    <p className='mt-[22px] mr-2 absolute font-sans text-xs'>تومان</p>    
                                    <Input inputMode={`numbric`} defaultValue={selectedItem?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} value={priceEditProduct} placeholder={`۳۰۰۰۰`} onChange={handleChange} className={`w-full mt-2 text-left bg-transparent border border-gray-300`}/>
                                </div>
                            </div>
                        </div>

                        <div className='grid grid-cols-2 text-right mt-6 gap-2'>
                            <div>
                                <Text>قیمت عمده</Text>
                                <div className=' relative'>
                                    <p className='mt-[22px] mr-2 absolute font-sans text-xs'>تومان</p>    
                                    <Input inputMode={`numbric`} defaultValue={selectedItem?.wholesale_price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} value={wholPrice} placeholder={`۳۰۰۰۰`} onChange={handleChangeWhol} className={`w-full mt-2 text-left bg-transparent border border-gray-300`}/>
                                </div>
                            </div>
                            <div>
                                <Text>تعداد موجود</Text>
                                <div>
                                    <Input inputMode={`numbric`} defaultValue={selectedItem?.stock} value={stockNumber} onChange={(e) => setStockNumber(e.target.value)} className={`w-full mt-2 text-left bg-transparent border border-gray-300`}/>
                                </div>
                            </div>
                        </div>

                        {/* <div className='mt-4 grid grid-cols-1 gap-2'>
                            <div>
                                <Text className={`text-right mb-2`}>دسته بندی</Text>
                                <Select
                                    className='!outline-none !text-gray-400 !rounded-lg text-right w-full'
                                    value={selectorCategory}
                                    onChange={(e) => setSelectorCategory(e.target.value)}
                                    displayEmpty
                                    defaultValue={selectedItem?.category_name}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    renderValue={(selected) => {
                                        if (!selected) {
                                        return <Text className="text-gray-400">{selectedItem?.category_name || 'دسته‌بندی را انتخاب کنید'}</Text>;
                                        }
                                        const selectedCategory = dataCategory?.find((item) => item?.id === selected);
                                        return <Text>{selectedCategory?.name || selectedItem?.category_name || 'دسته‌بندی را انتخاب کنید'}</Text>;
                                    }}
                                    >
                                        <MenuItem disabled value="" className=' !py-3'>
                                            <Text className={`text-gray-400`}>
                                               {selectedItem?.category_name}
                                            </Text>
                                        </MenuItem>
                                        {dataCategory?.map((item) => (
                                            <MenuItem key={item?.id} value={item?.id}>
                                                <Text>
                                                    {item?.name}
                                                </Text>    
                                            </MenuItem>
                                        ))}
                                </Select>
                            </div>
                        </div> */}

                        <div className='grid grid-cols-2 text-right mt-6 gap-2'>
                            <div>
                                <Text className={`text-right`}>تخفیف</Text>
                                <div className='relative'>
                                    <p className='mt-[22px] mr-3 absolute font-sans text-sm'>٪</p>    
                                    <Input inputMode={`numbric`} defaultValue={selectedItem?.discount_percentage} value={offerEdit} onChange={(e) => setOfferEdit(e.target.value)} className={`w-full mt-2 h-[47px] text-left bg-transparent border border-gray-300`}/>
                                </div>
                            </div>
                            {/* <div>
                                <Text className={`text-right mb-2`}>وضعیت محصول</Text>
                                <Select
                                    className='!outline-none bg-bgInput !text-gray-400 text-right !rounded-lg w-full mb-4'
                                    value={selectorState || selectedItem?.exist}
                                    onChange={(e) => setSelectorState(e.target.value)}
                                    displayEmpty
                                    defaultValue={selectedItem?.exist}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value="">
                                            <Text className={`text-gray-400`}>
                                                {selectedItem?.exist === true
                                                    ? 'فعال'
                                                    : selectedItem?.exist === false
                                                    ? 'غیر فعال'
                                                    : 'وضعیت نامشخص'
                                                }
                                            </Text>
                                        </MenuItem>
                                        {stateProduct?.map((item, index) => (
                                            <MenuItem key={index} value={item.value}>
                                                <Text>{item.label}</Text>
                                            </MenuItem>
                                        ))}
                                </Select>
                            </div> */}
                            <div>
                                <Text>وزن واحد</Text>
                                <div className='relative'>
                                    <p className='mt-[22px] mr-3 absolute font-sans text-xs'>gr</p>    
                                    <Input inputMode={`numbric`} defaultValue={selectedItem?.unit_weight} value={unitWeigth} placeholder={`۳۰۰۰۰`} onChange={(e) => setUnitWeigth(e.target.value)} className={`w-full mt-2 text-left bg-transparent border border-gray-300`}/>
                                </div>
                            </div>
                        </div>

                        <Text className={`text-right mt-6`}>ابعاد محصول cm</Text>
                        <div className='grid grid-cols-3 text-right mt-2 gap-2'>
                            <div className='relative'>
                                <p className='!mt-[15px] mr-2 absolute font-sans text-xs'>طول</p>    
                                <Input inputMode={`numbric`} defaultValue={selectedItem?.tole} value={productTol} placeholder={`20`} onChange={(e) => setProductTol(e.target.value)} className={`w-full text-left bg-transparent border border-gray-300`}/>
                            </div>
                            <div className='relative'>
                                <p className='!mt-[15px] mr-2 absolute font-sans text-xs'>عرض</p>    
                                <Input inputMode={`numbric`} defaultValue={selectedItem?.arze} value={productArz} placeholder={`20`} onChange={(e) => setProductArz(e.target.value)} className={`w-full text-left bg-transparent border border-gray-300`}/>
                            </div>
                            <div className='relative'>
                                <p className='!mt-[15px] mr-2 absolute font-sans text-xs'>ارتفاع</p>    
                                <Input inputMode={`numbric`} defaultValue={selectedItem?.ertefahe} value={productErtefa} placeholder={`20`} onChange={(e) => setProductErtefa(e.target.value)} className={`w-full text-left bg-transparent border border-gray-300`}/>
                            </div>
                        </div>


                        <div className='hidden max-[840px]:block max-[840px]:mt-6'>
                            <Uploader
                                textOne={`عکس محصول را انتخاب کنید`}
                                selectedFile={selectedFile}
                                onFileSelect={setSelectedFile}
                                preview={`https://bahateam.ir${selectedItem?.image || preview}`}
                                setPreview={setPreview}
                                clssBtnDelete={`hidden`}
                                className={`h-[278px] min-h-9 max-h-[278px]`}
                            />
                        </div>

                        <div className=' grid-cols-3 mt-4 gap-4 hidden max-[840px]:grid'>
                            <Uploader
                                handleDeleteImage={() => handleDeleteImage()}
                                selectedFile={selectedImage1}
                                onFileSelect={(file) => {
                                    setSelectedImage1(file); 
                                    if (file && idEdit?.id) {
                                        handleEditProduct(idEdit.id, inState, file, selectedImage1); 
                                    }
                                }} 
                                preview={`https://bahateam.ir${selectedItem?.image1}`}
                                setPreview={setPreviewImage1}
                                className="h-[80px] max-[840px]:h-[80px] max-[840px]:min-h-20 min-h-9 max-h-[80px]"
                            />
                            <Uploader
                                handleDeleteImage={() => handleDeleteImage()}
                                selectedFile={selectedImage2}
                                onFileSelect={(file) => {
                                    setSelectedImage2(file); 
                                    if (file && idEdit?.id) {
                                        handleEditProduct(idEdit.id, inState, selectedImage2, file); 
                                    }
                                }}    
                                preview={`https://bahateam.ir${selectedItem?.image2}`}
                                setPreview={setPreviewImage2}
                                className="h-[80px] max-[840px]:h-[80px] max-[840px]:min-h-20 min-h-9 max-h-[80px]"
                            />
                            <Uploader
                                handleDeleteImage={() => handleDeleteImage()}
                                selectedFile={selectedImage3}
                                onFileSelect={(file) => {
                                    setSelectedImage3(file); 
                                    if (file && idEdit?.id) {
                                        handleEditProduct(idEdit.id, inState, selectedImage3, file);
                                    }
                                }}   
                                preview={`https://bahateam.ir${selectedItem?.image3}`}
                                setPreview={setPreviewImage3}
                                className="h-[80px] max-[840px]:h-[80px] max-[840px]:min-h-20 min-h-9 max-h-[80px]"
                            />
                        </div>

                        <textarea defaultValue={selectedItem?.details} value={descriptionEdit} onChange={(e) => setDescriptionEdit(e.target.value)} className='border bg-bgInput max-[840px]:h-[130px] rounded-xl hidden max-[640px]:block p-2 my-4 w-full font-sans resize-none text-xs outline-none placeholder:text-gray-400' placeholder='توضیحات'/>

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

                <textarea defaultValue={selectedItem?.details} value={descriptionEdit} onChange={(e) => setDescriptionEdit(e.target.value)} className='border bg-bgInput h-[130px] rounded-xl max-[640px]:hidden p-2 mt-4 w-full font-sans resize-none text-xs outline-none placeholder:text-gray-400' placeholder='توضیحات'/>

            </GeneralModal>
        </div>
    )
}

export default TabListProducts
