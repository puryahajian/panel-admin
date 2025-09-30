import React, { useEffect, useState } from 'react';
import Text from '../../atoms/text';
import ButtonExisting from '../../atoms/button-existing';
import ButtonEdit from '../../atoms/button-edit';
import Title from '../../atoms/title';
import moment from 'jalali-moment';
import useGetDiscount from '../../db/use-get-descount';
import GeneralModal from '../modal-general';
import Input from '../../atoms/input';
import BirthDate from '../birth-day';
import InputSelectorGroup from '../input-selector-group';
import usePatchDiscount from '../../db/use-patch-discount';
import useDeleteDiscount from '../../db/use-delete-discount';

function ConvertToJalali({ converter }) {
    const gregorianDate = moment(converter, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
    gregorianDate.locale('fa');
    const jalaliDate = gregorianDate.format('jD jMMMM');
    return <span>{jalaliDate}</span>;
}

function ListDiscount() {
    const { data } = useGetDiscount();
    // console.log(data)

    const {mutate} = usePatchDiscount();
    const {mutate: mutateDelete} = useDeleteDiscount()

    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [selectIdDiscount, setSelectIdDiscount] = useState(null);

    // حالت‌های فرم با مقداردهی اولیه از selectIdDiscount
    const [dateFrom, setDateFrom] = useState('');
    const [gregorianDateFrom, setGregorianDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [gregorianDateTo, setGregorianDateTo] = useState('');
    const [nameCampain, setNameCampain] = useState('');
    const [codeDiscount, setCodeDiscount] = useState('');
    const [typeDiscount, setTypeDiscount] = useState('');
    const [valueDiscount, setValueDiscount] = useState('');
    const [selectProduct, setSelectProduct] = useState([]);
    const [inState, setInState] = useState(false);

    const discountOptions = [
        { id: 'percentage_cart', label: 'فعال سازی تخفیف درصدی روی سبد خرید' },
        { id: 'fixed_cart', label: 'فعال سازی تخفیف ثابت روی سبد خرید' },
        { id: 'fixed_product', label: 'فعالسازی تخفیف ثابت روی هر محصول' },
    ];

    // به‌روزرسانی مقادیر فرم هنگام تغییر selectIdDiscount
    useEffect(() => {
        if (selectIdDiscount) {
        setNameCampain(selectIdDiscount.name || '');
        setCodeDiscount(selectIdDiscount.code || '');
        setTypeDiscount(
            discountOptions.find((option) => option.id === selectIdDiscount.type)?.id || ''
        );
        setValueDiscount(selectIdDiscount.value || '');
        setSelectProduct(selectIdDiscount.products || []);
        // تبدیل تاریخ‌های میلادی به شمسی
        const fromDate = moment(selectIdDiscount.valid_from, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
            .locale('fa')
            .format('YYYY-MM-DD');
        const toDate = moment(selectIdDiscount.valid_to, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
            .locale('fa')
            .format('YYYY-MM-DD');
        setDateFrom(fromDate);
        setGregorianDateFrom(selectIdDiscount.valid_from.split('T')[0]);
        setDateTo(toDate);
        setGregorianDateTo(selectIdDiscount.valid_to.split('T')[0]);
        }
    }, [selectIdDiscount]);


    const handlePatchDiscount = (id, active) => {
        const newValue = !active;
        setInState(newValue);
        // console.log(inState, id)

        mutate(
            {
                gregorianDateFrom, 
                gregorianDateTo, 
                nameCampain, 
                codeDiscount, 
                typeDiscount, 
                valueDiscount, 
                selectProduct,
                id, 
                inState: newValue
            }
        )
    }

    const handleDelete = (id) => {
        mutateDelete(
            {
                id
            }
        )
    }

    return (
        <div className='mx-4'>
        {data?.results?.map((item, index) => (
            <React.Fragment key={item?.id}>
            <div className="mt-4 flex gap-4 border p-2 rounded-2xl items-center max-[992px]:hidden px-4">
                <div>
                <Text>{index + 1}</Text>
                </div>
                <div className="grid grid-cols-11 w-full mr-4 items-center">
                <div className="col-span-2">
                    <Text>{item?.name || 'بدون نام'}</Text>
                </div>
                <div className="col-span-2">
                    <Text>{item?.code}</Text>
                </div>
                <div className="col-span-2">
                    <Text>
                    از <ConvertToJalali converter={item?.valid_from} /> تا{' '}
                    <ConvertToJalali converter={item?.valid_to} />
                    </Text>
                </div>
                <div className="col-span-4 flex justify-end gap-4">
                    {/* <ButtonExisting
                        onClick={() => handlePatchDiscount(item.id, item.active)}
                        className={`${item?.active === true ? '' : 'bg-red-500 border-transparent'}`}
                        >
                        {item?.active ? 'فعال' : 'غیرفعال'}
                    </ButtonExisting> */}
                    <ButtonEdit
                    onClick={() => {
                        setOpenModalEdit(true);
                        setSelectIdDiscount(item);
                    }}
                    >
                    ویرایش
                    </ButtonEdit>
                </div>
                <div className="flex justify-center items-center">
                    <button onClick={() => {
                        setOpenModalDelete(true);
                        setSelectIdDiscount(item);
                    }}>
                        <Text className="text-red-500">حذف</Text>
                    </button>
                </div>
                </div>
            </div>

            <div className="gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] hidden max-[992px]:grid max-[990px]:mb-14 max-[990px]:mt-[85px]">
                <div className="border border-grayTitle rounded-2xl p-4">
                <div className="w-full grid gap-1">
                    <div className="flex justify-between items-center">
                        <Title>نام کمپین یا تخفیف:</Title>
                        <Text>{item?.name || 'بدون نام'}</Text>
                    </div>
                    <div className="flex justify-between items-center">
                        <Title>کد تخفیف:</Title>
                        <Text>{item?.code}</Text>
                    </div>
                    <div className="flex justify-between items-center">
                        <Title>تاریخ اعتبار:</Title>
                        <Text>
                            از <ConvertToJalali converter={item?.valid_from} /> تا{' '}
                            <ConvertToJalali converter={item?.valid_to} />
                        </Text>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                    {/* <ButtonExisting
                        onClick={() => handlePatchDiscount(item.id, item.active)}
                        className={`py-2 rounded-lg transition-colors text-sm 
                            ${item?.active ? '' : 'bg-red-500 border-transparent'}`}
                    >
                        {item?.active ? 'فعال' : 'غیرفعال'}
                    </ButtonExisting> */}
                    <ButtonEdit
                        onClick={() => {
                            setOpenModalEdit(true);
                            setSelectIdDiscount(item);
                        }}
                    >
                    ویرایش
                    </ButtonEdit>
                    <button onClick={() => {
                        setOpenModalDelete(true);
                        setSelectIdDiscount(item);
                    }}>
                        <Text className="text-red-500">حذف</Text>
                    </button>
                </div>
                </div>
            </div>
            </React.Fragment>
        ))}

        <div className='mt-6 flex justify-center'>
            <Text>{data?.count === 0 && 'تخفیف ایجاد نکردید'}</Text>
        </div>

        {/* modal edit */}
        <GeneralModal
            open={openModalEdit}
            handleClose={(e) => {
                e.preventDefault();
                setOpenModalEdit(false);
            }}
            title="ویرایش تخفیف"
            actionText="ذخیره"
            actionHandler={(e) => {
                e.preventDefault();
                handlePatchDiscount(selectIdDiscount?.id);
                setOpenModalEdit(false);
            }}
            onClose={(e) => {
                e.preventDefault();
                setOpenModalEdit(false);
            }}
            sx={{
                width: '800px',
                '@media (max-width: 830px)': {
                    width: '92%',
                },
            }}
        >
            <div className="grid grid-cols-2 mt-4 max-[830px]:grid-cols-1 max-[830px]:gap-4">
            <div className="grid grid-cols-3 items-center text-right">
                <Text>نام کمپین یا تخفیف</Text>
                <Input
                value={nameCampain}
                onChange={(e) => setNameCampain(e.target.value)}
                className="col-span-2"
                />
            </div>
            <div className="grid grid-cols-3 items-center max-[830px]:text-right">
                <Text>کد تخفیف</Text>
                <Input
                value={codeDiscount}
                onChange={(e) => setCodeDiscount(e.target.value)}
                className="col-span-2"
                />
            </div>
            </div>

            <div className="grid grid-cols-2 my-4 max-[830px]:grid-cols-1 max-[830px]:gap-4">
            <div className="text-right">
                <Title className="!text-black mb-1">تاریخ کمپین یا تخفیف</Title>
                <Text className="text-xs">
                شما باید تعداد روز کمپین یا مقدار زمان تخفیف خود را وارد کنید
                </Text>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                <Text className="flex w-max min-w-max">از روز</Text>
                <BirthDate
                    inputClass="rounded-lg"
                    value={dateFrom}
                    onChange={setDateFrom}
                    onGregorianChange={setGregorianDateFrom}
                />
                </div>
                <div className="flex items-center gap-2">
                <Text className="flex w-max min-w-max">تا روز</Text>
                <BirthDate
                    inputClass="rounded-lg"
                    value={dateTo}
                    onChange={setDateTo}
                    onGregorianChange={setGregorianDateTo}
                />
                </div>
            </div>
            </div>

            <hr />

            <div className="flex justify-between my-4 max-[830px]:grid-cols-1 max-[830px]:grid max-[830px]:gap-2">
            {discountOptions.map((option) => (
                <div key={option.id} className="flex items-center gap-2">
                <input
                    type="radio"
                    name="discount-type"
                    id={option.id}
                    value={option.id}
                    checked={typeDiscount === option.id}
                    onChange={() => setTypeDiscount(option.id)}
                />
                <Text className="text-xs">{option.label}</Text>
                </div>
            ))}
            </div>

            <div className="flex justify-between my-4 max-[580px]:grid max-[830px]:gap-4">
            <div className="text-right">
                <Title className="!text-black mb-1">مقدار تخفیف</Title>
                <Text className="text-xs">
                لطفا مقدار تخفیف مورد نظر خود را بصورت درصدی وارد کنید. مثال ۱۰ ٪
                </Text>
            </div>
            <div className="flex items-center gap-2">
                <Text className="flex w-max min-w-max">مقدار کد تخفیف</Text>
                <Input
                value={valueDiscount}
                onChange={(e) => setValueDiscount(e.target.value)}
                className="w-[100px]"
                />
                %
            </div>
            </div>

            <InputSelectorGroup
            value={selectProduct}
            onChange={(e) => setSelectProduct(e.target.value)}
            />
        </GeneralModal>

        {/* modal delete */}
        <GeneralModal
            open={openModalDelete}
            handleClose={(e) => {
                e.preventDefault();
                setOpenModalDelete(false);
            }}
            title="آیا می خواهید این تخفیف را حذف کنید؟"
            actionText="بله"
            actionHandler={(e) => {
                e.preventDefault();
                handleDelete(selectIdDiscount?.id);
                setOpenModalDelete(false);
            }}
            onClose={(e) => {
                e.preventDefault();
                setOpenModalDelete(false);
            }}
            sx={{
                width: '500px',
                '@media (max-width: 600px)': {
                    width: '92%',
                },
            }}
        >
           
        </GeneralModal>
        </div>
    );
}

export default ListDiscount;