import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ButtonGeneral from '../atoms/button-general';
import TextBold from '../atoms/text-bold';
import Text from '../atoms/text';

const GeneralModal = ({ open, handleClose, title, children, actionText, actionHandler, classAccept,classReject , sx, exitButton}) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className='!outline-none'
      sx={{outline: 'none'}}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
    <Fade in={open} className='outline-none'>
        <Box sx={{outline: 'none' , position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', minWidth: '500px', maxWidth: '1200px', width: 'max-content', bgcolor: 'background.paper', boxShadow: 24, padding: '16px', borderRadius: '16px'}}>
          <form>
            <Text id="transition-modal-title">
                {title}
            </Text>
            {/* <Typography id="transition-modal-description" sx={{ mt: 2 }}> */}
                {children}
            {/* </Typography> */}
            <Box mt={2} sx={{ justifyContent: 'space-between', gap: '16px', display: 'flex', ...sx }}>
                {actionText && <ButtonGeneral className={`bg-customBlue text-white border-none w-full ${classAccept}`} variant="contained" onClick={actionHandler}>{actionText}</ButtonGeneral>}
                <ButtonGeneral className={` border border-red-600 text-red-600 w-full ${classReject}`} variant="outlined" onClick={handleClose}>{exitButton ? exitButton : 'خیر'}</ButtonGeneral>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default GeneralModal;
