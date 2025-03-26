import React from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import '../../App.css'

function MenuAutoComplete({options, onChange}) {
    return (
        <Autocomplete
            disablePortal
            className='w-full bg-bgInput mt-2 !outline-none rounded-lg overflow-hidden !border-none'
            options={options}
            onChange={onChange}
            renderInput={(params) => <TextField className='border-none outline-none' {...params} />}
        />
    )
}

export default MenuAutoComplete
