import React from "react";
import { useLocation } from "react-router-dom";
import "./bookHotel.css"
import HotelDescription from "./miniComponent/HotelDescription";
import HotelForm from "./miniComponent/HotelForm";
const BookHotel = () => {
  const { state } = useLocation();
  return( <div className="book-hotel-container">
    <HotelDescription state={state} />
    <HotelForm maxRoom = {state?.maxRoom} price={state?.price} id={state?._id}  />
  </div>);
};

export default BookHotel;
