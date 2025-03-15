import React from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import '../../App.css';

function TitleIconNotif({contentButton, children}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                className='min-w-0 !text-customBlue'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {contentButton}
                <div className='w-2 h-2 rounded-full absolute top-3 right-5 bg-red-500'/>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                {children}
            </Menu>
        </div>
    )
}

export default TitleIconNotif
