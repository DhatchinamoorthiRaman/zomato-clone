import mongoose, { Schema, Document } from "mongoose";
import {ireply,ireview} from "../interface/review.interface"
 

const replySchema = new mongoose.Schema<ireply>({
    UserId: { type: String, required: true },
    Name: { type: String, required: true },
    Feedback: { type: String },
    Vote: { type: Number },
    Reply: { type: [new Schema<ireply>()], default: [] }
  }, { timestamps: true });

  
const reviewSchema = new mongoose.Schema<ireview>(
    {
        UserId: { type: String, required: true },
        Name:{ type: String, required: true },
        HotelId: { type: String, required: true },
        Feedback: { type: String, required: true },
        Post:{type:String},
        Reply: { type: [replySchema] },
        Vote: { type: Number }
    },
    { timestamps: true }
)
const Review = mongoose.model<ireview>("reviews",reviewSchema);

export{Review};