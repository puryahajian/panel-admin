import React, { useState } from 'react'
import Text from '../../atoms/text'
import ButtonEdit from '../../atoms/button-edit'
import GeneralModal from '../modal-general';
import UseGetDriver from '../../db/use-get-driver';
import Input from '../../atoms/input';
import UsePatchDriver from '../../db/use-patch-driver';
import Loading from '../../atoms/loading'
import UseDeleteDriver from '../../db/use-delete-driver';

function TabCouriers() {
    const [openModal, setOpenModal] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [id, setId] = useState(false);
    const [idDelete, setIdDelete] = useState(false);

    const { mutate, isPending } = UsePatchDriver();
    const { mutate: mutateDeleteDriver } = UseDeleteDriver()
    
    const [nameDriver, setNameDriver] = useState('');
    const [phoneDriver, setPhoneDriver] = useState('');
    const [addressDriver, setAddressDriver] = useState('');
    
    const { data } = UseGetDriver();

    const handlePatchDriver = (id) => {
        mutate(
            {
                nameDriver,phoneDriver,addressDriver, id
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
            <div className='grid grid-cols-12 py-4'>
                <Text>ردیف</Text>
                <Text className={`col-span-2 mr-2`}>نام</Text>
                <Text className={`col-span-2 mr-2`}> شماره تماس</Text>
                <Text>آدرس</Text>
            </div>

            <div className='grid gap-2'>
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
                            <ButtonEdit onClick={() => { 
                                setId(item?.id)
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
            >
                <div className='grid grid-cols-2 gap-4'>
                    <div className='text-right'>
                        <Text className={`mt-4 mb-2`}>نام</Text>
                        <Input value={nameDriver} onChange={(e) => setNameDriver(e.target.value)} className={`w-full`} placeholder={`نام محصول را وارد کنید`}/>
                    </div>
                    <div className='text-right'>
                        <Text className={`mt-4 mb-2`}>شماره تماس</Text>
                        <Input value={phoneDriver} onChange={(e) => setPhoneDriver(e.target.value)} className={`w-full text-left`} placeholder={`۰۹۳۶۲۲۹۲۵۶۸`}/>
                    </div>                    
                </div>

                <div className='text-right'>
                    <Text className={`mt-4 mb-2`}>آدرس</Text>
                    <Input value={addressDriver} onChange={(e) => setAddressDriver(e.target.value)} className={`w-full text-right`} placeholder={`آدرس پیک را وارد کنید`}/>
                </div> 
            </GeneralModal>

        </div>
    )
}

export default TabCouriers
