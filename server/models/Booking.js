import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true,
        },
        hotelId:{
            type:String,
            required:true,
        },
        status:{
            type:String,
            default:"active",
        },
        startDate:{
            type:Number,
            required:true,
        },
        endDate:{
            type:Number,
            required:true,
        },
        cost:{
            type:Number,
            required:true,
        },
        room:{
            type:Number,
            required:true,
        },
     
    },{
        timestamps:true
    }
)

const Booking = mongoose.model("Booking",BookingSchema)
export default Booking