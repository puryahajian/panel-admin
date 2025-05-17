import React from 'react'
import Text from '../../atoms/text'
import ButtonGeneral from '../../atoms/button-general'
import { useNavigate } from 'react-router-dom'
import UseGetTicketPage from '../../db/use-get-ticket-page';

function HeaderTicket() {
    const navigate = useNavigate();
    const { data } = UseGetTicketPage();

    return (
        <div className='flex justify-between items-center'>
            <Text>{data?.title}</Text>

            <ButtonGeneral className={`bg-customBlue border-none text-white`} onClick={() => navigate('/')}>بازگشت</ButtonGeneral>
        </div>
    )
}

export default HeaderTicket
