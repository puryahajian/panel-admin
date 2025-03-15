import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import '../../App.css'
import { Box, Rating } from '@mui/material';

const labels = {
    0.5: '0.5',
    1: '1',
    1.5: '1.5',
    2: '2',
    2.5: '2.5',
    3: '3',
    3.5: '3.5',
    4: '4',
    4.5: '4.5',
    5: '5',
};

function StarFeedback({rating}) {
    const value = rating || 3;

    return (
        <Box sx={{ width: 'max-content', display: 'flex', alignItems: 'center', direction: 'ltr'}}>
            <Rating
                value={value}
                readOnly
                precision={rating || value}
                sx={{fontSize: '14px'}}
                emptyIcon={
                    <StarIcon style={{ opacity: 0.55 , color: '#ccc'}} fontSize="inherit" />
                }
            />
            <Box sx={{ ml: 1, color: 'white', fontSize: '10px' }}>{labels[value]}</Box>
        </Box>
    )
}

export default StarFeedback
