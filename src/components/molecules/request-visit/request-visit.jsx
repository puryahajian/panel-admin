import React, { useState } from 'react'
import Text from '../../atoms/text'
import ButtonGeneral from '../../atoms/button-general'
import MenuSelect from '../menu-select'
import { MenuItem } from '@mui/material'
import MenuDoted from '../../menu-doted'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../../../App.css'
import { Link } from 'react-router-dom'
import UseGetNewVisit from '../../db/use-get-new-visit'
import UsePostAcceptNewVisit from '../../db/use-post-accept-new-visit'
import { toast } from 'react-toastify'
import UsePostDeleteNewVisit from '../../db/use-post-delete-new-visit'
import moment from 'jalali-moment'

function RequestVisit() {
    const { data } = UseGetNewVisit();
    console.log(data)
    const { mutate } = UsePostAcceptNewVisit();
    const { mutate: mutateDelete } = UsePostDeleteNewVisit();

    const handleGetIdNewVisitAccept = (itemId) => {
        mutate(
            {
                itemId
            },
            {
                onSuccess: (data) => {
                    toast.success('تایید شد')
                }
            }
        )
    }

    const handleGetIdNewVisitDelete = (itemId) => {
        mutateDelete(
            {
                itemId
            },
            {
                onSuccess: (data) => {
                    toast.success('لغو شد')
                }
            }
        )
    }

    // const name = [
    //     {id: 1, valueName: 'تایید'},
    //     {id: 2, valueName: 'لغو'},
    // ]

    return (
        <div>
            <Text>درخواست ها</Text>

            <div className='flex py-4 bg-gray-100 rounded-lg px-2 mt-2'>
                <div className='w-4/5 grid grid-cols-6'>
                    <Text>ردیف</Text>
                    <Text className={`col-span-2 border-r border-gray-500 pr-2`}>نام</Text>
                    <Text className={`border-r border-gray-500 pr-2`}>تاریخ و ساعت</Text>
                </div>
            </div>

            {data?.map((item) => (
                <div key={item?.id} className='flex py-4 bg-gray-100 rounded-lg px-2 mt-2 items-center'>
                    <div className='w-4/5 grid grid-cols-6'>
                        <Text>{item?.id}</Text>
                        <Text className={`col-span-2  pr-2`}>{item?.user}</Text>
                        <Text className={` pr-2`}>{moment(item?.created_at).locale('fa').format('YYYY/MM/DD')}</Text>
                    </div>
                    <div className='w-max text-left gap-4 mx-8  flex'>

                        <ButtonGeneral onClick={() => handleGetIdNewVisitDelete(item?.id)} className={`!px-8 bg-red-500 text-white border-transparent`}>
                            لغو
                        </ButtonGeneral>
                        <ButtonGeneral onClick={() => handleGetIdNewVisitAccept(item?.id)} className={`bg-customBlue text-white border-transparent`}>
                            تایید
                        </ButtonGeneral>

                        {/* <MenuSelect defaultValue={name[0].id} className={`!rounded-lg`}>
                            {name.map((item) => (
                                <MenuItem key={item.id} className='font-sans' value={item.id}>
                                    <Text>{item?.valueName}</Text>
                                </MenuItem>
                            ))}
                        </MenuSelect> */}
                        {/* <MenuDoted
                            contentButton={<MoreVertIcon/>} 
                        >
                            <MenuItem>
                                <Link to='/chat'>
                                    <Text>چت با بیمار</Text>
                                </Link>
                            </MenuItem>
                            <MenuItem >
                                <Text>ثبت وضعیت</Text>
                            </MenuItem>
                            <MenuItem >
                                <Text>حذف</Text>
                            </MenuItem>
                        </MenuDoted> */}

                    </div>
                </div>
            ))}
            <div className='w-full flex justify-center mt-6'>
                {data?.length === 0 && <Text>درخواستی موجود نیست</Text>}
            </div>
        </div>
    )
}

export default RequestVisit
