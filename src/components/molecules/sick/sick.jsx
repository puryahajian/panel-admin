import React, { useState } from 'react'
import Text from '../../atoms/text'
import ButtonGeneral from '../../atoms/button-general'
import GeneralModal from '../modal-general';
import UseGetVisitList from '../../db/use-get-visit-list';
import moment from 'jalali-moment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuDoted from '../../menu-doted';
import { MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import Ratiing from '../../atoms/ratting';

function Sick() {
    const { data } = UseGetVisitList();
    const [openSeeComment, setSeeComment] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    
    const selectedItem = data?.find((item) => item?.id === selectedId);
    
    const handleOpenComments = (id) => {
        setSelectedId(id);
        setSeeComment(true);
    };

    return (
        <div>
            <Text>بیماران</Text>

            <div className='flex py-4 bg-gray-100 rounded-lg px-2 mt-2'>
                <div className='w-2/3 grid grid-cols-6'>
                    <Text>ردیف</Text>
                    <Text className={`col-span-2 border-r border-gray-500 pr-2`}>نام</Text>
                    <Text className={`border-r border-gray-500 pr-2`}>تاریخ و ساعت</Text>
                </div>
                {/* <div className='w-1/3 text-left'>
                    <Text className={`ml-10`}>وضعیت</Text>
                </div> */}
            </div>

            {data?.map((item, index) => (
                <div key={item?.id} className='flex py-4 bg-gray-100 rounded-lg px-2 mt-2 items-center'>
                    <div className='w-3/4 grid grid-cols-6 items-center'>
                        <Text>{index + 1}</Text>
                        <Text className={`col-span-2`}>{item?.user}</Text>
                        <Text>{moment(item?.created_at).locale('fa').format('YYYY/MM/DD')}</Text>
                        <ButtonGeneral onClick={() => handleOpenComments(item?.id)} className={`cursor-pointer bg-customBlue border-transparent text-white`}>
                            نظرات
                        </ButtonGeneral>
                    </div>
                    <div className='w-4/12 text-left flex justify-end gap-2'>
                        <MenuDoted
                            contentButton={<MoreVertIcon/>} 
                        >
                            <MenuItem>
                                <Link to={`/chat/${item?.id}`}>
                                    <Text>چت با بیمار</Text>
                                </Link>
                            </MenuItem>
                            <MenuItem >
                                <Text>حذف</Text>
                            </MenuItem>
                        </MenuDoted>
                    </div>
                </div>
            ))}

            <GeneralModal
                open={openSeeComment}
                handleClose={(e) => {
                    e.preventDefault();
                    setSeeComment(false)
                }}
                title="نظرات"
                actionText="بستن"
                className={`hidden`}
                actionHandler={(e) => { 
                    e.preventDefault();
                    setSeeComment(false); 
                }}
            >
                <div className='border-b p-2 flex justify-between'>
                    <Text>{selectedItem?.comment}</Text>
                    <Ratiing value={selectedItem?.user_rate}/>
                </div>
            </GeneralModal>
        </div>
    )
}

export default Sick
