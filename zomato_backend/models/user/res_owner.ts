import mongoose from "mongoose";
import {iowner} from "../../interface/user/res_owner.interface"

const ResOwnerSchema = new mongoose.Schema<iowner>({
    _id:{type:String,required:true},
    Name:{type:String,required:true},
    Email:{type:String,required:true},
    ContactNo:{type:String,required:true},
    Restaurants:{type:[String]},
})

const ResOwner = mongoose.model<iowner>("res_owner_details",ResOwnerSchema);
export{ResOwner};