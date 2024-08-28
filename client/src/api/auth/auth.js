import {BASE_URL} from "../common/constant"
import axios from "axios"
const endpoints ={
    userRegister:"/auth/userRegister",
    userLogin:"/auth/userLogin",
    adminLogin:"/auth/adminLogin",
}

export const user_register = async(values)=>{
      const response = await axios.post(BASE_URL + endpoints.userRegister, values);
    return response

}

export const user_login = async(values)=>{
    const response = await axios.post(BASE_URL + endpoints.userLogin, 
        values
      );
      return response
}
export const admin_login = async(values)=>{
    const response = await axios.post(BASE_URL + endpoints.adminLogin, 
        values
      );
      return response
}