import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { setSnackbar } from '../../store/global/globalReducer';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {delete_hotel} from "../../api/hotel"
import { useSelector } from "react-redux";
import {getToken} from "../../store/auth/authSelector"
import Loader from "../../components/Loader"

const DeleteDialog=(props)=> {
  const { open, handleClose,  rowData,getHotels } = props;
  const [isLoading,setIsLoading]=useState(false)
  const token = useSelector(getToken)

  const dispatch=useDispatch()
  const handleDelete = async()=>{
    try {
        setIsLoading(false)
      const response = await delete_hotel({_id:rowData._id},token)
     getHotels()
      handleClose()
      dispatch(
        setSnackbar({
          snackbar: {
            open: true,
            message: response?.data?.message,
            severity: "success",
          },
        }))
      
    } catch (err) {
      dispatch(
        setSnackbar({
          snackbar: {
            open: true,
            message: err.response.status===404?"Something Went Wrong":err.response.data.message,
            severity: "error",
          },
        })
      );
    }

  }  

  return (
    isLoading ? <Loader />:

      (

        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are You Sure You Want To Remove This Hotel
          </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Button  onClick={handleDelete}>OK</Button>
        <Button onClick={handleClose} color='error' variant='contained' autoFocus>
        CANCEL
        </Button>
        </DialogActions>
        </Dialog>
        
      
      )
  );
}

export default DeleteDialog