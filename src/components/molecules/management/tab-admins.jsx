import React, { useState } from 'react'
import Text from '../../atoms/text'
import ButtonExisting from '../../atoms/button-existing'
import ButtonEdit from '../../atoms/button-edit'
import GeneralModal from '../modal-general'
import UseGetAllAdmin from '../../db/use-get-all-admin'
import UseDeleteAdmin from '../../db/use-delete-admin'
import UsePatchAdmin from '../../db/use-patch-admin'
import Input from '../../atoms/input'

function TabAdmins() {
    const { data } = UseGetAllAdmin();
    const { mutate } = UseDeleteAdmin();
    const { mutate: mutatePatchAdmin } = UsePatchAdmin();
    const [openModal, setOpenModal] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);

    const [nameAdmin, setNameAdmin] = useState('');
    const [familyAdmin, setFamilyAdmin] = useState('');
    const [phoneAdmin, setPhoneAdmin] = useState('');
    const [addressAdmin, setAddressAdmin] = useState('');

    const [id, setId] = useState(false);

    const handleDeleteAdmin = (id) => {
        mutate(
            {
                id
            }
        )
    }

    const handlePatchAdmin = (id) => {
        // console.log(nameAdmin, familyAdmin,addressAdmin, phoneAdmin,id)
        mutatePatchAdmin(
            {
                nameAdmin, familyAdmin,addressAdmin, phoneAdmin,id
            }
        )
    }

    return (
        <div className=''>
            <div className='grid grid-cols-9 py-4'>
                <Text>ردیف</Text>
                <Text className={`col-span-2`}>نام</Text>
                <Text>شماره تماس</Text>
                <Text>سطح دسترسی</Text>
                <Text>آخرین ورود</Text>
            </div>

            <div className='grid gap-2'>
                {data?.results.map((item, index) => (
                    <div className='border border-grayTitle grid grid-cols-9 items-center p-4 rounded-2xl' key={item?.id}>
                        <div>
                            <Text>{index + 1}</Text>
                        </div>
                        <div className=" col-span-2">
                            <Text>{item?.user.name === null || item?.user.name === "" ? 'ناموجود' : item?.user.name} {item?.user.family}</Text>
                        </div>
                        <div>
                            <Text>{item?.user.phone === null || item?.user.phone === "" ? 'ناموجود' : item?.user.phone}</Text>
                        </div>
                        <div>
                            <Text>صندوقدار</Text>
                        </div>
                        <div>
                            <Text>{item?.created_at}</Text>
                        </div>
                        <div className=" flex justify-end gap-4 col-span-2">
                            {/* <ButtonExisting className={`!px-7`}>فعال</ButtonExisting> */}
                            <ButtonEdit onClick={() => {
                                setId(item?.id)
                                setOpenModalEdit(true)
                            }}>ویرایش</ButtonEdit>
                        </div>
                        <div className=" text-center">
                            <button onClick={() => {
                                setId(item?.id)
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
            >
                 <div className=' text-right'>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className='text-right'>
                            <Text className={`mt-4 mb-2`}>نام</Text>
                            <Input value={nameAdmin} onChange={(e) => setNameAdmin(e.target.value)} className={`w-full`} placeholder={`نام`}/>
                        </div>
                        <div className='text-right'>
                            <Text className={`mt-4 mb-2`}>نام خانوادگی</Text>
                            <Input value={familyAdmin} onChange={(e) => setFamilyAdmin(e.target.value)} className={`w-full`} placeholder={`نام خانوادگی`}/>
                        </div>  
                    </div>

                    <div className='text-right'>
                        <Text className={`mt-4 mb-2`}>شماره تماس</Text>
                        <Input value={phoneAdmin} onChange={(e) => setPhoneAdmin(e.target.value)} className={`w-full text-left`} placeholder={`۰۹۳۶۲۲۹۲۵۶۸`}/>
                    </div>                    

                    <div className='text-right'>
                        <Text className={`mt-4 mb-2`}>آدرس</Text>
                        <Input value={addressAdmin} onChange={(e) => setAddressAdmin(e.target.value)} className={`w-full text-right`} placeholder={`آدرس`}/>
                    </div> 

                </div>
            </GeneralModal>
               
        </div>
    )
}

export default TabAdmins
