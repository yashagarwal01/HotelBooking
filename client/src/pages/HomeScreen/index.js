import React from "react";
import { Box,  Typography } from "@mui/material";
import "./homeScreen.css";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";
import Cities from "./miniComponent/Cities";
import {useNavigate} from "react-router-dom"
import { APP_ROUTE } from "../../navigation/routes/appRoutes";



const HomeScreen = () => {
  const navigate = useNavigate()
  const handleClick = ()=>{
    
    navigate(APP_ROUTE.searchHotel)
  }
  return (
    <div className="home-screen-container">
  
      <Box
        sx={{ borderColor: (theme) => theme.palette.primary.main }}
        className="home-screen-search"
        onClick={handleClick}
      >
        <BedroomParentIcon color="primary" />
        <div>Where Do You Want To Visit ?</div>
      </Box>
      <Typography className="home-screen-heading">Popular Cities</Typography>
      <div className="home-screen-popular-city-container">
        <Cities/>
      </div>
    </div>
  );
};

export default HomeScreen;
