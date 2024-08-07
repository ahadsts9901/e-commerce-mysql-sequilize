import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Alert({ isLoading, open, setOpen, title, description, fun }: any) {

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent><DialogContentText id="alert-dialog-description">{description}</DialogContentText></DialogContent>
                <DialogActions sx={{ paddingBottom: "24px", paddingRight: "24px" }}>
                    <Button
                        sx={{ padding: "2px" }}
                        onClick={() => setOpen(false)} disabled={isLoading}>No</Button>
                    <Button
                        sx={{ padding: "2px" }}
                        variant="contained" color="primary"
                        onClick={() => fun()} autoFocus disabled={isLoading}>Yes</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}