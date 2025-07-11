import React, { useState } from 'react'
import Text from '../../atoms/text'
import ButtonEdit from '../../atoms/button-edit'
import GeneralModal from '../modal-general';
import useGetDriver from '../../db/use-get-driver';
import Input from '../../atoms/input';
import usePatchDriver from '../../db/use-patch-driver';
import Loading from '../../atoms/loading'
import useDeleteDriver from '../../db/use-delete-driver';
import ButtonExisting from '../../atoms/button-existing';
import Title from '../../atoms/title';

function TabCouriers() {
    const { data } = useGetDriver();

    const [selectData, setSelectData] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [id, setId] = useState(false);
    const [idDelete, setIdDelete] = useState(false);
    const { mutate, isPending } = usePatchDriver();
    const { mutate: mutateDeleteDriver } = useDeleteDriver()
    
    const [nameDriver, setNameDriver] = useState(selectData?.name);
    const [phoneDriver, setPhoneDriver] = useState(selectData?.phone);
    const [addressDriver, setAddressDriver] = useState(selectData?.address);
    const [inState, setInState] = useState(false);

    

    const handlePatchDriver = (id, inProcess) => {
        const newValue = !inProcess;
        setInState(newValue);
        mutate(
            {
                nameDriver,phoneDriver,addressDriver, id, inState: newValue
            }
        )
    }

    const handleDeleteDriver = (idDelete) => {
        mutateDeleteDriver(
            {
                idDelete
            }
        )
    }

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
                            <Text>{item?.name}</Text>
                        </div>
                        <div className='col-span-2'>
                            <Text>{item?.phone}</Text>
                        </div>
                        <div className='col-span-4'>
                            <Text>{item?.address === null ? 'موجود نیست' : item?.address}</Text>
                        </div>
                        <div className=' col-span-2 flex justify-end gap-4'>
                            <ButtonExisting
                                onClick={() => handlePatchDriver(item.id, item.in_process)}
                                className={`${item?.in_process === true ? '' : 'bg-red-500 border-transparent'}`}
                            >
                                {item?.in_process === true ? 'آنلاین' : 'آفلاین'}
                            </ButtonExisting>
                            <ButtonEdit onClick={() => { 
                                setId(item?.id)
                                setSelectData(item)
                                setOpenEdit(true)
                            }}>ویرایش</ButtonEdit>
                        </div>
                        <div className=' text-center'>
                            <button onClick={() => {
                                setIdDelete(item?.id)
                                setOpenModal(true)
                            }}>
                                <Text className={`text-red-500`}>حذف</Text>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* size tablet & mobile */}
            <div className='hidden gap-4 grid-cols-[repeat(auto-fill,minmax(350px,1fr))] max-[990px]:grid'>
                {data?.results.map((item) => (
                    <div className="border rounded-2xl grid gap-2 border-grayTitle p-4" key={item?.id}>
                        <div className='flex justify-between items-center'>
                            <Title>نام :</Title>
                            <Text>{item?.name}</Text>
                        </div>
                        <div className='flex justify-between items-center'>
                            <Title>شماره تماس :</Title>
                            <Text>{item?.phone}</Text>
                        </div>
                        <div className='flex justify-between items-center'>
                            <Title>آدرس :</Title>
                            <Text className={`truncate w-24`}>{item?.address === null ? 'موجود نیست' : item?.address}</Text>
                        </div>
                        <div className='grid grid-cols-3 gap-2 mt-4'> 
                            <ButtonExisting
                                onClick={() => handlePatchDriver(item.id, item.in_process)}
                                className={`${item?.in_process === true ? '' : 'bg-red-500 border-transparent'}`}
                            >
                                {item?.in_process === true ? 'آنلاین' : 'آفلاین'}
                            </ButtonExisting>
                            <ButtonEdit onClick={() => { 
                                    setId(item?.id)
                                    setSelectData(item)
                                    setOpenEdit(true)
                                }}
                            >
                                ویرایش
                            </ButtonEdit>
                            <button onClick={() => {
                                setIdDelete(item?.id)
                                setOpenModal(true)
                            }}>
                                <Text className={`text-red-500`}>حذف</Text>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex justify-center mt-4'>
                {data?.results.length === 0 && <Text>دسته بندی موجود نیست</Text>}
            </div>

            <GeneralModal
                open={openModal && idDelete}
                handleClose={(e) => {
                    e.preventDefault()
                    setOpenModal(false)
                }}
                title="آیا می خواهید این پیک را حذف کنید؟"
                actionText="بله"
                actionHandler={(e) => { 
                    e.preventDefault()
                    handleDeleteDriver(idDelete)
                    setOpenModal(false); 
                }}
                onClose={(e) => {
                    e.preventDefault()
                    setOpenModal(false);  
                }}
                sx={{
                    width: '500px', 
                    '@media (max-width: 600px)': {
                        width: '93%',
                    },
                }}
            />

            <GeneralModal
                open={openEdit && id}
                handleClose={(e) => {
                    e.preventDefault()
                    setOpenEdit(false)
                }}
                title="ویرایش اطلاعات"
                actionText={isPending ? <Loading/> : 'ذخیره'}
                actionHandler={(e) => { 
                    e.preventDefault()
                    handlePatchDriver(id)
                    setOpenEdit(false); 
                }}
                onClose={(e) => {
                    e.preventDefault()
                    setOpenEdit(false);  
                }}
                sx={{
                    width: '500px', 
                    '@media (max-width: 600px)': {
                        width: '92%',
                    },
                }}
            >
                <div className='grid grid-cols-2 gap-4 max-[600px]:grid-cols-1'>
                    <div className='text-right'>
                        <Text className={`mt-4 mb-2`}>نام</Text>
                        <Input defaultValue={selectData?.name} value={nameDriver} onChange={(e) => setNameDriver(e.target.value)} className={`w-full`} placeholder={`نام محصول را وارد کنید`}/>
                    </div>
                    <div className='text-right'>
                        <Text className={`mt-4 mb-2`}>شماره تماس</Text>
                        <Input defaultValue={selectData?.phone} value={phoneDriver} onChange={(e) => setPhoneDriver(e.target.value)} type={`number`} className={`w-full text-left`} placeholder={`۰۹۳۶۲۲۹۲۵۶۸`}/>
                    </div>                    
                </div>

                <div className='text-right mb-4'>
                    <Text className={`mt-4 mb-2`}>آدرس</Text>
                    <Input defaultValue={selectData?.address} value={addressDriver} onChange={(e) => setAddressDriver(e.target.value)} className={`w-full text-right`} placeholder={`آدرس پیک را وارد کنید`}/>
                </div> 
            </GeneralModal>

        </div>
    )
}

export default TabCouriers
