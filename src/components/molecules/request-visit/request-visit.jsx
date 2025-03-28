import React from 'react'
import Text from '../../atoms/text'
import ButtonGeneral from '../../atoms/button-general'
import MenuSelect from '../menu-select'
import { MenuItem } from '@mui/material'
import MenuDoted from '../../menu-doted'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../../../App.css'
import { Link } from 'react-router-dom'

function RequestVisit() {
    const name = [
        {id: 1, valueName: 'تایید'},
        {id: 2, valueName: 'لغو'},
    ]
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

            <div className='flex py-4 bg-gray-100 rounded-lg px-2 mt-2 items-center'>
                <div className='w-4/5 grid grid-cols-6'>
                    <Text>1</Text>
                    <Text className={`col-span-2  pr-2`}>lorem ipsum</Text>
                    <Text className={` pr-2`}>123456</Text>
                </div>
                <div className='w-max text-left mx-8  flex'>

                    <MenuSelect defaultValue={name[0].id} className={`!rounded-lg`}>
                        {name.map((item) => (
                            <MenuItem key={item.id} className='font-sans' value={item.id}>
                                <Text>{item?.valueName}</Text>
                            </MenuItem>
                        ))}
                    </MenuSelect>
                    <MenuDoted
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
                    </MenuDoted>

                </div>
            </div>
        </div>
    )
}

export default RequestVisit
