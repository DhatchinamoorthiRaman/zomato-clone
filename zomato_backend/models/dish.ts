import mongoose ,{Document} from "mongoose";
import {idish} from "../interface/dish.interface"

const dishSchema = new mongoose.Schema<idish>(
    {
        Name: { type: String, required: true },
        Category:{type:String,required:true,default:"Dish"},
        Available_Hotels: { type: [String], required: true },
        Images: { type: String, required: true }
    },
    {timestamps:true}
)

const Dish = mongoose.model<idish>("dish_catlog",dishSchema);
export{Dish};