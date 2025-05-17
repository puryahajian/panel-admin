import React, { useState } from 'react'
import Text from '../../atoms/text'
import ButtonExisting from '../../atoms/button-existing'
import ButtonEdit from '../../atoms/button-edit'
import GeneralModal from '../modal-general'
import UseGetAllProducts from '../../db/use-get-all-products'
import Img from '../../atoms/img'
import UseDeleteProduct from '../../db/use-delete-product'
import UseGetProductCategory from '../../db/use-get-product-category'
import UsePatchProduct from '../../db/use-patch-product'
import Input from '../../atoms/input'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toast } from 'react-toastify'


function TabListProducts() {
    const { mutate } = UseDeleteProduct();
    const { data } = UseGetAllProducts();
    const { data: dataCategory } = UseGetProductCategory();
    const { mutate: mutatePatchProduct } = UsePatchProduct();
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState('');
    const [selectorCategory, setSelectorCategory] = useState('');   
    const [selectorState, setSelectorState] = useState('');  
    const [nameEditProduct, setNameEditProduct] = useState('')
    const [priceEditProduct, setPriceEditProduct] = useState('')   
    const [idEdit, setIdEdit] = useState();

    
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

    const handleEditProduct = (idEdit) => {
        // console.log(selectorCategory, selectorState, nameEditProduct, priceEditProduct)
        mutatePatchProduct(
            { 
                idEdit, selectorCategory, selectorState, nameEditProduct, priceEditProduct
            }, 
            {
            onSuccess: (data) => {
                toast.success('محصول ویرایش شد')
            },
        });
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
        <div>
            <div className='grid grid-cols-8 py-4'>
                <Text>ردیف</Text>
                <Text className={`col-span-2 mr-3`}>محصول</Text>
                <Text>دسته بندی</Text>
                <Text>تاریخ و ساعت</Text>
            </div>

            <div className='grid gap-2'>
                {data?.results.map((item, index) => {
                    const category = dataCategory?.results.find((c) => c?.id === item?.category_id)
                    return(
                        <div className='grid grid-cols-8 items-center border border-grayTitle rounded-2xl p-4' key={item?.id}>
                            <div>{index + 1}</div>
                            <div className=' col-span-2 flex items-center gap-6'>
                                <Img src={item?.images?.map((img) => img?.image_url)}/>
                                <div className='grid gap-2'>
                                    <Text>{item?.name}</Text>
                                    <Text>{item?.price?.toLocaleString('fa-IR')} تومان</Text>
                                </div>
                            </div>
                            <Text>{category?.name}</Text>
                            <Text>{item?.create_date}</Text>
                            <div className=' col-span-2 flex justify-end gap-4'>
                                <ButtonExisting 
                                    className={`${item?.exist === true ? '' : 'bg-red-500 border-transparent'}`}
                                    >
                                        {item?.exist === true ? 'موجود' : 'ناموجود'}
                                </ButtonExisting>

                                <ButtonEdit onClick={() => {
                                    setIdEdit(item)
                                    setOpenEdit(true)
                                    }}>ویرایش</ButtonEdit>
                            </div>
                            <div className=' text-center'>
                                <button onClick={() => { 
                                    setOpen(true)
                                    setSelectedItemId(item?.id)
                                    }}>
                                    <Text className={`text-red-500`}>حذف</Text>
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
            />

            <GeneralModal
                open={openEdit}
                handleClose={(e) => {
                    e.preventDefault()
                    setOpenEdit(false)
                }}
                // title="آیا می خواهید این محصول را حذف کنید ؟"
                // content="این یک مودال عمومی است که در تمام بخش‌ها می‌توان از آن استفاده کرد."
                actionText="بله"
                actionHandler={(e) => { 
                    e.preventDefault()
                    handleEditProduct(idEdit?.id)
                    setOpenEdit(false); 
                }}
            >
                <div className='grid grid-cols-2 text-right mt-4 gap-2'>
                    <div>
                        <Text>نام محصول</Text>
                        <Input defaultValue={idEdit?.name} value={nameEditProduct} onChange={(e) => setNameEditProduct(e.target.value)} className={`w-full mt-2 bg-transparent border border-gray-400`}/>
                    </div>
                    <div>
                        <Text>قیمت</Text>
                        <div>
                            <p className='mt-5 mr-2 absolute font-sans text-xs'>ریال</p>    
                            <Input value={priceEditProduct} placeholder={`۳۰۰۰۰`} onChange={handleChange} className={`w-full mt-2 text-left bg-transparent border border-gray-400`}/>
                        </div>
                    </div>
                </div>

                <Text className={`mt-4 text-right mb-2`}>دسته بندی</Text>
                <Select
                    className='!outline-none !text-gray-400 text-right w-full'
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
                        {dataCategory?.results.map((item) => (
                            <MenuItem key={item?.id} value={item?.id}>
                                <Text>
                                    {item?.name}
                                </Text>    
                            </MenuItem>
                        ))}
                </Select>

                <Text className={`mt-4 text-right mb-2`}>وضعیت محصول</Text>
                <Select
                    className='!outline-none !text-gray-400 text-right w-full'
                    value={selectorState}
                    onChange={(e) => setSelectorState(e.target.value)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="">
                            <Text className={`text-gray-400`}>
                                دسته بندی را انتخاب کنید
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
