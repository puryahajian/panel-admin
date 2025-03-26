import React, { useState } from 'react'
import ButtonGeneral from '../../atoms/button-general';
import TabListProducts from './tab-list-products';
import GeneralModal from '../modal-general';
import Uploader from '../uploader';
import Text from '../../atoms/text';
import Input from '../../atoms/input';
import UseCreateProduct from '../../db/use-create-product';
import { toast } from 'react-toastify';


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
    const [openAddProduct, setOpenAddProduct] = useState(false);
    const { mutate } = UseCreateProduct();
    const [selectedFile, setSelectedFile] = useState(null);
    const [detailProduct, setDetailProduct] = useState(null);
    const [description, setDescription] = useState(null);

    // console.log(detailProduct)

    const Buttons = [
        {label: "افزودن محصول" },
        // {label: "دسته بندی ها" },
    ];

    const handleNeedCreateProduct = (e) => {
        e.preventDefault();
        
        mutate(
            { 
                detailProduct, selectedFile, description
            },
            {
                onSuccess: (data) => {
                    toast.success('با موفقیت ثبت شد !')
                },
            }
        );
    }


    return (
        <div>
            <div className='flex justify-between items-center'>
                <div className='flex gap-4'>
                    {Buttons?.map((tab, index) => (
                        // <button
                        //     key={index}
                        //     onClick={() => setStep(index)}
                        //     className={`px-7 py-3 rounded-lg text-sm font-sans text-grayText ${
                        //         step === index
                        //             ? 'bg-grayText text-white'
                        //             : 'border border-gray-600 text-grayText'
                        //     }`}
                        //     aria-controls={`vertical-tabpanel-${index}`}
                        // >
                            <Text className='font-sans text-sm '>{tab.label}</Text>
                            
                        // </button>
                    ))}
                </div>

                <ButtonGeneral onClick={() => setOpenAddProduct(true)} className={`border border-blue-500 !text-blue-500`}>
                    درخواست کالای جدید
                </ButtonGeneral>
            </div>

            <TabProduct step={step} index={0}>
                <hr className='w-[95%] m-auto'/>
                <TabListProducts/>
            </TabProduct>

            <GeneralModal
                open={openAddProduct}
                handleClose={() => setOpenAddProduct(false)}
                // title="آیا می یخواهید این دسته بندی را حذف کنید ؟"
                actionText="ذخیره"
                actionHandler={() => setOpenAddProduct(false)}
                onSubmit={handleNeedCreateProduct}
            >
                    <div className=' text-right'>
                        <Uploader
                            textOne={`تصویر محصول را انتخاب کنید`}
                            textTwo={`سایز تصویر شما نباید از ۲۰۰ کیلو بایت بیشتر باشه`}
                            selectedFile={selectedFile}
                            onFileSelect={setSelectedFile}
                        />

                        <Text className={`mt-4 mb-2`}>نام محصول</Text>
                        <Input className={`w-full`} onChange={(e) => setDetailProduct(e.target.value)} placeholder={`نام محصول`}/>

                        <Text className={`mt-4 mb-2`}>جزئیات محصول</Text>
                        <Input className={`w-full`} onChange={(e) => setDescription(e.target.value)} placeholder={`جزئیات را بنویسید`}/>
                    </div>
            </GeneralModal>
        </div>
    )
}

export default Products
