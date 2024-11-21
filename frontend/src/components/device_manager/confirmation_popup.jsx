import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Function_button from '../shared/function_button';

export default function ConfirmationPopup({ triggerButton, onConfirm }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e) => {
    e.stopPropagation(); // Prevent grid or parent events from interfering
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <>
      {React.cloneElement(triggerButton, { onClick: handleClickOpen })}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="confirm delete popup"
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>
          Delete Item
        </DialogTitle>
        <DialogContent>
          <DialogContentText 
            id="alert-dialog-description" 
            sx={{ textAlign: 'center' }}
          >
            Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Function_button 
            onClick={handleConfirm} 
            autoFocus
            size='medium'
            text='Yes'
          >
          </Function_button>
          <Function_button
            onClick={handleClose}
            size='medium'
            text='No'
            >
          </Function_button>
        </DialogActions>
      </Dialog>
    </>
  );
}
