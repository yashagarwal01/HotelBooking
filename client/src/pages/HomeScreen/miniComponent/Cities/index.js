import React from "react";
import { Box, Typography } from "@mui/material";
import "./cities.css";
import { Grid } from "@mui/material";
import { POPULAR_CITIES } from "../../utility";
import {useNavigate} from "react-router-dom"
import { APP_ROUTE } from "../../../../navigation/routes/appRoutes";

const Cities = () => {
  const navigate = useNavigate()
  const handleClick = (name)=>()=>{
    
    navigate(APP_ROUTE.searchHotel,{state:name})
  }
  return (
    <Grid container spacing={2}>
      {POPULAR_CITIES?.map((el,index) => {
        return (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <div className="card-wrapper">
              <img className="card-image" src={el.image} alt="loading..." onClick={handleClick(el.name)} />
              <Typography variant="subtitle1" sx={{color:"GrayText",mt:1 }}>
                {el.name} 
              </Typography>
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Cities;

