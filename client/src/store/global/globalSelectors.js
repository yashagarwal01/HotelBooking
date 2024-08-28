
export const getSnackbar = (state) => {
    
    return state?.global?.snackbar ||{open:false,message:"",severity:"success"};
}


