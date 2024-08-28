import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    token: '',
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            state.user = action.payload.user
            state.token = action.payload.token
        },
        setLogout:(state)=>{
            state.user = {}
            state.token = ""
        },
      
    }
   
})


export const {setLogin,setLogout} = authSlice.actions
export default authSlice.reducer