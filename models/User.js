import mangoose from "mongoose";

const userSchema = new mangoose.Schema({
    _id:{ type : String, required:true },
    name: {type : String, required:true },
    email: {type : String, required:true, unique:ture },
    imageUrl: {type : String, required:true },
    cartItems: {type:Object, default:{} }
},{minimize:false})

const User = mangoose.models.user || mangoose.model("user",userSchema)
export default User