interface ireply  {
    UserId: String,
    Name:String,
    Feedback: String,
    Vote: Number,
    Reply:ireply[],

}
interface ireview {
    UserId: string,
    Name:String,
    HotelId: string,
    Feedback: string,
    Post:String,
    Reply: ireply[],
    Vote: Number

}

export{ireply,ireview}
