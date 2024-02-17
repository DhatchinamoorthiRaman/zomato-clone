import mongoose ,{Document} from "mongoose";
import validator from "validator";
import {iuser,iblog,iAddress,inetwork} from "../../interface/user/user.interface"
import {AddressSchema} from "../hotel"

const blogSchema = new mongoose.Schema<iblog>({
    Image:{type:[String]},
    Content:{type:String},
}) 

const addressSchema = new mongoose.Schema<iAddress>({
    AddressfromMap:{type:AddressSchema,required:true},
    AddressfromUser:{type:String,required:true},
    Floor:{type:String},
    Landmark:{type:String},
    Type:{type:String,required:true},

})

const networkSchema = new mongoose.Schema<inetwork>({
    Followers:{type:[String]},
    Followings:{type:[String]},
})

const userSchema = new mongoose.Schema<iuser>({
    Name: { 
        type: String,
        required: [true, "please enter your name"],
    },
    Email: {
        type: String,
        required: [true, "please enter the email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "please enter valid email"],
    },
    City:{type:String,default:null},
    GoogleId: { type: String ,default:null},
    ProfilePic: { type: String ,default:null},
    MobileNo: { type: String ,default:null},
    Description: { type: String ,default:null },
    Handle: { type: [String] ,default:null}, 
    Website: { type: String ,default:null},
    Photos: { type: [String],default:null },
    Recently_Viewed: { type: [String],default:null },
    Bookmarks: { type: [String] ,default:null},
    Blog_Posts: { type: [blogSchema],default:null },
    Address:{type:[addressSchema],default:null},
    Network:{type:networkSchema,default:null},
      

},
    { timestamps: true }
)

const Users = mongoose.model<iuser>("users",userSchema);
export{Users};