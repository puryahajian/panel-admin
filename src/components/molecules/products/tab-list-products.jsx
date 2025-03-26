import React, { useState } from 'react'
import Text from '../../atoms/text'
import ButtonExisting from '../../atoms/button-existing'
import GeneralModal from '../modal-general'
import FeatureAddProduct from './feature-add-product'
import GetShopProduct from '../../db/get-shop-product'
import Img from '../../atoms/img'
import moment from 'jalali-moment'
import UseDeleteShopProduct from '../../db/use-delete-shop-product'

function TabListProducts() {
    const [open, setOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const { data } = GetShopProduct();
    const { mutate } = UseDeleteShopProduct();
    
    const handleDeleteClick = (id) => {
        setSelectedProductId(id);
        setOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (selectedProductId) {
            mutate({ selectedProductId }, {
                onSuccess: () => {
                    setOpen(false);
                    setSelectedProductId(null);
                },
            });
        }
    };

    return (
        <div className='mt-4'>
            <FeatureAddProduct />
            
            <Text className="mt-6">لیست محصولات</Text>
            <hr className='w-[95%] m-auto mt-4'/>
            <div className='grid grid-cols-8 py-4'>
                <Text>ردیف</Text>
                <Text className="col-span-2 mr-3">محصول</Text>
                <Text>توضیحات</Text>
                <Text>تاریخ</Text>
            </div>

            <div className='grid gap-2'>
                {data?.results?.map((item) => (
                    <div key={item?.id} className='grid grid-cols-8 items-center border border-grayTitle rounded-2xl p-4'>
                        <div>{item?.id}</div>
                        <div className='col-span-2 flex items-center gap-6'>
                            {item.images.map((image, index) => (
                                <Img key={index} src={image?.image} />
                            ))}
                            <div className='grid gap-2'>
                                <Text>{item?.name}</Text>
                                <Text>{item?.price.toLocaleString('fa-IR')} تومان</Text>
                            </div>
                        </div>
                        <div>
                            <Text>{item?.description.replace(/<\/?p>/g, '')}</Text>
                        </div>
                        <div>
                            <Text>{moment(item?.created_at).locale('fa').format('YYYY/MM/DD')}</Text>
                        </div>
                        <div className='col-span-2 flex justify-end gap-4'>
                            <ButtonExisting>{item?.inventory_state}</ButtonExisting>
                        </div>
                        <div className='text-center'>
                            <button onClick={() => handleDeleteClick(item?.id)}>
                                <Text className="text-red-500">حذف</Text>
                            </button>
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
