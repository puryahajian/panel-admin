import { Drawer } from '@mui/material';
import React from 'react';

const OffcanvasMenu = ({ onClose, contentButton, isOpen, children }) => {
    return (
        <div>
            {/* دکمه باز کردن */}
            <button onClick={onClose}>
                {contentButton}
            </button>

            {/* Drawer از MUI */}
            <Drawer
                anchor="right"
                open={isOpen}
                onClose={onClose}
            >
                {/* دکمه بستن */}
                <button
                    onClick={onClose}
                    className="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
                >
                    &#x2715;
                </button>
                
                {/* محتوای داخلی */}
                <div className="p-4">
                    {children}
                </div>
            </Drawer>
        </div>
    );
};

export default OffcanvasMenu;
