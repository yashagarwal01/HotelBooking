import express from "express"
import {createBooking,getBookings,cancelBooking} from "../controllers/booking.js"
import {verifyToken} from "../middleware/auth.js"

const router = express.Router()

router.get("/",verifyToken,getBookings)
router.post("/createBooking",verifyToken,createBooking)
router.get("/cancel/:id",verifyToken,cancelBooking)


export default router