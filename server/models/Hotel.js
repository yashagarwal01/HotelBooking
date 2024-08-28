import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema(
    {
        hotelName:{
            type:String,
            required:true,
            min:2,
            max:50,
        },
        location:{
            type:String,
            required:true,
            max:50,
        },
        price:{
            type:Number,
            required:true,
        },
        maxPerson:{
            type:Number,
            required:true,
        },
        status:{
            type:String,
            default:"active",
        },
        description:{
            type:String,
            required:true,
        },
        image:{
            type:String,
            required:true,
        },
        maxRoom:{
            type:Number,
            required:true,
        },
     
    },{
        timestamps:true
    }
)

const Hotel = mongoose.model("Hotel",HotelSchema)
export default Hotel