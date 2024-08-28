import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";

export const createBooking = async (req, res) => {
  try {
    
    const startDate = new Date(req.body.startDate).getTime();
    const endDate = new Date(req.body.endDate).getTime();
    const bookingDetails = {
      ...req.body,
      startDate: startDate,
      endDate: endDate,
    };
    const newBooking = new Booking(bookingDetails);
    const savedBooking = await newBooking.save();
    res.status(200).json(savedBooking);
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message, message: "Something went Wrong" });
  }
};

export const getBookings = async (req, res) => {
  try {
    const id = req.headers["id"];
    const bookings = await Booking.find({
      userId: id,
    });
    if (bookings?.length === 0) {
      res.status(200).json(bookings);
    }
    else{
        const formatedBookings = await Promise.all(
            bookings?.map(async (el) => {
                const hotel = await Hotel.findOne({
          _id: el.hotelId,
        });
        
        const newBook = {
          _id: el._id,
          startDate: el.startDate,
          endDate: el.endDate,
          cost: el.cost,
          room: el.room,
          status: el.status,
          hotelName: hotel?.hotelName,
          location: hotel?.location,
          image: hotel?.image,
        };
        return newBook;
    })
    );
    res.status(200).json(formatedBookings);
}
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message, message: "Something went Wrong" });
  }
};

export const cancelBooking = async(req,res)=>{
    try{
        const {id} = req.params
        
        const canceled = await Booking.findOneAndUpdate(
            { _id: id },
            { status: "inactive" },
            {
              new: true,
            }
          );
        await canceled.save()
        
        res.status(200).json(canceled)  

    }
    catch(err)
    {
        res
        .status(500)
        .json({ error: err.message, message: "Something went Wrong" });
    }

}
