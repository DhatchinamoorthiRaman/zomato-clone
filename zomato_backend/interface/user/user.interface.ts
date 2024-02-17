import {iaddress} from "../hotel.interface"
interface iAddress {
    AddressfromMap:iaddress,
    AddressfromUser:string,
    Floor?:string,
    Landmark?:string,
    Type:string

}
interface iuser{
    _id:string,
    Name : String,
    Email : String,
    City?:String,
    GoogleId?: String,
    ProfilePic?: String,
    MobileNo?:String,
    Description?:String,
    Handle?:String[],
    Website?:String,
    Photos?:String[],  
    Recently_Viewed?:String[];
    Bookmarks?:String[];
    Blog_Posts?:iblog[];
    Address?:iAddress[];
    Network?:inetwork;
}

interface iblog {
    Image:String[];
    Content:String;
}
interface inetwork{ 
    Followers:String[];
    Followings:String[];
}

export{iuser,iblog,iAddress,inetwork} 