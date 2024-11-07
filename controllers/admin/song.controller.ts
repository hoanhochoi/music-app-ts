import {Response,Request} from "express";
import Song from "../../model/song.model";
import Topic from "../../model/topic.model";
import Singer from "../../model/singer.model";
import PaginationHelper from "../../helpers/pagination";
//[GET] admin/songs
export const index = async (req:Request,res:Response)=>{
    // pagination
    const countSong = await Song.countDocuments({
        deleted: false,
    });
    let initPagination = 
        {
            currentPage: 1,
            limitItems: 3,
        }
    const objectPagination = PaginationHelper(
        initPagination,
        req.query,
        countSong
    )
    console.log(objectPagination);
    // end pagination
    const songs = await Song.find({
        deleted: false,
    }).limit(objectPagination.limitItems).skip(objectPagination.skip);
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
    const newsong = new Song(req.body);
    newsong.save();
    console.log(req.body);
    res.send("oke")
}