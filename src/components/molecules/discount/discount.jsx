import React, { useState } from 'react'
import ButtonGeneral from '../../atoms/button-general'
import TitleDiscount from './title-discount'
import ListDiscount from './list-discount'
import GeneralModal from '../modal-general'
import Text from '../../atoms/text'
import Input from '../../atoms/input'
import Title from '../../atoms/title'
import BirthDate from '../birth-day'
import useCreateDiscount from '../../db/use-create-discount'
import InputSelectorGroup from '../input-selector-group'

function Discount() {

    const {mutate} = useCreateDiscount();

    const [createDiscount, setCreateDiscount] = useState(false);
    const [dateFrom, setDateFrom] = useState();
    const [gregorianDateFrom, setGregorianDateFrom] = useState("");
    
    const [dateTo, setDateTo] = useState();
    const [gregorianDateTo, setGregorianDateTo] = useState("");
    
    const [nameCampain, setNameCampain] = useState('');
    const [codeDiscount, setCodeDiscount] = useState('');

    const [typeDiscount, setTypeDiscount] = useState('');
    const [valueDiscount, setValueDiscount] = useState('');
    const [selectProduct, setSelectProduct] = useState('');

    const discountOptions = [
        {
            id: 'percentage_cart',
            label: 'فعال سازی تخفیف درصدی روی سبد خرید',
        },
        {
            id: 'fixed_cart',
            label: 'فعال سازی تخفیف ثابت روی سبد خرید',
        },
        {
            id: 'fixed_product',
            label: 'فعالسازی تخفیف ثابت روی هر محصول',
        },
    ];
    

    const handleCreateDiscount = () => {
        // console.log(gregorianDateFrom, gregorianDateTo, nameCampain, codeDiscount, typeDiscount, valueDiscount, selectProduct)
        mutate(
            {
                gregorianDateFrom, gregorianDateTo, nameCampain, codeDiscount, typeDiscount, valueDiscount,selectProduct
            },
            {
                onSuccess: (data) => {
                    setNameCampain('')
                    setCodeDiscount('')
                    setTypeDiscount('')
                    setValueDiscount('')
                    setSelectProduct('')
                },
               onError: (err) => {
                // console.log(err)
               }
            }
        )
    }
    
    return (
        <div>
            <div className='w-full pt-4 flex max-[1024px]:fixed max-[1024px]:!bottom-0 max-[1024px]:h-max justify-end max-[1024px]:px-4 max-[1024px]:py-2 max-[1024px]:bg-white max-[1024px]:opacity-95  bg-white px-4 pb-4'>
                <ButtonGeneral onClick={() => setCreateDiscount(true)} className={` border border-customBlue !text-customBlue max-[990px]:w-full max-[990px]:bg-customBlue max-[990px]:!text-white`}>
                    افزودن کد تخفیف
                </ButtonGeneral>
            </div>
            <hr className='w-[95%] m-auto mb-4 max-[990px]:hidden'/>

            <TitleDiscount/>
            
            <ListDiscount/>

            <GeneralModal
                open={createDiscount}
                handleClose={(e) => {
                    e.preventDefault(); 
                    setCreateDiscount(false)
                }}
                title="ایجاد کد تخفیف"
                classTitle={`text-right border-b pb-4`}
                actionText="ذخیره"
                classAccept={`w-[200px] max-[680px]:w-full`}
                classReject={`w-[200px] max-[680px]:w-full`}
                actionHandler={(e) => { 
                    e.preventDefault(); 
                    handleCreateDiscount()
                    setCreateDiscount(false); 
                }}
                onClose={(e) => {
                    e.preventDefault()
                    setCreateDiscount(false);  
                }}
                sx={{
                    width: '800px', 
                    '@media (max-width: 830px)': {
                        width: '92%',
                    },
                }}
            >
                <div className='grid grid-cols-2 mt-4 max-[830px]:grid-cols-1 max-[830px]:gap-4'>
                    <div className='grid grid-cols-3 items-center text-right'>
                        <Text>نام کمپین یا تخفیف</Text>
                        <Input value={nameCampain} onChange={(e) => setNameCampain(e.target.value)} className={`col-span-2`}/>
                    </div>
                    <div className='grid grid-cols-3 items-center max-[830px]:text-right'>
                        <Text>کد تخفیف</Text>
                        <Input value={codeDiscount} onChange={(e) => setCodeDiscount(e.target.value)} className={`col-span-2`} />
                    </div>
                </div>

                <div className='grid grid-cols-2 my-4 max-[830px]:grid-cols-1 max-[830px]:gap-4'>
                    <div className='text-right'>
                        <Title className={`!text-black mb-1`}>تاریخ کمپین یا تخفیف</Title>
                        <Text className={`text-xs`}>شما باید تعداد روز کمپین یا مفدار زمان تخفیف خود را وارد کنید</Text>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className='flex items-center gap-2'>
                            <Text className={`flex w-max min-w-max`}>از روز</Text>
                            <BirthDate inputClass={`rounded-lg`} value={dateFrom} onChange={setDateFrom} onGregorianChange={setGregorianDateFrom}/>  
                        </div>
                        <div className='flex items-center gap-2'>
                            <Text className={`flex w-max min-w-max`}>تا روز</Text>
                            <BirthDate inputClass={`rounded-lg`} value={dateTo} onChange={setDateTo} onGregorianChange={setGregorianDateTo}/>  
                        </div>
                    </div>
                </div>

                <hr />

                <div className='flex justify-between my-4 max-[830px]:grid-cols-1 max-[830px]:grid max-[830px]:gap-2'>
                    {discountOptions?.map((option) => (
                        <div key={option.id} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="discount-type"
                                id={option?.id}
                                value={typeDiscount}
                                onClick={()=> setTypeDiscount(option?.id)}
                            />
                            <Text className="text-xs">{option.label}</Text>
                        </div>
                    ))}
                </div>

                <div className='flex justify-between my-4 max-[580px]:grid max-[830px]:gap-4'>
                    <div className='text-right'>
                        <Title className={`!text-black mb-1`}>مقدار تخفیف</Title>
                        <Text className={`text-xs`}>لطفا مقدار تخفیف مورد نظر خود را بصورت درصدی وارد کنید . مثال ۱۰ ٪</Text>
                    </div>

                    <div className='flex items-center gap-2'>
                        <Text className={`flex w-max min-w-max`}>مقدار کد تخفیف</Text>
                        <Input value={valueDiscount} onChange={(e) => setValueDiscount(e.target.value)} className={`w-[100px]`}/>
                        %
                    </div>
                </div>

                <InputSelectorGroup value={selectProduct} onChange={(e) => setSelectProduct(e.target.value)} />
            </GeneralModal>
        </div>
    )
}

export default Discount
