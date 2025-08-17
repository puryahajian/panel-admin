import React, { useState } from 'react'
import Text from '../../atoms/text'
import ButtonExisting from '../../atoms/button-existing'
import ButtonEdit from '../../atoms/button-edit'
import GeneralModal from '../modal-general'
import useGetAllAdmin from '../../db/use-get-all-admin'
import useDeleteAdmin from '../../db/use-delete-admin'
import usePatchAdmin from '../../db/use-patch-admin'
import Input from '../../atoms/input'
import DateShamsi from '../date-shamsi'
import Title from '../../atoms/title'

function TabAdmins({className}) {
    const { data } = useGetAllAdmin();
    const { mutate } = useDeleteAdmin();
    const { mutate: mutatePatchAdmin } = usePatchAdmin();
    const [openModal, setOpenModal] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [selectDataAdmin, setSelectDataAdmin] = useState('');

    const [nameAdmin, setNameAdmin] = useState(selectDataAdmin?.user?.name);
    const [familyAdmin, setFamilyAdmin] = useState(selectDataAdmin?.user?.family);
    const [phoneAdmin, setPhoneAdmin] = useState(selectDataAdmin?.user?.phone);
    const [addressAdmin, setAddressAdmin] = useState(selectDataAdmin?.user?.address);
    const [id, setId] = useState(false);

    const handleDeleteAdmin = (id) => {
        mutate(
            {
                id
            }
        )
    }

    const handlePatchAdmin = (id) => {
        mutatePatchAdmin(
            {
                nameAdmin, familyAdmin,addressAdmin, phoneAdmin,id
            },
        )
    }

    return (
        <div className={className}>
            <div className='flex py-4 max-[990px]:hidden'>
                <Text>ردیف</Text>
                <div className='grid grid-cols-8 w-full mr-6'>
                    <Text className={`col-span-2 pr-2`}>نام</Text>
                    <Text>شماره تماس</Text>
                    <Text>سطح دسترسی</Text>
                    <Text>آخرین ورود</Text>
                </div>
            </div>

            <div className='grid gap-2 max-[990px]:hidden'>
                {data?.map((item, index) => (
                    <div className='flex border border-grayTitle items-center p-4 rounded-2xl' key={item?.id}>
                        <div>
                            <Text>{index + 1}</Text>
                        </div>
                        <div className='w-full grid grid-cols-8 mr-10 items-center'>
                            <div className=" col-span-2">
                                <Text>{item?.user.name === null || item?.user.name === "" ? 'ناموجود' : item?.user.name} {item?.user.family}</Text>
                            </div>
                            <div>
                                <Text>{item?.user.phone === null || item?.user.phone === "" ? 'ناموجود' : item?.user.phone}</Text>
                            </div>
                            <div>
                                <Text>صندوقدار</Text>
                            </div>
                            <div className='w-max pr-1'>
                                <Text>{<DateShamsi hour={`2-digit`} minute={`2-digit`} date={item?.created_at}/>}</Text>
                            </div>
                            <div className=" flex justify-end gap-4 col-span-3">
                                <ButtonEdit onClick={() => {
                                    setId(item?.id)
                                    setOpenModalEdit(true)
                                    setSelectDataAdmin(item)
                                }}>ویرایش</ButtonEdit>
                            </div>
                            {/* <div className=" text-center">
                                <button onClick={() => {
                                    setId(item?.id)
                                    setOpenModal(true)
                                }}>
                                    <Text className={`text-red-500`}>حذف</Text>
                                </button>
                            </div> */}
                        </div>
                    </div>
                ))}
            </div>

            {/* size tablet & mobile */}
            <div className='hidden grid-cols-[repeat(auto-fill,minmax(350px,1fr))] max-[990px]:grid gap-4 max-[990px]:mt-[0px] max-[560px]:mt-6'>
                {data?.map((item) => (
                    <div className="border rounded-2xl grid gap-2 border-grayTitle p-4" key={item?.id}>
                        <div className='flex justify-between items-center'>
                            <Title>نام :</Title>
                            <Text>{item?.user.name === null || item?.user.name === "" ? 'ناموجود' : item?.user.name} {item?.user.family}</Text>
                        </div>
                        <div className='flex justify-between items-center'>
                            <Title>سطح دسترسی :</Title>
                            <Text>صندوقدار</Text>
                        </div>
                        <div className='flex justify-between items-center'>
                            <Title>شماره تماس :</Title>
                            <Text>{item?.user.phone === null || item?.user.phone === "" ? 'ناموجود' : item?.user.phone}</Text>
                        </div>
                        <ButtonEdit
                            className={`w-full mt-4 py-4`}
                            onClick={() => {
                                setId(item?.id)
                                setOpenModalEdit(true)
                                setSelectDataAdmin(item)
                        }}>ویرایش</ButtonEdit>
                    </div>
                ))}
            </div>

            <div className='flex justify-center mt-4'>
                {data?.length === 0 && <Text>دسته بندی موجود نیست</Text>}
            </div>

            {/* delete admin */}
            <GeneralModal
                open={openModal && id}
                handleClose={(e) => {
                    e.preventDefault(); 
                    setOpenModal(false)
                }}
                title="آیا می خواهید این ادمین را حذف کنید ؟"
                actionText="بله"
                actionHandler={(e) => {
                    e.preventDefault(); 
                    handleDeleteAdmin(id);
                    setOpenModal(false); 
                }}
            />

            {/* edit admin */}
            <GeneralModal
                open={openModalEdit && id}
                handleClose={(e) => {
                    e.preventDefault(); 
                    setOpenModalEdit(false)
                }}
                // title=""
                actionText="ذخیره"
                actionHandler={(e) => { 
                    e.preventDefault(); 
                    handlePatchAdmin(id)
                    setOpenModalEdit(false); 
                }}
                onClose={(e) => {
                    e.preventDefault()
                    setOpenModalEdit(false);  
                }}
                sx={{
                    width: '500px', 
                    '@media (max-width: 600px)': {
                        width: '92%',
                    },
                }}
            >
                 <div className=' text-right'>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className='text-right'>
                            <Text className={`mt-4 mb-2`}>نام</Text>
                            <Input defaultValue={selectDataAdmin?.user?.name} value={nameAdmin} onChange={(e) => setNameAdmin(e.target.value)} className={`w-full`} placeholder={`نام`}/>
                        </div>
                        <div className='text-right'>
                            <Text className={`mt-4 mb-2`}>نام خانوادگی</Text>
                            <Input defaultValue={selectDataAdmin?.user?.family} value={familyAdmin} onChange={(e) => setFamilyAdmin(e.target.value)} className={`w-full`} placeholder={`نام خانوادگی`}/>
                        </div>  
                    </div>

                    <div className='text-right'>
                        <Text className={`mt-4 mb-2`}>شماره تماس</Text>
                        <Input defaultValue={selectDataAdmin?.user?.phone} type={`number`} value={phoneAdmin} onChange={(e) => setPhoneAdmin(e.target.value)} className={`w-full text-left`} placeholder={`۰۹۳۶۲۲۹۲۵۶۸`}/>
                    </div>                    

                    <div className='text-right mb-4'>
                        <Text className={`mt-4 mb-2`}>آدرس</Text>
                        <Input defaultValue={selectDataAdmin?.user?.address} value={addressAdmin} onChange={(e) => setAddressAdmin(e.target.value)} className={`w-full text-right`} placeholder={`آدرس`}/>
                    </div> 

                </div>
            </GeneralModal>
               
        </div>
    )
}

export default TabAdmins
