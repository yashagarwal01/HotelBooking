import React, { useEffect, useState } from 'react'
import "./myBooking.css"
import BookingCard from './miniComponent/BookingCard'
import {useSelector} from "react-redux"
import {getUserData,getToken} from "../../store/auth/authSelector"
import { get_booking } from '../../api/booking'
import {setSnackbar} from "../../store/global/globalReducer"
import { useDispatch } from 'react-redux'
import Loader from "../../components/Loader"
import NotFound from "../../components/NotFound"
import { isArray } from 'lodash'

const MyBooking = () => {
  const [isLoading,setIsLoading] = useState(false)
  const token =useSelector(getToken)

  const user = useSelector(getUserData)
  const [bookingData,setBookingdata] = useState([])
  const dispatch = useDispatch()
  const getBooking = async()=>{
    try {
      setIsLoading(true)
      const response = await get_booking(user?._id,token);
      if(isArray(response.data)) {
        setBookingdata(response?.data?.reverse())
      }
    } catch (err) {
      dispatch(
        setSnackbar({
          snackbar: {
            open: true,
            message: err?.response?.data?.message,
            severity: "error",
          },
        })
      );
    }
    finally{
      setIsLoading(false)

    }

  }
  useEffect(()=>{
    getBooking()
  },[])
  return (
    <div className='my-booking-container' >
    {
      isLoading?<Loader/>:
      bookingData.length===0?<NotFound text = "No Bookings Made Yet"/>:
        bookingData?.map((data,index)=>  <BookingCard key={index} data={data} /> )
      
    }
    
    
    </div>
  )
}

export default MyBooking