import mongoose from "mongoose";
import {itoken} from "../../interface/user/token.interface"


const refreshTokenSchema = new mongoose.Schema<itoken>({
    _id:{
        type:String,
        required:true,
    },
    accessToken:{
        type:String,
        required:true
    }
})

const Token = mongoose.model<itoken>("tokens",refreshTokenSchema);
export{Token};