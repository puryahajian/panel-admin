import React, { useState } from 'react'
import Text from '../../atoms/text'
import Input from '../../atoms/input'
import MenuAutoComplete from '../menu-auto-complete'
import List from '../../../lib/list'
import { FormControl, MenuItem, Select } from '@mui/material'
import UseCreateNewProduct from '../../db/use-create-new-product'
import ButtonGeneral from '../../atoms/button-general'
import UseNameProduct from '../../db/use-name-product'
import UseGetMaterial from '../../db/use-get-material'
import Loading from '../../atoms/loading'

function Mostafa({
    classMain, 
    classStatus, 
    classDecuraition, 
    classBtn,
    classTextarea,
    selectProduct, 
    setSelectProduct,
    priceProduct, 
    setPriceProduct,
    // productType, 
    stateProduct, 
    setStateProduct,
    capacityProduct,
    setCapacityProduct,
    detailsProduct,
    setDetailsProduct,
    typeOfPackProduct,
    setTypeOfPackProduct,
    handleCreateNewProduct,
    contentBtn
    }) {
    const { mutate, isLoading } = UseCreateNewProduct();
    // const [selectProduct, setSelectProduct] = useState('')
    // const [priceProduct, setPriceProduct] = useState('')
    // const [productType, setProductType] = useState('')
    // const [stateProduct, setStateProduct] = useState('')
    // const [capacityProduct, setCapacityProduct] = useState('')
    // const [typeOfPackProduct, setTypeOfPackProduct] = useState('')
    // const [detailProduct, setDetailProduct] = useState('')
    const {data} = UseNameProduct();
    const {data: material} = UseGetMaterial();
    // console.log(material)

    // const handleCreateNewProduct = (e) => {
    //     e.preventDefault();
    //     mutate(
    //         {
    //             selectProduct, 
    //             priceProduct, 
    //             productType, 
    //             stateProduct, 
    //             capacityProduct,
    //             detailProduct,
    //             typeOfPackProduct
    //         }
    //     )
    // }

    return (
        <form>
            <div className='flex gap-4'>
                <div className='w-full'>
                    <div className={`grid grid-cols-3 gap-4 ${classMain}`}>
                        <div className='text-right'>
                            <Text className={`mb-2`}>انتخاب محصول</Text>
                            {/* <Input onChange={(e) => setNameProduct(e.target.value)} className={`w-full`} placeholder={`نام محصول را وارد کنید`}/> */}
                            <FormControl sx={{ minWidth: 120 }} className='w-full bg-bgInput !outline-none !py-0'>
                                <Select
                                    className='!outline-none !py-0'
                                    value={selectProduct}
                                    onChange={(e) => setSelectProduct(e.target.value)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value="">
                                        <Text>
                                            کالا مورد نظر را انتخاب کنید
                                        </Text>
                                    </MenuItem>
                                    {data?.results?.map((item) => (
                                        <MenuItem value={item?.id}>
                                            <Text>
                                                {item?.name}
                                            </Text>        
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className='text-right'>
                            <Text className={`mb-2`}>قیمت (تومان)</Text>
                            <Input value={priceProduct} onChange={(e) => setPriceProduct(e.target.value)} className={`w-full text-left`} placeholder={`۳۰۰۰`}/>
                        </div> 
                        <div>
                            <Text className={`mb-2`}>نوع بسته بندی</Text>
                            <FormControl sx={{ minWidth: 120 }} className='w-full bg-bgInput !outline-none !py-0'>
                                <Select
                                    className='!outline-none !py-0'
                                    value={typeOfPackProduct}
                                    onChange={(e) => setTypeOfPackProduct(e.target.value)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem disabled value="">
                                        <Text>
                                            نوع بسته بندی را انتخاب کنید
                                        </Text>
                                    </MenuItem>

                                    {material?.map((item) => (
                                        <MenuItem key={item?.id} value={item?.id}>
                                            <Text>
                                                {item?.name}
                                            </Text>
                                        </MenuItem>
                                    ))}
                                    
                                </Select>
                            </FormControl>
                            {/* <Text className={``}>نوع کالا</Text>
                            <MenuAutoComplete onChange={(e) => setProductType(e.target.value)} options={List}/>   */}
                        </div>                 
                    </div>

                    <div className={`grid grid-cols-3 gap-4 ${classStatus}`}>
                        <div>
                            <Text className={`mt-4 mb-2`}>وضعیت</Text>
                            <FormControl sx={{ minWidth: 120 }} className='w-full bg-bgInput !outline-none !py-0'>
                                <Select
                                    className='!outline-none !py-0'
                                    value={stateProduct}
                                    onChange={(e) => setStateProduct(e.target.value)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value="">
                                        <Text>
                                            وضعیت کالا را مشخص کنبد
                                        </Text>
                                    </MenuItem>
                                    <MenuItem value={0}>
                                        <Text> 
                                            در دسترس
                                        </Text>
                                    </MenuItem>
                                    <MenuItem value={1}>
                                        <Text> 
                                            در دسترس نیست
                                        </Text>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className='text-right'>
                            <Text className={`mt-4 mb-2`}>ظرفیت محصول</Text>
                            <Input value={capacityProduct} onChange={(e) => setCapacityProduct(e.target.value)} className={`w-full text-left`} placeholder={`۳۰۰۰`}/>
                        </div>

                    </div>

                    <div className={`grid grid-cols-3 gap-4 ${classDecuraition}`}>
                        <div className={`col-span-2 ${classTextarea}`}>
                            <Text className={`mt-4`}>توضیحات</Text>
                            <textarea 
                                value={detailsProduct} 
                                onChange={(e) => setDetailsProduct(e.target.value)} 
                                className='bg-bgInput placeholder:text-black text-sm resize-none w-full border !border-Custom mt-2 rounded outline-none p-2' 
                            />
                        </div>
                        <div className={`flex items-end pb-2 ${classBtn}`}>
                            <ButtonGeneral onClick={handleCreateNewProduct} className={`bg-customBlue text-white border-transparent w-full py-[18px] `}>
                                {contentBtn}
                            </ButtonGeneral>
                            {/* <button onClick={handleCreateNewProduct}>ssss</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Mostafa
