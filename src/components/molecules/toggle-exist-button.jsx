import { useState } from 'react';
import ButtonGeneral from '../atoms/button-general';

function ToggleExistButton({onClick, exist}) {

    return (
        <ButtonGeneral
            onClick={onClick}
            className={` !py-[5px] ${exist ? '' : 'bg-red-500 text-white border-transparent'}`}
        >
            {exist ? 'موجود' : 'ناموجود'}
        </ButtonGeneral>
    );
}

export default ToggleExistButton
