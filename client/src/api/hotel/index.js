import {BASE_URL} from "../common/constant"
import axios from "axios"
const endpoints ={
    getHotel:"/hotel/getHotel/",
    deleteHotel:"/hotel/deleteHotel",
    createHotel:"/hotel/createHotel",
    updateHotel:"/hotel/updateHotel",
    
}


export const get_hotel_by_city = async(value)=>{

      const response = await axios.get(BASE_URL + endpoints.getHotel+value);
    return response

}
export const get_hotel = async(token)=>{

      const response = await axios.get(BASE_URL + endpoints.getHotel,{headers:{Authorization:`Bearer ${token}`}});
    return response

}

export const delete_hotel = async(value,token)=>{
  const response = await axios.post(BASE_URL + endpoints.deleteHotel,value,{headers:{Authorization:`Bearer ${token}`}});
    return response
}
export const create_hotel = async(value,token)=>{
  const response = await axios.post(BASE_URL + endpoints.createHotel,value,{headers:{Authorization:`Bearer ${token}`}});
    return response
}
export const update_hotel = async(value,token)=>{
  const response = await axios.post(BASE_URL + endpoints.updateHotel,value,{headers:{Authorization:`Bearer ${token}`}});
    return response
}