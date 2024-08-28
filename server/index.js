import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import mongoose from "mongoose"
import morgan  from "morgan"
import authRoutes from "./routes/auth.js"
import hotelRoutes from "./routes/hotel.js"
import bookingRoutes from "./routes/booking.js"

/* Configuration */ 
dotenv.config()
const app = express()
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(express.json({limit:"100mb",extended:true}))
app.use(express.urlencoded({limit:"100mb",extended:true}))
app.use(cors())


/* Routes */
app.use("/auth",authRoutes)
app.use("/hotel",hotelRoutes)
app.use("/booking",bookingRoutes)





/* Moongose */
const PORT = process.env.PORT || 3001
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    app.listen(PORT,()=>{console.log(`Server Port : ${PORT}`)})
}).catch((err)=>console.log(err))


