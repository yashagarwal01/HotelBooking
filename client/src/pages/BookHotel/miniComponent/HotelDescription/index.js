import React from "react";
import "./hotelDescription.css";
import { Typography, Box } from "@mui/material";

const HotelDescription = ({ state }) => {
  return (
    <div className="book-hotel-description">
      <img src={state?.image} className="bh-image" alt="loading..." />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <div className="bh-hotel-name">{state?.hotelName}</div>
        <div className="bh-hotel-price">Rs{state?.price} / Night</div>
      </Box>
      <Typography variant="h6" sx={{color:"#696464"}} >{state?.location}</Typography>
      <Typography variant="body2" color="text.secondary">
        {state?.description}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Note: Maximum {state?.maxPerson} Person are allowed in a room{" "}
      </Typography>
    </div>
  );
};

export default HotelDescription;
