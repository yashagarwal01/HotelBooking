import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./hotelCard.css"
import { useNavigate } from 'react-router-dom';
import { APP_ROUTE } from '../../../../navigation/routes/appRoutes';

export default function HotelCard(props) {
  const {hotel} = props
  const naviagte = useNavigate()
  const handleBooking = ()=>{
    naviagte(APP_ROUTE.bookHotel,{state:hotel})
  }
  return (
    <Card className='hotel-card-container'>
      <CardMedia
        className='hotel-card-image'
        image={hotel.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {hotel.hotelName}
        </Typography>
       
        <Typography variant='subtitle1'>
        {hotel.location}

        </Typography>
        <Typography variant="body2" color="text.secondary">
        Rs {hotel.price} per night
        </Typography>
      </CardContent>
      <CardActions className='hotel-card-action' >
       
        <Button variant='contained' onClick={handleBooking} size="small">Book Now</Button>
      </CardActions>
    </Card>
  );
}