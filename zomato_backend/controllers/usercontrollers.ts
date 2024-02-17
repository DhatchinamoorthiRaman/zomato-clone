import express,{Request,Response} from "express";
import {Review} from "../models/reviews"

import { Users } from "../models/user/user";
import { Hotels } from "../models/hotel";
import {bucket,upload,app} from "../utils/fileupload";
import { ref, getDownloadURL } from "firebase/storage";
import { getStorage } from 'firebase/storage';


async function userreviews(req:Request<{id:string},{},{},{}>,res:Response){ 
    const id = req.params.id;
    const review = await Review.find({UserId:id});
    res.status(200).json({review});
}
async function userphotos(req:Request<{id:string},{},{},{}>,res:Response){
    const id = req.params.id;
    const user = await Users.findOne({_id:id})
    res.status(200).json({photos:user.Photos});
}

async function usernetwork(req:Request<{id:string},{},{},{}>,res:Response){
    const id = req.params.id;
    const user = await Users.findOne({_id:id});
    const Followers = await Promise.all(user.Network.Followers.map(async(follower)=>{
        return await Users.findOne({_id:follower})
    }))
    const Followings = await Promise.all(user.Network.Followings.map(async(following)=>{
        return await Users.findOne({_id:following})
    }))
    res.status(200).json({Followers,Followings})
}

async function userbookmarks(req:Request<{id:string},{},{},{}>,res:Response){
    const id = req.params.id;
    const user = await Users.findOne({_id:id});
    const Bookmarks = await Promise.all(user.Bookmarks.map(async(id)=>{
        return await Hotels.findOne({_id:id});
    }))
    res.status(200).json({Bookmarks});
}

async function userblogposts(req:Request<{id:string},{},{},{}>,res:Response){
    const id = req.params.id;
    const user = await Users.findOne({_id:id})
    res.status(200).json({Blogposts:user.Blog_Posts});
}


async function useredit(req: Request<{ id: string }, {}, {Profile?:string, Name?: string, MobileNo?: string, City?: string, Description?: string, Handle?: string[], Website?: string }, {}>, res: Response){
    try {
        const id = req.params.id;
        const Name = req.body?.Name;
        const MobileNo = req.body?.MobileNo;
        const City = req.body?.City;
        const Description = req.body?.Description;
        const Handle = req.body?.Handle;
        const Profile = req.body?.Profile;

        const Website = req.body?.Website;
        let ProfilePic: string | undefined; 
        const user = await Users.findOne({ _id: id });

        // console.log(req.body.Profile.name);

        if (!user) {
            return res.status(404).json({ err: "user not found" });
        }
        console.log("multer",req.file)

        if (req.file) {
            const file = req.file;
            const folderPath = 'user_profilepic';
            const storage = getStorage(app);             
            const blob = bucket.file(`${folderPath}/${req.file.originalname}`);
            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                },
            });

            blobStream.on('finish', async () => {
                // The public URL can be used to directly access the file
                // ProfilePic = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                // console.log(ProfilePic);             
                getDownloadURL(ref(storage,blob.name)).
                then(async(url)=>{
                    ProfilePic=url;
                    console.log(ProfilePic);
                    user.Name = Name || user.Name;
                    user.MobileNo = MobileNo || user.MobileNo;
                    user.City = City || user.City;
                    user.Description = Description || user.Description;
                    user.Handle = Handle || user.Handle;
                    user.Website = Website || user.Website;
                    user.ProfilePic = ProfilePic || user.ProfilePic;
                    const updatedUser = await user.save();
                    res.status(200).json({ updatedUser });
                })
                .catch((error)=>{res.status(404).json({error})})

            });

            blobStream.end(req.file.buffer);
        } else {
           
            user.Name = Name || user.Name;
            user.MobileNo = MobileNo || user.MobileNo;
            user.City = City || user.City;
            user.Description = Description || user.Description;
            user.Handle = Handle || user.Handle;
            user.Website = Website || user.Website;

            const updatedUser = await user.save();

            res.status(200).json({ updatedUser });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export{userreviews,userphotos,usernetwork,userbookmarks,userblogposts,useredit}