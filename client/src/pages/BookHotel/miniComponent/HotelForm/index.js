import React, { useEffect } from "react";
import "./hotelForm.css";
import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import addDays from "date-fns/addDays";
import { TextField, Typography,useMediaQuery } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {setSnackbar} from "../../../../store/global/globalReducer"
import {useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux";
import {create_booking} from "../../../../api/booking"
import {APP_ROUTE} from "../../../../navigation/routes/appRoutes"
import { getUserData,getToken } from "../../../../store/auth/authSelector";
import {useSelector} from "react-redux"




const HotelForm = ({ maxRoom, price ,id}) => {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const token =useSelector(getToken)
  const user = useSelector(getUserData);

  const [amount, setAmount] = useState(0);
  const [room, setRoom] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const isMobileScreens = useMediaQuery("(max-width: 500px)");
  const dispatch = useDispatch()
  const handleDateChange = (e) => {
    setDate([e.selection]);
  };

  const handleDayChange = (e) => {
    if (maxRoom >= Number(e.target.value)) {
      setRoom(Number(e.target.value));
    }
  };

  const handleBooking = async () => {
    try {
      setIsLoading(true)
      console.log(user)
      const value={
        userId:user._id,
        hotelId:id,
        startDate:date[0]?.startDate,
        endDate:date[0]?.endDate,
        cost:amount,
        room
      }

      const response = await create_booking(value,token);
      navigate(APP_ROUTE.myBookings)

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
  };

  useEffect(() => {
    const diffTime = Math.abs(date[0].endDate - date[0].startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const newAmount = diffDays * price * room;
    setAmount(newAmount);
  }, [room, date, price]);
  return (
    <div className="hotel-form">
      <DateRange
        onChange={handleDateChange}
        rangeColors={["#d2164d"]}
        months={isMobileScreens?1:2}
        ranges={date}
        direction="horizontal"
        minDate={new Date()}
      />
      <TextField
        sx={{ width: "50%" }}
        autoFocus
        onChange={handleDayChange}
        value={room}
        label="No of Rooms"
        placeholder="0"
      />
      <Typography variant="body2" color="text.secondary">
        Note: Maximum Rooms available are {maxRoom}{" "}
      </Typography>
      {amount !== 0 && (
        <Typography sx={{ mt: 4 }} variant="h6" color="primary">
          Total Amount : Rs{amount}{" "}
        </Typography>
      )}
      {amount !== 0 && (
        <LoadingButton className="loading-button" loading={isLoading} onClick={handleBooking} variant="contained">
          confirm booking
        </LoadingButton>
      )}
    </div>
  );
};

export default HotelForm;
