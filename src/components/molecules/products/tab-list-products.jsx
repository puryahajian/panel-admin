import React, { useState } from 'react'
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


function TabListProducts() {
    const { mutate } = useDeleteProduct();
    const { data } = useGetAllProducts();
    console.log(data)
    const { data: dataCategory } = useGetProductCategory();
    const { mutate: mutatePatchProduct, isLoading } = usePatchProduct();
    const [selectIdProduct, setSelectIdProduct] = useState(null);
    const selectedItem = Array.isArray(data?.data)
        ? data?.data?.find((it) => it?.id === selectIdProduct)
        : null;
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState('');
    const [selectorCategory, setSelectorCategory] = useState('');   
    const [selectorState, setSelectorState] = useState('');  
    const [nameEditProduct, setNameEditProduct] = useState(selectedItem?.name)
    const [priceEditProduct, setPriceEditProduct] = useState(selectedItem?.price);
    const [descriptionEdit, setDescriptionEdit] = useState(selectedItem?.details);
    const [offerEdit, setOfferEdit] = useState(selectedItem?.discount_percentage);
    
    const [idEdit, setIdEdit] = useState();
    const [inState, setInState] = useState(false);
    const [ selectedFile, setSelectedFile ] = useState('');
    const [preview, setPreview] = useState('');
    
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
                idEdit, selectorCategory, selectorState, nameEditProduct, priceEditProduct, selectedFile, inState: newValue
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

    return (
        <div className='mt-16 max-[1024px]:mt-[96px]'>
            <div className='flex items-center max-[992px]:hidden'>
                <Text>ردیف</Text>
                <div className='grid grid-cols-7 items-center w-full py-4'>
                    <Text className={`col-span-2 pr-10`}>محصول</Text>
                    <Text className={` col-span-1 pr-5`}>دسته بندی</Text>
                    <Text className={`pr-4`}>تاریخ </Text>
                </div>
            </div>

            <div className='grid gap-2'>
                {Array.isArray(data?.data) && data.data.length > 0 ? (
                    data.data.map((item, index) => (
                        <div className='flex items-center border border-grayTitle rounded-2xl max-[992px]:hidden' key={item?.id}>
                        <div className='px-8'>{index + 1}</div>
                        <div className='grid grid-cols-7 items-center p-4 pr-0 w-full'>
                            <div className='col-span-2 flex items-center gap-6'>
                            <img src={item?.image} className='w-16 h-16 rounded-lg' alt='' />
                            <div className='grid gap-2'>
                                <Text>{item?.name}</Text>
                                <Text>{item?.price?.toLocaleString('fa-IR')} تومان</Text>
                            </div>
                            </div>

                            <Text>{item?.category_name}</Text>
                            <Text><DateShamsi date={item?.create_date} /></Text>

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
                    <div className='flex justify-center mt-4'>
                        <Text>محصول موجود نیست</Text>
                    </div>
                )}
               
            </div>

            {/* size tablet & mobile */}
            <div className='gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] hidden max-[992px]:grid max-[990px]:mb-14'>
                {Array.isArray(data?.data) && data.data.length > 0 ? (
                    data.data.map((item, index) => (
                        <div className='border border-grayTitle rounded-2xl p-4' key={item?.id}>
                            <div className='flex gap-4'>
                                <img src={item?.image} className={`min-w-16 h-16 rounded-lg`} alt="" />
                                <div className='w-full grid gap-1'>
                                    <div className='flex justify-between items-center'>
                                        <Title>دسته بندی :</Title>
                                        <Text>{item?.category_name}</Text>
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
                    width: '500px', 
                    '@media (max-width: 600px)': {
                        width: '92%',
                    },
                }}
            >
                <div className='grid grid-cols-2 max-[550px]:grid-cols-1 gap-4'>
                    <Uploader
                        textOne={`عکس محصول را انتخاب کنید`}
                        selectedFile={selectedFile}
                        onFileSelect={setSelectedFile}
                        preview={selectedItem?.image || preview}
                        setPreview={setPreview}
                        className={`h-[155px] min-h-9 max-h-[155px]`}
                    />
                    <textarea defaultValue={selectedItem?.details} value={descriptionEdit} onChange={(e) => setDescriptionEdit(e.target.value)} className='border rounded-xl p-2 font-sans resize-none text-xs outline-none placeholder:text-gray-400' placeholder='توضیحات'/>
                </div>
                <div className='grid grid-cols-2 text-right mt-4 gap-2'>
                    <div>
                        <Text>نام محصول</Text>
                        <Input defaultValue={selectedItem?.name} value={nameEditProduct} onChange={(e) => setNameEditProduct(e.target.value)} className={`w-full mt-2 bg-transparent border border-gray-300`}/>
                    </div>
                    <div>
                        <Text>قیمت</Text>
                        <div>
                            <p className='mt-5 mr-2 absolute font-sans text-xs'>تومان</p>    
                            <Input inputMode={`numeric`} defaultValue={selectedItem?.price} value={priceEditProduct} placeholder={`۳۰۰۰۰`} onChange={handleChange} className={`w-full mt-2 text-left bg-transparent border border-gray-300`}/>
                        </div>
                    </div>
                </div>

                <div className='mt-4 grid grid-cols-2 gap-2'>
                    <div>
                        <Text className={`text-right mb-2`}>دسته بندی</Text>
                        <Select
                            className='!outline-none !text-gray-400 !rounded-lg text-right w-full'
                            value={selectorCategory}
                            onChange={(e) => setSelectorCategory(e.target.value)}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            sx={{
                                '& .MuiSelect-select': {
                                padding: '11.5px 14px', // اعمال پدینگ به عنصر select داخلی
                                },
                            }}
                            >
                                <MenuItem value="" className=' !py-3'>
                                    <Text className={`text-gray-400`}>
                                        {dataCategory?.results?.find(c => c?.id === selectedItem?.category_id)?.name || 'انتخاب کنید'}
                                    </Text>
                                </MenuItem>
                                {dataCategory?.results?.map((item) => (
                                    <MenuItem key={item?.id} value={item?.id}>
                                        <Text>
                                            {item?.name}
                                        </Text>    
                                    </MenuItem>
                                ))}
                        </Select>
                    </div>
                    <div>
                        <Text className={`text-right`}>تخفیف</Text>
                        <Input type={`number`} defaultValue={selectedItem?.discount_percentage} value={offerEdit} onChange={(e) => setOfferEdit(e.target.value)} className={`w-full mt-2 h-[47px] text-left bg-transparent border border-gray-300`}/>
                    </div>

                </div>

                <Text className={`mt-4 text-right mb-2`}>وضعیت محصول</Text>
                <Select
                    className='!outline-none !text-gray-400 text-right !rounded-lg w-full mb-4'
                    value={selectorState}
                    onChange={(e) => setSelectorState(e.target.value)}
                    displayEmpty
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

            </GeneralModal>
        </div>
    )
}

export default TabListProducts
