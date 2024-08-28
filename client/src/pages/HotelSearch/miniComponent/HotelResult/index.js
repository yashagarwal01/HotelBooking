import React from "react";
import { Grid } from "@mui/material";
import HotelCard from "../../miniComponent/HotelCard";
import "../../hotelSearch.css";
import NotFound from "../../../../components/NotFound"

const HotelResult = (props) => {
  const { query, data } = props;
  return (
    <div className="hotel-result">
    {
      query &&(data.length === 0?<NotFound text="No Match Found" />:
      <Grid
      className="hotel-search-result"
      container
      rowSpacing={5}
      spacing={2}
      >
      {
        data?.map((el)=>{
          return(

            <Grid item xs={12} sm={6} md={4} lg={3}>
            <HotelCard hotel={el} />
            </Grid>
            )
        })
      }
      
      
      </Grid>)
    }
      
    </div>
  );
};

export default HotelResult;
