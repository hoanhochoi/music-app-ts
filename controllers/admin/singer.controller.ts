import {Request,Response} from "express"
import Singer from "../../model/singer.model"
import { systemConfig } from "../../config/config";

export const index= async (req:Request,res:Response)=>{
    const singers = await Singer.find({
        deleted: false,
    }).select("-slug")
    console.log(singers);
    // res.send('oke');
    res.render("./admin/pages/singers/index.pug",{
        pageTitile: "Quản lý ca sĩ",
        singers : singers,
    })
}

// [GET] admin/singers/create

export const create = (req:Request,res:Response)=>{
    // res.send("oke")
    res.render("./admin/pages/singers/create.pug",{
        pageTitle: "Thêm mới ca sĩ"
    })
}

// [POST] admin/songs/create

export const createPost = async (req:Request,res:Response)=>{
    let avatar = "";
    if(req.body.avatar){
        avatar = req.body.avatar[0]
    }
    const dataSinger = {
        fullName: req.body.fullName,
        description: req.body.description,
        avatar: avatar,
        status: req.body.status
    }
   const newSinger = new Singer(dataSinger);
   console.log(newSinger)
   newSinger.save()
    res.redirect(`/${systemConfig.prefixAdmin}/singers`)
}