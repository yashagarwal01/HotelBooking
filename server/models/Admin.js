import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
    {
        userName:{
            type:String,
            required:true,
            min:2,
            max:50,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            max:50,
        },
        password:{
            type:String,
            required:true,
            min:5,
        },
        isAdmin:{
            type:Boolean,
            default:true
        },
     
    },{
        timestamps:true
    }
)

const Admin = mongoose.model("Admin",AdminSchema)
export default Admin