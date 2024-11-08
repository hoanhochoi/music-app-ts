import {Response,Request} from "express";
import Song from "../../model/song.model";
import Topic from "../../model/topic.model";
import Singer from "../../model/singer.model";
import PaginationHelper from "../../helpers/pagination";
import { systemConfig } from "../../config/config";
//[GET] admin/songs
export const index = async (req:Request,res:Response)=>{
    // pagination
    const countSong = await Song.countDocuments({
        deleted: false,
    });
    let initPagination = 
        {
            currentPage: 1,
            limitItems: 2,
        }
    const objectPagination = PaginationHelper(
        initPagination,
        req.query,
        countSong
    )
    // end pagination
    const songs = await Song.find({
        deleted: false,
    }).limit(objectPagination.limitItems).skip(objectPagination.skip);
    console.log(songs)
    const newSongs = songs.forEach(item=>{
        if(item.status == "active"){
            item["trangThai"] = "Hoạt động"
        }else{
            item["trangThai"] = "Dừng hoạt động"
        }
    })
    console.log(newSongs)
 
    res.render("./admin/pages/songs/index.pug",{
        pageTitle: "Quản lý bài hát",
        songs: songs,
        pagination: objectPagination,
    })
}

// [GET] admin/songs/create
export const create = async (req: Request,res:Response)=>{
    const topics = await Topic.find({
        deleted: false,
        status: "active"
    }).select("title");

    const singers = await Singer.find({
        deleted: false,
        status: "active"
    }).select("fullName");

    res.render("./admin/pages/songs/create",{
        pageTitle: "Thêm mới bài hát",
        topics: topics,
        singers: singers,
    })
}

// [POST] admin/songs/create

export const createPost = async (req:Request,res:Response)=>{
    const dataSong = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        status: req.body.status,
        avatar: req.body.avatar,
    }
    const newsong = new Song(dataSong);
    newsong.save();
    res.redirect(`/${systemConfig.prefixAdmin}/songs`)
}

// [PATCH] admin/songs/change-status/:status/:id

export const changeStatus = async (req:Request,res: Response)=>{
    const status = req.params.status
    const id = req.params.id;
    await Song.updateOne({
        _id:id
    },{
        status: status
    })
    console.log(status)
    console.log(id)
    res.redirect("back");
}
