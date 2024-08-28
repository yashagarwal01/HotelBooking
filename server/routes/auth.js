import express from "express"
import {adminLogin,userRegister,userLogin} from "../controllers/auth.js"

const router = express.Router()

router.post("/adminLogin",adminLogin)
router.post("/userLogin",userLogin)
router.post("/userRegister",userRegister)

export default router