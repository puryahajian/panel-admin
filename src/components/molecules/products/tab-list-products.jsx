import React, { useState } from 'react'
import Text from '../../atoms/text'
import ButtonExisting from '../../atoms/button-existing'
import GeneralModal from '../modal-general'
import FeatureAddProduct from './mostafa'
import GetShopProduct from '../../db/get-shop-product'
import Img from '../../atoms/img'
import moment from 'jalali-moment'
import UseDeleteShopProduct from '../../db/use-delete-shop-product'
import Input from '../../atoms/input'

function TabListProducts() {
    const [open, setOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const { data } = GetShopProduct();
    
    const { mutate } = UseDeleteShopProduct();
    const [searchTerm, setSearchTerm] = useState("");
    const search =  data?.results.map((item) => item)
    const filteredItems = search?.filter((item) =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const handleDeleteClick = (id) => {
        setSelectedProductId(id);
        setOpen(true);
    };

    const handleDeleteConfirm = (e) => {
        e.preventDefault();
        mutate(
            { selectedProductId 

            }, 
            {
            onSuccess: () => {
                setOpen(false);
            },
        });
    };

    return (
        <div className='mt-4'>
            {/* <FeatureAddProduct /> */}
            
            <div className='w-full flex justify-between mb-2 items-center'>
                <Text>لیست محصولات</Text>
                <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={`جستجو بر اساس نام`}/>
            </div>
            <hr className='w-[95%] m-auto mt-4'/>

            <div className='flex py-4'>
                <Text>ردیف</Text>
                <div className='grid grid-cols-8 w-full'>
                    <Text className=" pr-4 col-span-2">محصول</Text>
                    {/* <Text>توضیحات</Text> */}
                    <Text>تاریخ</Text>
                </div>
            </div>

            <div className='grid gap-2'>
                {filteredItems?.map((item, index) => (
                    <div className='flex items-center border border-grayTitle rounded-2xl p-4'>
                        <div>{index + 1}</div>
                        <div key={item?.id} className='grid grid-cols-8 items-center w-full mr-6'>
                            <div className='col-span-2 flex items-center gap-6'>
                                <Img src={item.images[1].image} />
                                <div className='grid gap-2'>
                                    <Text>{item?.name}</Text>
                                    <Text>{item?.price.toLocaleString('fa-IR')} تومان</Text>
                                </div>
                            </div>
                            {/* <div>
                                <Text dangerouslySetInnerHTML={{__html: item?.description || ''}} className={`truncate w-24 h-[20px]`}></Text>
                            </div> */}
                            <div>
                                <Text>{moment(item?.created_at).locale('fa').format('YYYY/MM/DD')}</Text>
                            </div>
                            {/* <div className='col-span-2 flex justify-end gap-4'>
                                <ButtonExisting>{item?.inventory_state}</ButtonExisting>
                            </div> */}
                            <div className=' col-span-5 pl-6 text-left'>
                                <button className='bg-red-500 px-4 py-2 rounded-lg' onClick={() => handleDeleteClick(item?.id)}>
                                    <Text className="text-white">حذف</Text>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <GeneralModal
                open={open}
                handleClose={() => {
                    setOpen(false);
                    setSelectedProductId(null);
                }}
                title="آیا می خواهید این محصول را حذف کنید؟"
                actionText="بله"
                actionHandler={handleDeleteConfirm}
            />
        </div>
    );
}

export default TabListProducts;
