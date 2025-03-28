import React, { useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../../App.css'

function MenuSelect({children, handleChange, value, defaultValue, className}) {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
            <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                className={`!outline-none w-28 !font-sans !text-sm ${className}`}
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={value}
                defaultValue={defaultValue}
                // label="/"
                onChange={handleChange}
            >
                {children}
            </Select>
    )
}

export default MenuSelect
