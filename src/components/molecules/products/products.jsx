import React, { useState } from 'react'
import ButtonGeneral from '../../atoms/button-general';
import TabListProducts from './tab-list-products';
import GeneralModal from '../modal-general';
import Uploader from '../uploader';
import Text from '../../atoms/text';
import Input from '../../atoms/input';
import UseCreateProduct from '../../db/use-create-product';
import { toast } from 'react-toastify';
import FeatureAddProduct from './mostafa';
import Mostafa from './mostafa';
import Loading from '../../atoms/loading';
import UseCreateNewProduct from '../../db/use-create-new-product';


function TabProduct({ children, step, index }) {
    return (
        <div
            role="tabpanel"
            className='mt-8'
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
    const [openAddProduct, setOpenAddProduct] = useState(false);
    const [openSelectProduct, setOpenSelectProduct] = useState(false);
    const { mutate, isLoading } = UseCreateProduct();
    const { mutate: mutateNewProduct, isLoading: isLoadingNewProduct } = UseCreateNewProduct();
    
    const [selectedFile, setSelectedFile] = useState(null);
    const [detailProduct, setDetailProduct] = useState(null);
    const [selectProduct, setSelectProduct] = useState('')
    const [priceProduct, setPriceProduct] = useState('')
    const [stateProduct, setStateProduct] = useState('')
    const [capacityProduct, setCapacityProduct] = useState('')
    const [typeOfPackProduct, setTypeOfPackProduct] = useState('')
    const [detailsProduct, setDetailsProduct] = useState('')

    const [description, setDescription] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleNeedCreateProduct = () => {
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

    const handleCreateNewProduct = (e) => {
        e.preventDefault();
        mutateNewProduct(
            {
                selectProduct, 
                priceProduct, 
                typeOfPackProduct, 
                stateProduct,
                capacityProduct,
                detailsProduct
            },
            {
                onSuccess: (data) => {
                    setOpenSelectProduct(false)
                }
            }
        )
    }


    return (
        <div>
            <div className='flex justify-between items-center'>

                <div className='flex gap-4'>
                    <ButtonGeneral onClick={() => setOpenAddProduct(true)} className={`border border-customBlue !text-customBlue`}>
                        درخواست کالای جدید
                    </ButtonGeneral>
                    <ButtonGeneral onClick={() => setOpenSelectProduct(true)} className={`border border-customBlue !text-customBlue`}>
                        انتخاب کالا
                    </ButtonGeneral>
                </div>
            </div>

            <TabProduct step={step} index={0}>
                {/* <hr className='w-[95%] m-auto'/> */}
                <TabListProducts/>
            </TabProduct>

            <GeneralModal
                open={openAddProduct}
                handleClose={(e) => {
                    setOpenAddProduct(false)
                    e.preventDefault();
                }}
                // title="آیا می یخواهید این دسته بندی را حذف کنید ؟"
                actionText={isLoading ? <Loading/> : 'ذخیره'}
                actionHandler={(e) => {
                    e.preventDefault();
                    handleNeedCreateProduct()
                    setOpenAddProduct(false)
                }}

                // onSubmit={handleNeedCreateProduct}
            >
                    <div className=' text-right'>
                        <Uploader
                            textOne={`تصویر محصول را انتخاب کنید`}
                            textTwo={`سایز تصویر شما نباید از ۲۰۰ کیلو بایت بیشتر باشه`}
                            selectedFile={selectedFile}
                            onFileSelect={setSelectedFile}
                            preview={preview}
                        />

                        <Text className={`mt-4 mb-2`}>نام محصول</Text>
                        <Input className={`w-full`} onChange={(e) => setDetailProduct(e.target.value)} placeholder={`نام محصول`}/>

                        <Text className={`mt-4 mb-2`}>جزئیات محصول</Text>
                        <Input className={`w-full`} onChange={(e) => setDescription(e.target.value)} placeholder={`جزئیات را بنویسید`}/>
                    </div>
            </GeneralModal>

            <GeneralModal
                open={openSelectProduct}
                handleClose={() => setOpenSelectProduct(false)}
                // title="آیا می یخواهید این دسته بندی را حذف کنید ؟"
                actionText="ثبت"
                actionHandler={() => {
                    // handleCreateNewProduct();
                    setOpenSelectProduct(false);
                }}
                // onSubmit={handleNeedCreateProduct}
                classBtn={`hidden`}
            >
                <Mostafa 
                    classMain={`!grid-cols-1 text-right`}
                    classStatus={`!grid-cols-1 text-right`}
                    classDecuraition={`!grid-cols-1 text-right`}
                    classTextarea={`!col-span-1`}

                    detailsProduct={detailsProduct}
                    setDetailsProduct={setDetailsProduct}
                    capacityProduct={capacityProduct}
                    setCapacityProduct={setCapacityProduct}
                    priceProduct={priceProduct}
                    setPriceProduct={setPriceProduct}
                    // productType={}
                    selectProduct={selectProduct}
                    setSelectProduct={setSelectProduct}
                    stateProduct={stateProduct}
                    setStateProduct={setStateProduct}
                    typeOfPackProduct={typeOfPackProduct}
                    setTypeOfPackProduct={setTypeOfPackProduct}
                    handleCreateNewProduct={handleCreateNewProduct}
                    contentBtn={isLoadingNewProduct ? <Loading/> : 'ثبت'}

                />
            </GeneralModal>
        </div>
    )
}

export default Products
