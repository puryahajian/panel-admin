import React, { useState } from 'react'
import Text from '../../atoms/text'
import ButtonEdit from '../../atoms/button-edit'
import GeneralModal from '../modal-general';
import useGetAllCustomer from '../../db/use-get-all-customer';
import useDeleteCustomer from '../../db/use-delete-customer';
import Input from '../../atoms/input';
import usePatchCustomer from '../../db/use-patch-customer';
import Loading from '../../atoms/loading';
import Title from '../../atoms/title';

function TabCustomer() {
    const { data } = useGetAllCustomer();
    const { mutate } = useDeleteCustomer();
    const { mutate: mutatePatchCustomer, isLoading } = usePatchCustomer();
    const [openModal, setOpenModal] = useState(false);
    const [openModalAddCustomer, setOpenModalAddCustomer] = useState(false);
    const [selectIdCustomer, setSelectIdCustomer] = useState(null);
    const [selectIdEdit, setSelectIdEdit] = useState();
    const [nameCustomer, setNameCustomer] = useState();
    const [lastNameCustomer, setLastNameCustomer] = useState();
    const [numberCustomer, setNumberCustomer] = useState();
    const [addressCustomer, setAddressCustomer] = useState();
  
    const handleDeleteCustomer = (selectIdCustomer) => {
        mutate(
            {
                selectIdCustomer
            },
            {
                onSuccess: () => {

                }
            }
        )
    }

    const handlePatchCustomer = () => {
        mutatePatchCustomer(
            {
                nameCustomer, lastNameCustomer, numberCustomer, addressCustomer, selectIdEdit
            }
        )
    }

    const handleOpenEdit = (item) => {
        setSelectIdEdit(item?.id);
        setNameCustomer(item?.name || '');
        setLastNameCustomer(item?.family || '');
        setNumberCustomer(item?.phone || '');
        setAddressCustomer(item?.address || '');
        setOpenModalAddCustomer(true);
    };

    return (
        <div>
            <div className='grid grid-cols-12 py-4 max-[990px]:hidden'>
                <Text>ردیف</Text>
                <Text className={`col-span-2 mr-2`}>نام</Text>
                <Text className={`col-span-2 mr-2`}> شماره تماس</Text>
                <Text>آدرس</Text>
            </div>

            <div className='grid gap-2 max-[990px]:hidden'>
                {data?.results.map((item, index) => (
                    <div className='grid grid-cols-12 items-center border border-grayTitle rounded-2xl p-4' key={item?.id}>
                        <div>{index + 1}</div>
                        <div className=' col-span-2 flex items-center gap-6'>
                            <Text>{item?.name === null || item?.name === '' ? 'ناشناس' : item?.name} {item?.family}</Text>
                        </div>
                        <div className='col-span-2'>
                            <Text>{item?.phone === null ? 'ناموجود' : item?.phone}</Text>
                        </div>
                        <div className='col-span-4'>
                            <Text>{item?.address === null || item?.address === '' ? 'ادرس موجود نیست' : item?.address}</Text>
                        </div>
                        <div className=' col-span-3 flex justify-end'>
                            <ButtonEdit onClick={() => {
                                setSelectIdEdit(item?.id)
                                handleOpenEdit(item)
                                setOpenModalAddCustomer(true)
                                }}>
                                    ویرایش
                            </ButtonEdit>
                        </div>
                        {/* <div className=' text-center'>
                            <button onClick={() => {
                                setSelectIdCustomer(item?.id)
                                setOpenModal(true)
                                }}>
                                <Text className={`text-red-500`}>حذف</Text>
                            </button>
                        </div> */}
                    </div>
                ))}
            </div>

            {/* size tablet & mobile */}
            <div className='hidden gap-4 grid-cols-[repeat(auto-fill,minmax(350px,1fr))] max-[990px]:grid max-[990px]:mb-14'>
                {data?.results.map((item) => (
                    <div className="border rounded-2xl grid gap-2 border-grayTitle p-4" key={item?.id}>
                        <div className='flex justify-between items-center'>
                            <Title>نام :</Title>
                            <Text>{item?.name === null || item?.name === '' ? 'ناشناس' : item?.name} {item?.family}</Text>
                        </div>
                        <div className='flex justify-between items-center'>
                            <Title>شماره تماس :</Title>
                            <Text>{item?.phone === null ? 'ناموجود' : item?.phone}</Text>
                        </div>
                        <div className='flex justify-between items-center'>
                            <Title>آدرس :</Title>
                            <Text className={`truncate w-24`}>{item?.address === null || item?.address === '' ? 'ادرس موجود نیست' : item?.address}</Text>
                        </div>
                        <ButtonEdit
                            className={`w-full mt-4 py-4`}
                            onClick={() => {
                                setSelectIdEdit(item?.id)
                                handleOpenEdit(item)
                                setOpenModalAddCustomer(true)
                        }}>ویرایش</ButtonEdit>
                    </div>
                ))}
            </div>

            {/* delete customer */}
            <GeneralModal
                open={openModal && selectIdCustomer}
                handleClose={() => setOpenModal(false)}
                title={`آیا می خواهید این مشتری را حذف کنید ؟`}
                actionText="بله"
                actionHandler={(e) => {
                    e.preventDefault() 
                    handleDeleteCustomer(selectIdCustomer)
                    setOpenModal(false); 
                }}
            />

            {/* edit customer */}
            <GeneralModal
                open={openModalAddCustomer && selectIdEdit}
                handleClose={(e) => {
                    e.preventDefault()
                    setOpenModalAddCustomer(false)
                }}
                title={selectIdCustomer}
                actionText={isLoading ? <Loading/> : 'ذخیره'}
                actionHandler={(e) => { 
                    e.preventDefault()
                    handlePatchCustomer(selectIdEdit)
                    setOpenModalAddCustomer(false)
                    // console.log(selectIdEdit)
                    // setSelectId(selectIdEdit)
                }}
                onClose={(e) => {
                    e.preventDefault()
                    setOpenModalAddCustomer(false);  
                }}
                sx={{
                    width: '500px', 
                    '@media (max-width: 600px)': {
                        width: '92%',
                    },
                }}
            >
                <div className='flex w-full gap-4 mt-4 max-[600px]:grid'>
                    <div className='w-full text-right'>
                        <Text className={`text-right mt-4`}>نام</Text>
                        <Input value={nameCustomer} onChange={(e) => setNameCustomer(e.target.value)} className={`w-full mt-2`} placeholder={`نام مشتری را وارد کنید`}/>
                    </div>
                    <div className='w-full text-right'>
                        <Text className={`text-right mt-4`}>نام خانوادگی</Text>
                        <Input value={lastNameCustomer} onChange={(e) => setLastNameCustomer(e.target.value)} className={`w-full mt-2`} placeholder={`نام خانوادگی مشتری را وارد کنید`}/>
                    </div>
                </div> 

                <Text className={`mt-4 text-right`}>شماره</Text>
                <Input value={numberCustomer} onChange={(e) => setNumberCustomer(e.target.value)} type={`number`} className={`w-full text-left mt-2`} placeholder={`09111111111`}/>

                <Text className={`text-right mt-4`}>آدرس</Text>
                <Input value={addressCustomer} onChange={(e) => setAddressCustomer(e.target.value)} className={`w-full mt-2 mb-4`} placeholder={`آدرس را وارد کنید`}/>
            </GeneralModal>
        </div>
    )
}

export default TabCustomer
