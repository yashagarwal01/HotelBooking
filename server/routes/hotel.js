import express from "express"
import {createHotel,getHotel,updateHotel,deleteHotel,getHotelByCity} from "../controllers/hotel.js"
import { verifyAdminToken } from "../middleware/auth.js"

const router = express.Router()

router.get("/getHotel",verifyAdminToken,getHotel)
router.get("/getHotel/:location",getHotelByCity)
router.post("/createHotel",verifyAdminToken,createHotel)
router.post("/updateHotel",verifyAdminToken,updateHotel)
router.post("/deleteHotel",verifyAdminToken,deleteHotel)

export default router