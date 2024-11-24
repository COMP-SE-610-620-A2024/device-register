import React, { forwardRef, useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Function_button from '../shared/Function_button';

const ConfirmationPopup = forwardRef(({ renderTrigger, onConfirm, dialogTitle, dialogText }, ref) => {
  const [open, setOpen] = useState(false);

  // Expose open/close methods to parent
  useImperativeHandle(ref, () => ({
    openPopup: () => setOpen(true),
    closePopup: () => setOpen(false),
    isOpen: () => open, 
  }));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {renderTrigger({
        onClick: handleClickOpen,
      })}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ textAlign: 'center' }}>
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Function_button onClick={handleConfirm} autoFocus size="medium" text="Yes" color="error" />
          <Function_button onClick={handleClose} size="medium" text="No" />
        </DialogActions>
      </Dialog>
    </>
  );
});

ConfirmationPopup.propTypes = {
  renderTrigger: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  dialogTitle: PropTypes.string.isRequired,
  dialogText: PropTypes.string,
};

ConfirmationPopup.displayName = 'ConfirmationPopup';
export default ConfirmationPopup
