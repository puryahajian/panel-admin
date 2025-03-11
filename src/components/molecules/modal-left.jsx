import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

export default function ModalLeft({ children, open, onClose }) {
    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <Box sx={{ width: 320 }} role="presentation">
                {children}
            </Box>
        </Drawer>
    );
}