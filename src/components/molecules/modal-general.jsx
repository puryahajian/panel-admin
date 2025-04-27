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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  textAlign: 'center',
  bgcolor: 'background.paper',
  boxShadow: 24,
  padding: '16px',
  borderRadius: '16px'
};

const GeneralModal = ({ open, handleClose, title, children, actionText, actionHandler, onSubmit, classBtn }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
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
    <Fade in={open}>
        <Box sx={style}>
          <form action="">
            <Text id="transition-modal-title">
                {title}
            </Text>
            {/* <Typography id="transition-modal-description" sx={{ mt: 2 }}> */}
                {children}
            {/* </Typography> */}
            <div className={classBtn}>
              <Box mt={2} display="flex" gap="16px" justifyContent="space-between" >
                {actionText && <ButtonGeneral className={`bg-customBlue text-white border-none w-full`} variant="contained" onClick={actionHandler}>{actionText}</ButtonGeneral>}
                <ButtonGeneral className={` border border-red-600 text-red-600 w-full`} variant="outlined" onClick={handleClose}>خیر</ButtonGeneral>
              </Box>
            </div>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default GeneralModal;
