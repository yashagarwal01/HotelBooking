import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    snackbar:{
        open:false,
        message:"",
        severity:"success",
    },
}

export const globalSlice = createSlice({
    name:"global",
    initialState,
    reducers:{
        setSnackbar:(state,action)=>{
            state.snackbar={...state.snackbar,...action.payload.snackbar}
        },
       
      
    }
   
})


export const {setSnackbar} = globalSlice.actions
export default globalSlice.reducer