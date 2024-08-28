import React, { useState } from "react";
import "./bookingCard.css";
import { Box,  useMediaQuery } from "@mui/material";
import { cancel_booking } from "../../../../api/booking";
import { setSnackbar } from "../../../../store/global/globalReducer";
import { useDispatch } from "react-redux";
import { LoadingButton } from "@mui/lab";
import {getToken} from "../../../../store/auth/authSelector"
import {useSelector} from "react-redux"


const BookingCard = (props) => {
  const { data } = props;
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [isLoading, setIsLoading] = useState(false);
  const cancel = data?.status === "inactive"
  const [cancelled,setCancelled] = useState(cancel)
  const dispatch = useDispatch();
  const token = useSelector(getToken)

  const cancelBooking = async () => {
    try {
      setIsLoading(true);
      const response = await cancel_booking(data?._id,token);
      setCancelled(true)
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
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Box boxShadow={3} className={cancelled?"booking-card disable-card":"booking-card"}>
      <Box display="flex">
        <img
          src={data?.image}
          className="booking-card-image"
          alt="Loading..."
        />
        <div>
          <div className="booking-card-name">{data?.hotelName}</div>
          <div className="booking-card-detail"> {data?.location}</div>
          <div className="booking-card-detail">
            Rooms Booked :- {data?.room}
          </div>
          <div className="booking-card-amount"> Rs {data?.cost}</div>
        </div>
      </Box>
      <LoadingButton
        size={isMobile ? "small" : "medium"}
        disabled={cancelled}
        loading={isLoading}
        onClick={cancelBooking}
        variant="contained"
      >
        {cancelled ? "Cancelled" : "Cancel"}
      </LoadingButton>
    </Box>
  );
};

export default BookingCard;
