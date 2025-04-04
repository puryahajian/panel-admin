import React from 'react'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

function Ratiing({value}) {

    return (
        <Rating name="read-only" value={value} readOnly />
    )
}

export default Ratiing
