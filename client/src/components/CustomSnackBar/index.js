import * as React from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { setSnackbar } from "../../store/global/globalReducer";
import { useSelector,useDispatch } from 'react-redux';
import {getSnackbar} from "../../store/global/globalSelectors"


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomSnackbar() {
  const snackbar = useSelector(getSnackbar)
  const dispatch = useDispatch()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(
      setSnackbar({
        snackbar:{
          open:false,
          message:"",
          severity:snackbar.severity
        }
      }))
  };

  return (
    
      <Snackbar open={snackbar.open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
     
  );
}