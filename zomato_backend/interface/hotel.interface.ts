import { Document } from "mongoose";


interface ivariety extends Document {
  Name: string;
  Price: Number;
  Rating: Number;
  Images: String;
  Vote: Number;
}
interface idish extends Document {
  Name: string;
  Variety: ivariety[];
  Price: Number;
  Rating: Number;
  Images: String;
  Vote: Number;
}
interface ireview extends Document {
  userId: string;
  comments: string;
  Rating: number;
}
interface iaddress extends Document {
  Latitude: string;
  Longitude: string;
  Country: string;
  Sub_Location: string;
  Pincode: string;
  Location: string;
  State: string;
}
interface islots extends Document {
  opensAt: string;
  closesAt: string;
}
interface ioperational_hrs extends Document {
  Monday: islots[];
  Tuesday: islots[];
  Wednesday: islots[];
  Thursday: islots[];
  Friday: islots[];
  Saturday: islots[];
  Sunday: islots[];
}
interface iimage extends Document {
  Menu: string[];
  Food: string[];
  Res_Image: string[];
}
interface ihotel extends Document {
  Name: string;
  Category: string;
  Pure_veg: string;
  Type: string;
  Address: iaddress;
  ContactNo: string;
  Approval_Status: string;
  Owner: string;
  // Images:string[];
  Images: iimage;
  Outlet: string[];
  Cuisines: string[];
  Delievery_Rating: Number;
  Dining_Rating: Number;
  Cost_Per_Person: Number;
  Review: ireview[];
  // Opening:string;
  // Working_days:string;
  Operational_Hrs: ioperational_hrs;
  Dishes: idish[];
}

export{ivariety,idish,ireview,iaddress,islots,ioperational_hrs,iimage,ihotel}